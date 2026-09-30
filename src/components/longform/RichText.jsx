/*
 * RichText: the shared long-form body (blog posts, case studies, legal pages).
 * Styles every element type in spec/pages/blog-post.md section 4: h1-h6, p, strong (Inter Bold),
 * em (Inter italic), links (#002669, instant black + underline on hover), ul/ol with ::before
 * markers, blockquote, img, table (site-wide table CSS), inline code and the dark code block.
 *
 * API (use either form):
 *
 *   1. JSX children, plain tags (the wrapper styles its descendants):
 *        <RichText>
 *          <p>Text with <strong>bold</strong>, <em>italic</em>, <code>code</code>.</p>
 *          <ul><li><p>Item</p></li></ul>
 *          <figure tabIndex={0}><table><tbody>...</tbody></table></figure>
 *          <CodeBlock lines={[[['keyword', 'const'], ' a = ', ['static', '1']]]} />
 *        </RichText>
 *
 *   2. Structured blocks (what the placeholder generator returns):
 *        <RichText blocks={blocks} />
 *      Block shapes:
 *        { type: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote', content: Inline[] }
 *        { type: 'ul' | 'ol', items: Inline[][] }            (each item renders li > p)
 *        { type: 'img', src, alt, width?, height? }
 *        { type: 'table', rows: Inline[][][] }                (first row styles as the header row)
 *        { type: 'code', lines: Token[][] }                   (see CodeBlock)
 *      Inline = string
 *             | { t: 'strong' | 'em' | 'code', c: Inline | Inline[] }
 *             | { t: 'a', href, c: Inline | Inline[] }        (href starting with "/" renders a
 *                                                              router Link; anything else is an
 *                                                              outbound <a>)
 *
 *   Optional props: className (appended), id.
 *
 * CodeBlock (named export): <CodeBlock lines={Token[][]} />
 *   Token = string (plain) | [kind, text], kind one of
 *   plain, comment, keyword, tag, punctuation, definition, property, static, string.
 *
 * Block spacing follows Framer: the first block has no top margin; p/h1-h3/blockquote get 20px,
 * h4-h6 40px, figure 28px top and bottom, lists, images and code blocks 0.
 */
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './longform.css'

function renderInline(node, key) {
  if (node == null || node === false) return null
  if (typeof node === 'string' || typeof node === 'number') return <Fragment key={key}>{node}</Fragment>
  if (Array.isArray(node)) return node.map((n, i) => renderInline(n, `${key}.${i}`))
  const kids = renderInline(node.c, `${key}c`)
  switch (node.t) {
    case 'strong':
      return <strong key={key}>{kids}</strong>
    case 'em':
      return <em key={key}>{kids}</em>
    case 'code':
      return <code key={key}>{kids}</code>
    case 'a':
      if (typeof node.href === 'string' && node.href.startsWith('/')) {
        return (
          <Link key={key} to={node.href}>
            {kids}
          </Link>
        )
      }
      return (
        <a key={key} href={node.href}>
          {kids}
        </a>
      )
    default:
      return <Fragment key={key}>{kids}</Fragment>
  }
}

export function CodeBlock({ lines = [] }) {
  return (
    <div className="lf-code">
      <div className="lf-code-scroll">
        <pre className="lf-code-content">
          <code>
            {lines.map((line, i) => (
              <span className="lf-code-line" key={i}>
                {line.length === 0
                  ? '​'
                  : line.map((tok, j) =>
                      typeof tok === 'string' ? (
                        <span className="tok-plain" key={j}>
                          {tok}
                        </span>
                      ) : (
                        <span className={`tok-${tok[0]}`} key={j}>
                          {tok[1]}
                        </span>
                      ),
                    )}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}

function renderBlock(block, i) {
  const k = `b${i}`
  switch (block.type) {
    case 'p':
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6': {
      const Tag = block.type
      return <Tag key={k}>{renderInline(block.content, k)}</Tag>
    }
    case 'blockquote':
      return (
        <blockquote key={k}>
          <p>{renderInline(block.content, k)}</p>
        </blockquote>
      )
    case 'ul':
    case 'ol': {
      const Tag = block.type
      return (
        <Tag key={k}>
          {block.items.map((item, j) => (
            <li key={j}>
              <p>{renderInline(item, `${k}.${j}`)}</p>
            </li>
          ))}
        </Tag>
      )
    }
    case 'img':
      return (
        <img
          key={k}
          className="lf-rich-img"
          src={block.src}
          alt={block.alt || ''}
          width={block.width}
          height={block.height}
          loading="lazy"
          decoding="async"
        />
      )
    case 'table':
      return (
        <figure key={k} tabIndex={0}>
          <table>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c}>
                      <p>{renderInline(cell, `${k}.${r}.${c}`)}</p>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      )
    case 'code':
      return <CodeBlock key={k} lines={block.lines} />
    default:
      return null
  }
}

export default function RichText({ blocks, children, className = '', id }) {
  return (
    <div className={className ? `lf-rich ${className}` : 'lf-rich'} id={id}>
      {blocks ? blocks.map(renderBlock) : children}
    </div>
  )
}
