const homeFields = `
  _id,
  title,
  content,
  filters,
  islands,
  "slug": slug.current
`

const aboutFields = `
  _id,
  title,
  content,
  text,
  "slug": slug.current
`

const projectFields = `
  _id,
  title,
  content,
  date,
  thumbnail,
  description,
  slices[]{
    _type,
    label,
    text,
    media[]{
      _type,
      caption,
      height,
      width,
      asset->
    }
  },
  "slug": slug.current
`

const indexFields = `
  _id,
  title,
  content,
  categories[]{
    title,
    projects[]{
      project->{
        title,
        slug,
        thumbnail
      }
    }
  },
  "slug": slug.current
`

const shopFields = `
  _id,
  title,
  content,
  text,
  stockists,
  products[]{
    title,
    description,
    media[]{
      _type,
      caption,
      height,
      width,
      asset->      
    }
  },
  "slug": slug.current
`

const legalFields = `
  _id,
  title,
  content,
  text,
  "slug": slug.current
`

export const homeQuery = `
*[_type == "home"][0] {
  ${homeFields}
}
`

export const previewHomeQuery = `
*[_type == "home"] | order(_updatedAt desc)[0] {
  ${homeFields}
}
`

export const aboutQuery = `
*[_type == "about" && slug.current == $slug][0] {
  ${aboutFields}
}
`

export const previewAboutQuery = `
*[_type == "about" && slug.current == $slug] | order(_updatedAt desc)[0] {
  ${aboutFields}
}
`

export const projectSlugsQuery = `
*[_type == "project" && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
`

export const projectQuery = `
*[_type == "project" && slug.current == $slug][0] {
  ${projectFields}
}`

export const indexQuery = `
*[_type == "index"][0] {
  ${indexFields}
}
`

export const previewIndexQuery = `
*[_type == "index"] | order(_updatedAt desc)[0] {
  ${indexFields}
}
`

export const shopQuery = `
*[_type == "shop"][0] {
  ${shopFields}
}
`

export const previewShopQuery = `
*[_type == "shop"] | order(_updatedAt desc)[0] {
  ${shopFields}
}
`


export const previewProjectQuery = `
*[_type == "year" && slug.current == $slug] | order(_updatedAt desc)[0] {
  ${projectFields}
}`

export const allProjectsQuery = `
*[_type == "project" && defined(slug.current) && !(_id in path('drafts.**'))] {
  ${projectFields}
}`

export const previewAllProjectsQuery = `
*[_type == "project" && defined(slug.current) | order(_updatedAt desc)] {
  ${projectFields}
}`

export const projectByRefQuery = `
*[_type == "project" && _id == $ref][0] {
  ${projectFields}
}`

export const menuQuery = `
*[_type == "menu"][0] {
  menuItems,
  cookietext,
  cookieaccept,
  cookierefuse
}
`

export const footerQuery = `
*[_type == "footer"][0] {
  textFieldOne,
  namePlaceholder,
  emailPlaceholder,
  submitButtonText,
  errorMessage,
  legalLabel
}
`

export const legalQuery = `
*[_type == "legal" && slug.current == $slug][0] {
    ${legalFields}
}
`

export const previewLegalQuery = `
*[_type == "legal" && slug.current == $slug] | order(_updatedAt desc)[0] {
    ${legalFields}
}
`