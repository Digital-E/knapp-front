import { useEffect, useRef, useState, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { homeQuery, previewHomeQuery, projectSlugsQuery, projectQuery, previewProjectQuery, menuQuery, footerQuery } from '../../lib/queries'
import { sanityClient, getClient } from '../../lib/sanity.server'


import { store } from "../../store"

import styled from "styled-components"

import splitSlug from "../../lib/splitSlug"

// Components

import Header from '../../components/projects/header'
import Body from '../../components/body'
import Slices from '../../components/projects/slices'
import MediaStack from '../../components/projects/media-stack'

let Container = styled.div`
`

let InnerContainer = styled.div`
  display: flex;
`


let LeftCol = styled.div`
  flex-basis: 70%;
  margin: 10px 0 0 120px;
`

let InnerLeftCol = styled.div`
  > div:nth-child(1) {
    width: 65%
  }

  .media-gallery {
    width: 75%
  }

  .text {
    width: 85%
  }
`


let RightCol = styled.div`
  flex-basis: 30%;
  margin-right: 30px;
`



let Description = styled.div`

  p {
    font-size: inherit;
  }
`


export default function Component({ data = {}, preview }) {
  //Context
  const context = useContext(store);
  const { state, dispatch } = context;

  let [mediaStack, setMediaStack] = useState([])

  const router = useRouter()

  const slug = data?.data?.slug


  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {
    // Create Media Stack Array
    let array = []

    data.data.slices.forEach(item => {
      if(item._type === 'MediaGallery') {
        array.push(...item.media)
      }
    })

    setMediaStack(array)
  }, [])

  return (
    <Layout preview={preview}>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
              <Head>
                <title>
                  {data.data.title} | {SITE_NAME}
                </title>
                <meta
                  name="description"
                  content={data.data.content}
                />
              </Head>
              <Container>
                <Header data={data.data} />
                <InnerContainer>
                  <LeftCol>
                    <InnerLeftCol>
                      <Description className='body-large'>
                        <Body content={data.data.description} />
                      </Description>

                      <Slices data={data.data.slices} />
                    </InnerLeftCol>
                  </LeftCol>
                  <RightCol>
                    <MediaStack data={mediaStack} />
                  </RightCol>
                </InnerContainer>
              </Container>
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `projects__${params.slug}`

  let homeData = await getClient(preview).fetch(homeQuery)

  let data = await getClient(preview).fetch(projectQuery, {
    slug: slug,
  })

  if(preview) {
    data = await getClient(preview).fetch(previewProjectQuery, {
      slug: slug,
    })

    homeData = await getClient(preview).fetch(previewHomeQuery) 
  }

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery);

  const footerData = await getClient(preview).fetch(footerQuery);


  return {
    props: {
      preview,
      data: {
        data,
        homeData,
        menuData,
        footerData
      },
    },
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(projectSlugsQuery)

  
  return {
    paths: paths.map((slug) => ({ params: { slug: splitSlug(slug, 1) } })),
    fallback: false,
  }
}
