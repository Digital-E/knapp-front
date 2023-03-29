import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../components/layout'
import { SITE_NAME } from '../lib/constants'
import { homeQuery, previewHomeQuery, shopQuery, previewShopQuery, menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

import styled from 'styled-components'

import Body from "../components/body"


const Container = styled.div`
    position: relative;
    display: flex;
    min-height: calc(100vh - 50px);
    padding: 20px 120px 30px 120px;
`

const Text = styled.div`
  width: 50%;

  &.body-large p, &.body-large a {
    font-size: inherit;
  }

  * {
    text-transform: uppercase;
  }
`



export default function Shop({ data = {}, preview }) {

  const router = useRouter()

  const slug = data?.shopData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }


  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.shopData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.shopData?.content}
          />
        </Head>
        <Container>
          <Text className='body-large'>
            <Body content={data?.shopData?.text} />
          </Text>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let slug = `shop`

  let homeData = await getClient(preview).fetch(homeQuery)

  let shopData = await getClient(preview).fetch(shopQuery, {
    slug: slug,
  })

  if(preview) {
    shopData = await getClient(preview).fetch(previewShopQuery) 

    aboutData = await getClient(preview).fetch(previewShopQuery, {
      slug: slug,
    })
  }

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery);

  const footerData = await getClient(preview).fetch(footerQuery);

  return {
    props: {
      preview,
      data: {
        homeData,
        shopData,
        menuData,
        footerData
      }
    }
  }
}
