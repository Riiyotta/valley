import { Fragment, useEffect, useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import NotFound from '../NotFound.jsx'
import PostHeader from '../../components/blog/PostHeader.jsx'
import TocCard from '../../components/blog/TocCard.jsx'
import AuthorMeta from '../../components/blog/AuthorMeta.jsx'
import RelatedPosts from '../../components/blog/RelatedPosts.jsx'
import RichText from '../../components/longform/RichText.jsx'
import InlineCtaCard, { CTA_IMAGES } from '../../components/longform/InlineCtaCard.jsx'
import TryValleyForm from '../../components/longform/TryValleyForm.jsx'
import { placeholderArticle } from '../../components/longform/placeholderArticle.js'
import { getPost, redirectPath, relatedPosts } from '../../data/blog/posts.js'
import '../../styles/pages/blog/blog-post.css'

// TOC scroll-spy (blog-post.md section 7): an item becomes active once its section's top has
// passed 450px from the top of the viewport (measured at 1440x900); none before the first,
// and the last stays active through the related section and footer.
const SPY_LINE = 450

function useActiveSection(ids) {
  const [active, setActive] = useState(-1)
  useEffect(() => {
    let raf = 0
    const measure = () => {
      raf = 0
      let idx = -1
      ids.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= SPY_LINE) idx = i
      })
      setActive(idx)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ids])
  return active
}

// /blog/:slug. Template from spec/pages/blog-post.md; the body is the placeholder article.
export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  const article = useMemo(() => placeholderArticle(slug), [slug])
  const ids = useMemo(() => article.sections.map((s) => s.id), [article])
  const related = useMemo(() => relatedPosts(slug), [slug])
  const active = useActiveSection(ids)

  if (!post) return <NotFound />
  if (post.redirectsTo) {
    const to = redirectPath(post)
    return to ? <Navigate to={to} replace /> : <NotFound />
  }

  return (
    <main className="bp-page">
      <PostHeader post={post} />
      <section className="bp-body">
        <div className="bp-container">
          <aside className="bp-side">
            <TocCard items={article.sections} activeIndex={active} />
            <TryValleyForm />
          </aside>
          <div className="bp-main">
            <AuthorMeta post={post} />
            <div className="bp-content">
              {article.sections.map((s, i) => (
                <Fragment key={s.id}>
                  <div className="bp-section" id={s.id}>
                    <div className="bp-section-title">
                      <h2>{s.title}</h2>
                    </div>
                    <RichText blocks={s.blocks} />
                  </div>
                  <InlineCtaCard image={CTA_IMAGES[i % CTA_IMAGES.length]} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      <RelatedPosts posts={related} />
    </main>
  )
}
