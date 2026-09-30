import { localAvatar } from '../../data/blog/posts.js'

// Author / dates row ("Name", blog-post.md section 3): 48x48 avatar (radius 8), author first
// name (Inter 16/22.4), Published / Updated rows (DM Sans 12/16.2, rgba(0,0,0,.55)).
export default function AuthorMeta({ post }) {
  const avatar = localAvatar(post.authorAvatar)
  return (
    <div className="bp-author">
      <div className="bp-author-avatar">{avatar ? <img src={avatar} alt="" /> : null}</div>
      <div className="bp-author-text">
        <p className="bp-author-name">{post.authorDisplayed}</p>
        <div className="bp-dates">
          <div className="bp-date">
            <p>{'Published: '}</p>
            <time dateTime={post.datePublished || undefined}>{post.dateDisplayed}</time>
          </div>
          <div className="bp-date">
            <p>{'Updated: '}</p>
            <time dateTime={post.dateModified || undefined}>{post.updatedDisplayed}</time>
          </div>
        </div>
      </div>
    </div>
  )
}
