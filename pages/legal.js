import Head from 'next/head'

import styled from "styled-components"

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../components/header'
import Layout from '../components/layout'
import { SITE_NAME } from '../lib/constants'
import { legalQuery, previewLegalQuery, menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

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


export default function Post({ data = {}, preview }) {
  const router = useRouter()

  const slug = data?.data?.slug

  data = data?.data;


  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }


  return (
    <Layout preview={preview}>
        <Header />
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
              <Head>
                <title>
                  {data.title} | {SITE_NAME}
                </title>
                <meta
                  name="description"
                  content={data.content}
                />
              </Head>
              <Container>
                <Text className='body-large'>
                  <Body content={data.text} />
                </Text>
              </Container>              
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `legal`


  let data = await getClient(preview).fetch(legalQuery, {
    slug: slug,
  })

  if(preview) {
    data = await getClient(preview).fetch(previewLegalQuery, {
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
        menuData,
        footerData
      },
    },
  }
}
