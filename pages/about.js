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
  margin: 120px 0 0 120px;
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

  p:nth-child(2) {
    display: none;
  }

  &.body-large p, &.body-large a, &.body-large span {
    font-size: inherit;
  }

  * {
    text-transform: uppercase;
  }

  @media(max-width: 989px) {
    width: 100%;
  }

  @media(min-width: 990px) {
    > *:first-child {
      display: none;
    }
  }
`

const MarginTitle = styled.h3`
  position: absolute;
  left: 0;
  top: 148px;
  padding: 0 20px;

  @media(max-width: 989px) {
    display: none;
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
    }, 1000)
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
                <Body content={data?.aboutData?.text} />
                <Typewriter data={[data?.aboutData?.text[1].children[0].text]} start={startType} />
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
