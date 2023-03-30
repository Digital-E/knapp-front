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


const Container = styled.div`
    position: relative;
    display: flex;
    min-height: calc(100vh - 50px);
`

let InnerContainer = styled.div`
  position: absolute;
  display: flex;
  height: 100vh;
  overflow: scroll;
  z-index: 0;
`


let LeftCol = styled.div`
  flex-basis: 70%;
  margin: 0px 0 0 120px;
  padding-top: 20px;
  overflow: scroll;
`

let InnerLeftCol = styled.div`
  > div:nth-child(1) {
    width: 65%
  }

  .media-gallery {
    width: 75%
  }

  .text {
    width: 65%
  }
`

let RightCol = styled.div`
  flex-basis: 30%;
  margin: 0 40px 0 0;
  padding-top: 130px;
  overflow: scroll;
`

const Text = styled.div`
  width: 65%;

  &.body-large p, &.body-large a {
    font-size: inherit;
  }

  * {
    text-transform: uppercase;
  }
`



export default function About({ data = {}, preview }) {

  const router = useRouter()

  const slug = data?.aboutData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

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
          <InnerContainer>
            <LeftCol>
              <Text className='body-large'>
                <Body content={data?.aboutData?.text} />
              </Text>
            </LeftCol>
            <RightCol>

            </RightCol>
          </InnerContainer>
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
