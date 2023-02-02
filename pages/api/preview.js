import { postBySlugQuery, allPostQuery } from '../../lib/queries'
import { previewClient } from '../../lib/sanity.server'

export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // // Check if the post with the given `slug` exists
  // const post = await previewClient.fetch(allPostQuery, {
  //   slug: req.query.slug,
  // })

  // // If the slug doesn't exist prevent preview mode from being enabled
  // if (!post) {
  //   return res.status(401).json({ message: 'Invalid slug' })
  // }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities


  let splitSlug = (slug) => {

    let split = slug.split("__");
    
    if(split.length === 1) {
      return `/${split[0]}`
    } else if (split.length === 2) {
      return `/${split[0]}/${split[1]}`
    } else if(split.length === 3) {
      return `/${split[0]}/${split[1]}/${split[2]}`
    } else {
      return `/${split[0]}/${split[1]}/${split[2]}/${split[3]}`
    }
  }



  res.writeHead(307, { Location: splitSlug(req.query.slug) })
  res.end()
}
