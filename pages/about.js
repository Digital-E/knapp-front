import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../components/layout'
import { SITE_NAME } from '../lib/constants'
import { homeQuery, previewHomeQuery, aboutQuery, previewAboutQuery, menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

import styled from 'styled-components'

import Body from "../components/body"

import Grid from "../components/home/grid"

import Text from "../components/about/text"

const Container = styled.div`
    position: relative;
    display: flex;
    height: 100vh;
    z-index: 1;
    background: white;

    @media(max-width: 989px) {
        flex-direction: column;
    }
`

const TextPlaceholder = styled.div`
    position: absolute;
    width: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`


export default function About({ data = {}, preview }) {

  const router = useRouter()

  const slug = data?.aboutData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {

  }, []);

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.aboutData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.aboutData?.content}
          />
        </Head>
        <Container>
            <TextPlaceholder>
              <img src='images/text-placeholder.svg' />
            </TextPlaceholder>
            <Grid />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let slug = `about`

  let homeData = await getClient(preview).fetch(homeQuery)

  let aboutData = await getClient(preview).fetch(aboutQuery, {
    slug: slug,
  })

  if(preview) {
    homeData = await getClient(preview).fetch(previewHomeQuery) 

    aboutData = await getClient(preview).fetch(previewAboutQuery, {
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
        aboutData,
        menuData,
        footerData
      }
    }
  }
}
