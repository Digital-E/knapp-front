import { useEffect, useRef, useState, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { homeQuery, previewHomeQuery, projectSlugsQuery, projectQuery, previewProjectQuery, menuQuery, footerQuery } from '../../lib/queries'
import { sanityClient, getClient } from '../../lib/sanity.server'


import { store } from "../../store"

import SidePanel from '../../components/home/side-panel'

import styled from "styled-components"

import splitSlug from "../../lib/splitSlug"

let Container = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 3;
`



export default function Component({ data = {}, preview }) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

  const router = useRouter()

  const slug = data?.data?.slug


  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {

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
                <SidePanel data={data.data} />
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
