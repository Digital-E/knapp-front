import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../components/layout'
import { SITE_NAME } from '../lib/constants'
import { contactQuery, previewContactQuery, menuQuery, footerQuery } from '../lib/queries'
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
  width: 100%;
  overflow: scroll;
  z-index: 0;
`


let LeftCol = styled.div`
  flex-basis: 70%;
  margin: 0px 0 0 120px;
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

  &.body-large p, &.body-large a {
    font-size: inherit;
  }

  * {
    text-transform: uppercase;
  }

  @media(max-width: 989px) {
    width: 100%;
  }
`



export default function About({ data = {}, preview }) {

  const router = useRouter()

  const slug = data?.contactData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.contactData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.contactData?.content}
          />
        </Head>
        <Container>
          <InnerContainer>
            <LeftCol>
              <Text className='body-large'>
                <Body content={data?.contactData?.text} />
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

  let slug = `contact`

  let contactData = await getClient(preview).fetch(contactQuery, {
    slug: slug,
  })

  if(preview) {
    contactData = await getClient(preview).fetch(previewContactQuery, {
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
        contactData,
        menuData,
        footerData
      }
    }
  }
}
