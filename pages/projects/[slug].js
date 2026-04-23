import { useEffect, useRef, useState, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { allProjectsQuery, projectSlugsQuery, projectQuery, previewProjectQuery, menuQuery, footerQuery } from '../../lib/queries'
import { sanityClient, getClient } from '../../lib/sanity.server'

import Link from '../../components/link'

import { store } from "../../store"

import styled from "styled-components"

import splitSlug from "../../lib/splitSlug"

// Components

import Button from '../../components/button'
import Header from '../../components/projects/header'
import Body from '../../components/body'
import Slices from '../../components/projects/slices'
import MediaStack from '../../components/projects/media-stack'
import ZoomGallery from '../../components/projects/zoom-gallery'

let Container = styled.div`
  position: relative; 

  @media(min-width: 990px) {
    min-height: 100vh;
  }

  @media(max-width: 989px) {
    position: fixed;
    height: 100%;
    width: 100%;
    min-height: 100vh;
  }

  // @supports(-webkit-touch-callout: none) {
  //   position: fixed;
  //   height: 100%;
  //   width: 100%;
  //   min-height: initial;
  // }
`

let InnerContainer = styled.div`
  position: absolute;
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 0;

  @media(max-width: 989px) {
    // height: 100%;
  }

  @supports(-webkit-touch-callout: none) {
    height: 100%;
  }
`


let LeftCol = styled.div`
  flex-basis: 65%;
  margin: 140px 0 0 120px;
  // padding-top: 102px;
  overflow: scroll;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 1) 10px);
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
    width: 75%
  }

  .media-gallery {
    width: 70%
  }

  .text {
    width: 75%
  }

  .audio {
    width: 65%
  }

  @media(max-width: 989px) {
    > div:nth-child(1), .media-gallery, .text, .audio {
      width: 100%;
    }
  }
`

let RightCol = styled.div`
  flex-basis: 35%;
  // margin: 0 20px 0 0;
  margin: 0 80px 0 0;
  z-index: 1;

  @media(max-width: 989px) {
    display: none;
    flex-basis: 0;
    overflow: hidden;
  }
`

let Description = styled.div`

  p {
    font-size: inherit;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 85%;

  > div {
    margin: 0 10px 20px 10px;
  }

  > div:nth-child(2) {
    pointer-events: none;
  }

  a {
    margin: 0;
  }

  @media(max-width: 989px) {
    width: 100%;
    margin-bottom: 130px;

    > div {
      margin: 0 auto;
    }
  }
`


export default function Component({ data = {}, preview }) {
  //Context
  const context = useContext(store);
  const { state, dispatch } = context;

  const router = useRouter()

  let [mediaStack, setMediaStack] = useState([])
  let [toggleZoomState, setToggleZoomState] = useState(null)
  let [prevNextLinks, setPrevNextLinks] = useState({
    prev: '/',
    next: '/'
  })

  const slug = data?.data?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {
    // Create Media Stack Array
    let array = []

    data.data?.slices?.forEach(item => {
      if(item._type === 'MediaGallery') {
        array.push(...item.media)
      }
    })

    setMediaStack(array)
  }, [])

  useEffect(() => {
    let allProjects = data.allProjects
    let projectSlug = data.data.slug
    let projectIndex = 0;
    let allProjectsCount = data.allProjects.length

    let prevNextObj = {
      prev: '/',
      next: '/'
    }

    allProjects.forEach((item, index) => {
      if(item.slug === projectSlug) {
        projectIndex = index
      }
    })

    let projectIndexNext = projectIndex + 1
    let projectIndexPrev = projectIndex - 1

    if(projectIndexNext > allProjectsCount - 1) {
      projectIndexNext = 0
    }

    if(projectIndexPrev < 0) {
      projectIndexPrev = allProjectsCount - 1
    }

    prevNextObj.next = allProjects[projectIndexNext].slug
    prevNextObj.prev = allProjects[projectIndexPrev].slug

    setPrevNextLinks(prevNextObj)

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
                      <Slices data={data.data.slices} toggleZoom={(e) => setToggleZoomState(e)} />
                      <ButtonsWrapper>
                        <Link href={prevNextLinks.prev}><Button>{'<'}</Button></Link>
                        <Button>More Projects</Button>
                        <Link href={prevNextLinks.next}><Button>{'>'}</Button></Link>
                      </ButtonsWrapper>
                    </InnerLeftCol>
                  </LeftCol>
                  <RightCol id='media-stack-right-column'>
                    <MediaStack data={mediaStack} toggleZoom={(e) => setToggleZoomState(e)}/>
                  </RightCol>
                </InnerContainer>
                <ZoomGallery data={mediaStack} toggleZoomState={toggleZoomState} toggleZoom={(e) => setToggleZoomState(e)}/>
              </Container>
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `projects__${params.slug}`

  let allProjects = await getClient(preview).fetch(allProjectsQuery)

  let data = await getClient(preview).fetch(projectQuery, {
    slug: slug,
  })

  if(preview) {
    data = await getClient(preview).fetch(previewProjectQuery, {
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
        data,
        allProjects,
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
