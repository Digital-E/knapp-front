import { useEffect, useRef, useState, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { homeQuery, previewHomeQuery, projectSlugsQuery, projectQuery, previewProjectQuery, menuQuery, footerQuery } from '../../lib/queries'
import { sanityClient, getClient } from '../../lib/sanity.server'

import { motion } from 'framer-motion'

import { store } from "../../store"

import styled from "styled-components"

import splitSlug from "../../lib/splitSlug"

// Components

import Button from '../../components/button'
import Header from '../../components/projects/header'
import Body from '../../components/body'
import Slices from '../../components/projects/slices'
import MediaStack from '../../components/projects/media-stack'

let Container = styled.div`
  position: relative; 
  min-height: 100vh;
`

let InnerContainer = styled.div`
  position: absolute;
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 0;
`


let LeftCol = styled.div`
  flex-basis: 70%;
  margin: 0px 0 0 120px;
  padding-top: 102px;
  overflow: scroll;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 1) 112px);
  box-sizing: border-box;

  @media(max-width: 989px) {
    flex-basis: 100%;
    margin: 0px 20px;
    padding-top: 60px;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 1) 60px);
  }
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

  @media(max-width: 989px) {
    > div:nth-child(1), .media-gallery, .text {
      width: 100%;
    }
  }
`

let RightCol = styled.div`
  flex-basis: 30%;
  margin: 0 20px 0 0;
  z-index: 1;

  @media(max-width: 989px) {
    display: none;
  }
`

let Description = styled.div`

  p {
    font-size: inherit;
  }
`

const ButtonWrapper = styled.div`
  width: 85%;

  > div {
    margin: 0 auto 20px auto;
  }

  @media(max-width: 989px) {
    width: 100%;

    > div {
      margin: 0 auto 80px auto;
    }
  }
`



const overlayVariants = {
  visible: {
    display: 'block',
    opacity: 1
  },
  hidden: {
    opacity: 0,
    transitionEnd: {
      display: 'none'
    }
  }
}


export default function Component({ data = {}, preview }) {
  //Context
  const context = useContext(store);
  const { state, dispatch } = context;

  const router = useRouter()

  let [mediaStack, setMediaStack] = useState([])
  let [mediaStackExpanded, setMediaStackExpanded] = useState(false)
  let [toggleExpand, setToggleExpand] = useState(0)

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
                      <Slices data={data.data.slices} toggleExpand={() => setToggleExpand(toggleExpand += 1)} />
                      <ButtonWrapper>
                        <Button>More Projects +</Button>
                      </ButtonWrapper>
                    </InnerLeftCol>
                  </LeftCol>
                  <RightCol id='media-stack-right-column'>
                    <MediaStack data={mediaStack} toggleExpand={toggleExpand}/>
                  </RightCol>
                  {/* <Overlay animate={mediaStackExpanded ? 'visible' : 'hidden'} variants={overlayVariants} /> */}
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
