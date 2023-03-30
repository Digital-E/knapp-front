import { useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import styled from 'styled-components'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { indexQuery, previewIndexQuery, allProjectsQuery, previewAllProjectsQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'

import { store } from "../../store"

import List from '../../components/index/list'


const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 80px);
  padding: 30px;

  @media(max-width: 989px) {
    padding: 20px;
  }
`

export default function Index({ data = {}, preview }) {

  //Context
  const context = useContext(store);
  const { state, dispatch } = context;

  const router = useRouter()

  const slug = data?.indexData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }



  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.indexData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.indexData?.content}
          />
        </Head>
        <Container>
            <List data={data?.indexData} />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let indexData = await getClient(preview).fetch(indexQuery)

  let allProjectsData = await getClient(preview).fetch(allProjectsQuery)

  if(preview) {
    indexData = await getClient(preview).fetch(previewIndexQuery) 

    allProjectsData = await getClient(preview).fetch(previewAllProjectsQuery)
  }


  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery);

  // const footerData = await getClient(preview).fetch(footerQuery, {
  //   lang: params.lang
  // });

  return {
    props: {
      preview,
      data: {
        indexData,
        allProjectsData,
        menuData,
        // footerData
      }
    }
  }
}

