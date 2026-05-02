import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../components/layout'
import { SITE_NAME } from '../lib/constants'
import { aboutQuery, previewAboutQuery, menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

import styled from 'styled-components'

import Body from "../components/body"

import Typewriter from '../components/about/typewriter'


const Container = styled.div`
    position: relative;
    display: flex;
    min-height: calc(100vh - 50px);
`

let InnerContainer = styled.div`
  position: absolute;
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: scroll;
  z-index: 0;
`


let LeftCol = styled.div`
  flex-basis: 70%;
  margin: 80px 0 0 80px;
  padding-top: 20px;
  overflow: scroll;
  box-sizing: border-box;

  @media(max-width: 989px) {
    flex-basis: 100%;
    margin: 0 20px;
  }
`

let RightCol = styled.div`
  flex-basis: 30%;
  margin: 0 40px 0 0;
  padding-top: 130px;
  overflow: scroll;

  @media(max-width: 989px) {
    display: none;
  }
`

const Text = styled.div`
  width: 65%;
  margin: 0;

  // p:nth-child(2) {
  //   display: none;
  // }

  &.body-large p, &.body-large a, &.body-large span {
    font-size: inherit;
  }

  * {
    text-transform: uppercase;
  }

  @media(max-width: 989px) {
    width: 100%;
    margin-top: 50px;
    margin-bottom: 140px;
  }
`

const MobileOnly = styled.div`
  @media(min-width: 990px) {
    display: none;
  }
`

const DesktopOnly = styled.div`
  @media(max-width: 989px) {
    display: none;
  }
`

const MarginTitle = styled.h3`
  position: absolute;
  left: 0;
  top: 108px;
  padding: 0 20px;

  @media(max-width: 989px) {
    // display: none;
    position: relative;
    top: 20px;
  }
`



export default function About({ data = {}, preview }) {

  let [startType, setStartType] = useState(false)

  const router = useRouter()

  const slug = data?.aboutData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {
    setTimeout(() => {
      setStartType(true)
    }, 0)
  }, [])


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
          <MarginTitle>
            {data?.aboutData?.title}
          </MarginTitle>
          <InnerContainer>
            <LeftCol>
              <Text className='body-large bio-type'>
                <MobileOnly>
                  <Body content={data?.aboutData?.text} />
                </MobileOnly>
                <DesktopOnly>
                  <Typewriter
                    data={(data?.aboutData?.text ?? [])
                      .filter(block => block._type === 'block')
                      .map(block => (block.children ?? []).map(child => child.text ?? '').join(''))
                      .filter(text => text.trim() !== '')}
                    start={startType}
                  />
                </DesktopOnly>
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

  let aboutData = await getClient(preview).fetch(aboutQuery, {
    slug: slug,
  })

  if(preview) {
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
        aboutData,
        menuData,
        footerData
      }
    }
  }
}
