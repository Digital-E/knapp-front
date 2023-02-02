import { PortableText } from '@portabletext/react'

import { getFile } from "@sanity/asset-utils";
import { sanityConfig } from "../lib/config"

import Link from './link'

const myPortableTextComponents = {
  types: {
    file: ({value}) => <a href={value.asset ? getFile(value.asset, sanityConfig).asset.url : null} target="_blank">{value.label}</a>,
    // callToAction: ({value, isInline}) =>
    //   isInline ? (
    //     <a href={value.url}>{value.text}</a>
    //   ) : (
    //     <div className="callToAction">{value.text}</div>
    //   ),
  },

  marks: {
    link: ({children, value}) => {
      const rel = !value.href?.startsWith('/') ? 'noreferrer noopener' : undefined

      var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);
      let isURL = value.href?.match(regex) !== null ? true : false   

      return (
        isURL ?
        <a target="_blank" href={value.href} rel={rel}>
          {children}
        </a>
        :
        <Link href={value.href}>{children}</Link>
      )
    },
  },
}


export default function Body({ content }) {

  return (
    <PortableText value={content} components={myPortableTextComponents} />
  )
}
