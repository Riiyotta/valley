// Blog data for /blog, /blog/archive and /blog/:slug. Source: spec/pages/blog/posts.json
// (492 records, newest first, walked 2026-09-29). Only title, excerpt, dates, author, card
// image and flags are used; article bodies are placeholders (components/longform).
import data from '../../../spec/pages/blog/posts.json'

export const POSTS = data.posts

const BY_SLUG = new Map(POSTS.map((p) => [p.slug, p]))

export function getPost(slug) {
  return BY_SLUG.get(slug) || null
}

// redirectsTo holds an absolute www.joinvalley.co URL; the clone routes it internally.
export function redirectPath(post) {
  if (!post || !post.redirectsTo) return null
  try {
    return new URL(post.redirectsTo).pathname
  } catch {
    return null
  }
}

// Author avatars, keyed by the original framerusercontent image id. The live site sets the
// avatar per post (55 distinct images), so this maps each id to its local copy
// (spec/pages/ASSETS_GAPFILL.blog-authors.json). Unknown ids render the empty 48x48 tile.
const LOCAL_AVATARS = {
  '070p27XMLFQjgzUzmhdIlv2CU': '/assets/pages/blog/authors/saniya-sood-070p27XMLFQjgzUzmhdIlv2CU.png',
  '0KBCxJQNtgzaSotbplzcp0cgA': '/assets/pages/blog/authors/zayd-ali-0KBCxJQNtgzaSotbplzcp0cgA.png',
  '0OwviQTxzr6r2l4SfckrYH3tE0': '/assets/pages/blog/authors/saniya-sood.jpeg',
  '1rmLk5mnf0uxw6KCatVjyhvpns': '/assets/pages/blog/authors/saniya-sood-1rmLk5mnf0uxw6KCatVjyhvpns.png',
  '1t6C3wsKBM8ecZYZypD7QUYAIQY': '/assets/pages/blog/authors/saniya-sood-1t6C3wsKBM8ecZYZypD7QUYAIQY.png',
  '2j255TCQF154J5vfaT09oDUp6U': '/assets/pages/blog/authors/saniya-sood-2j255TCQF154J5vfaT09oDUp6U.webp',
  '6t5sZD276AjQLa46KZXor94l7k': '/assets/pages/blog/authors/saniya-sood-6t5sZD276AjQLa46KZXor94l7k.png',
  '7cVnYio6UzLVLWQpuL2c8ikius': '/assets/pages/blog/authors/saniya-sood-7cVnYio6UzLVLWQpuL2c8ikius.png',
  '7xawHS9Pk6zcaphY2cPJpn4dPM': '/assets/pages/blog/authors/saniya-sood-7xawHS9Pk6zcaphY2cPJpn4dPM.png',
  '8UfOz4hqCqS7m4tcrLTQ7VIp0T8': '/assets/pages/blog/authors/zayd-ali-8UfOz4hqCqS7m4tcrLTQ7VIp0T8.jpeg',
  '8leDSHEoeeoPRHBUPdKcV4xa79c': '/assets/pages/blog/authors/zayd-ali-8leDSHEoeeoPRHBUPdKcV4xa79c.jpg',
  CKsSGwqEwYUGUYofm2km4LNIw: '/assets/pages/blog/authors/saniya-sood-CKsSGwqEwYUGUYofm2km4LNIw.png',
  EwYgzEysWV1jHb58yKngTahUjA: '/assets/pages/blog/authors/saniya-sood-EwYgzEysWV1jHb58yKngTahUjA.png',
  FcgnP7zX6mzNGAVpLvLL8Ki6Wo: '/assets/pages/blog/authors/saniya-sood-FcgnP7zX6mzNGAVpLvLL8Ki6Wo.png',
  JeW2ylYihK5MAK4dfpTcfRN1wU: '/assets/pages/blog/authors/zayd-ali-JeW2ylYihK5MAK4dfpTcfRN1wU.jpg',
  MjpaHBrDdhr419JVM3LtPjEaiqM: '/assets/pages/blog/authors/saniya-sood-MjpaHBrDdhr419JVM3LtPjEaiqM.png',
  NNkdGRZ1DEAAPgZL1osWqOqW5A4: '/assets/pages/blog/authors/saniya-sood-NNkdGRZ1DEAAPgZL1osWqOqW5A4.png',
  NicichmGYvGF8KdkON10bNM6pkU: '/assets/pages/blog/authors/saniya-sood-NicichmGYvGF8KdkON10bNM6pkU.png',
  Om0nCl8ANUFVABmjRPZ7L8RDyg: '/assets/pages/blog/authors/saniya-sood-Om0nCl8ANUFVABmjRPZ7L8RDyg.png',
  PxswzXkZdsn4JYuVkegnuliy9U: '/assets/pages/blog/authors/saniya-sood-PxswzXkZdsn4JYuVkegnuliy9U.jpg',
  QUfUuUJqmWGIo5Bf0zX64SlzAvQ: '/assets/pages/blog/authors/saniya-sood-QUfUuUJqmWGIo5Bf0zX64SlzAvQ.png',
  QrxeejFNgaYguoZkzlVoYFQmUI: '/assets/pages/blog/authors/saniya-sood-QrxeejFNgaYguoZkzlVoYFQmUI.jpeg',
  RkYMuyEtdgStGU8zRVpb3dYfnE: '/assets/pages/blog/authors/zayd-ali-RkYMuyEtdgStGU8zRVpb3dYfnE.jpeg',
  Rr3nqra7y8CETxyQOSLVApU5M: '/assets/pages/blog/authors/saniya-sood-Rr3nqra7y8CETxyQOSLVApU5M.png',
  SExCAul9b1WwdusZ8XLttAx3NN8: '/assets/pages/blog/authors/zayd-ali-SExCAul9b1WwdusZ8XLttAx3NN8.jpg',
  SLXVmXzelte5pTqJYJGMQgHSIU: '/assets/pages/blog/authors/shubh-agrawal.jpeg',
  TB2Pze7vFpqwlgmn9laF40xrX0: '/assets/pages/blog/authors/saniya-sood-TB2Pze7vFpqwlgmn9laF40xrX0.png',
  TjJsmenZCV1Lwkc3EqKhQFTmD30: '/assets/pages/blog/authors/saniya-sood-TjJsmenZCV1Lwkc3EqKhQFTmD30.webp',
  UOkgzbyGgojetiRdVSd5Qm8BSfk: '/assets/pages/blog/authors/saniya-sood-UOkgzbyGgojetiRdVSd5Qm8BSfk.png',
  UPKmIH7CgAKxGB180sFC1h9No: '/assets/pages/blog/authors/saniya-sood-UPKmIH7CgAKxGB180sFC1h9No.png',
  UfUWmebYTKtP6xd2kq7xFtObfI: '/assets/pages/blog/authors/saniya-sood-UfUWmebYTKtP6xd2kq7xFtObfI.png',
  VpzssHEyvT6adbPs49AV1V906O0: '/assets/pages/blog/authors/saniya-sood-VpzssHEyvT6adbPs49AV1V906O0.png',
  X07bz9K1jmDOjA1aPVdRMFUmc: '/assets/pages/blog/authors/saniya-sood-X07bz9K1jmDOjA1aPVdRMFUmc.png',
  XEwTXq0NdxNyTfF2eCw0ZvOXqfQ: '/assets/pages/blog/authors/saniya-sood-XEwTXq0NdxNyTfF2eCw0ZvOXqfQ.png',
  a6ccvrEinsbe47cfFfe20RZCs3g: '/assets/pages/blog/authors/saniya-sood-a6ccvrEinsbe47cfFfe20RZCs3g.png',
  cnRnuly8h6LKqnOpIIfcTT6KA: '/assets/pages/blog/authors/valley.png',
  dMFXfNud7BtOZ8KnizI2VUL0: '/assets/pages/blog/authors/saniya-sood-dMFXfNud7BtOZ8KnizI2VUL0.png',
  dv4i0G2mBFnvHRV5E6kc1k0UuHw: '/assets/pages/blog/authors/saniya-sood-dv4i0G2mBFnvHRV5E6kc1k0UuHw.png',
  gPovucVNjmvTpgiV43MixNzTcg: '/assets/pages/blog/authors/zayd-ali.jpg',
  gujgKq28duuaemRpsjwoXdnhLSY: '/assets/pages/blog/authors/saniya-sood-gujgKq28duuaemRpsjwoXdnhLSY.png',
  gwnJv8CU1jlUbPoiZL6hcBA3so: '/assets/pages/blog/authors/saniya-sood-gwnJv8CU1jlUbPoiZL6hcBA3so.jpeg',
  jAXT5BGG1pkQYRphnO4tSLNKzrI: '/assets/pages/blog/authors/saniya-sood-jAXT5BGG1pkQYRphnO4tSLNKzrI.png',
  lRIs26rotEnDTVX62n72qDOgeQ: '/assets/pages/blog/authors/saniya-sood-lRIs26rotEnDTVX62n72qDOgeQ.png',
  mIuhXEeqXbV1RQlphFa9PDNhfw: '/assets/pages/blog/authors/saniya-sood-mIuhXEeqXbV1RQlphFa9PDNhfw.png',
  o5N4I6Aw4FTAiChhZ5OSWYmwMY: '/assets/pages/blog/authors/saniya-sood-o5N4I6Aw4FTAiChhZ5OSWYmwMY.png',
  pZifYUA09yqZyx7DGmiFMcsrifU: '/assets/pages/blog/authors/saniya-sood-pZifYUA09yqZyx7DGmiFMcsrifU.png',
  pnl23YqR800NX11Kh0L3o8JM: '/assets/pages/blog/authors/saniya-sood-pnl23YqR800NX11Kh0L3o8JM.png',
  rBUkBhHVDcYAw2SMBpj4ZjGCT8Q: '/assets/pages/blog/authors/zayd-ali-rBUkBhHVDcYAw2SMBpj4ZjGCT8Q.jpeg',
  rhfEUTYu7iY5ZA40cc3HyhdOf1I: '/assets/pages/blog/authors/saniya-sood-rhfEUTYu7iY5ZA40cc3HyhdOf1I.png',
  s9JAmwrUJejP7EjKfJeIbpslQcY: '/assets/pages/blog/authors/saniya-sood-s9JAmwrUJejP7EjKfJeIbpslQcY.png',
  t9ZwQqAYf5FVSHVSE4mQSSzaWRM: '/assets/pages/blog/authors/saniya-sood-t9ZwQqAYf5FVSHVSE4mQSSzaWRM.png',
  wFaHghygNfANRf4rPdLJhR57F0: '/assets/pages/blog/authors/saniya-sood-wFaHghygNfANRf4rPdLJhR57F0.png',
  ySjC3625UcUoNpQsKtT3M0usIM: '/assets/pages/blog/authors/saniya-sood-ySjC3625UcUoNpQsKtT3M0usIM.png',
  z2dmVDjNj1rtuNlAOPDfEgDHLp8: '/assets/pages/blog/authors/saniya-sood-z2dmVDjNj1rtuNlAOPDfEgDHLp8.png',
  z6AGSaY1f4VWeHrldxzHhAWNBLs: '/assets/pages/blog/authors/zayd-ali-z6AGSaY1f4VWeHrldxzHhAWNBLs.jpg',
}

export function localAvatar(url) {
  if (!url) return null
  const m = url.match(/images\/([^./?]+)\./)
  return (m && LOCAL_AVATARS[m[1]]) || null
}

// "Related Blogs": the live section shows the 4 newest posts on every post. The clone keeps
// that rule but skips the current post and redirect-only records so each card is useful.
export function relatedPosts(currentSlug, count = 4) {
  const out = []
  for (const p of POSTS) {
    if (p.slug === currentSlug || p.redirectsTo) continue
    out.push(p)
    if (out.length === count) break
  }
  return out
}
