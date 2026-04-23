import { useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import styled from 'styled-components'
import Layout from '../components/layout'
import { SITE_NAME } from '../lib/constants'
import { homeQuery, previewHomeQuery, indexQuery, previewIndexQuery, allProjectsQuery, previewAllProjectsQuery, menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

import { store } from "../store"

import Map from '../components/home/map'
import PopupIndex from '../components/home/popup-index'

const Container = styled.div`
  position: relative;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;

const Desktop = styled.div``;


export default function Index({ data = {}, preview }) {
  //Context
  const context = useContext(store);
  const { state, dispatch } = context;
  let [popupOpen, setPopupOpen] = useState(false);
  let [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const router = useRouter()

  const slug = data?.homeData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {
    document.querySelector("body").classList.add("body-lock");

    return () => {
      document.querySelector("body").classList.remove("body-lock");
    }

  }, []);

  let togglePopup = () => {
    setPopupOpen(false)
  }

  let hasClickedSymbolFunc = (index) => {
    setCurrentCategoryIndex(index)
    setPopupOpen(true)
  }

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.homeData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.homeData?.content}
          />
        </Head>
        <Container>
          <PopupIndex popupOpen={popupOpen} togglePopup={() => togglePopup()} data={data.indexData} currentCategoryIndex={currentCategoryIndex} />
          <Desktop>
            <Map hasClickedSymbol={(index) => hasClickedSymbolFunc(index)} />
          </Desktop>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let homeData = await getClient(preview).fetch(homeQuery)

  let allProjectsData = await getClient(preview).fetch(allProjectsQuery)

  let indexData = await getClient(preview).fetch(indexQuery)

  if(preview) {
    homeData = await getClient(preview).fetch(previewHomeQuery) 

    allProjectsData = await getClient(preview).fetch(previewAllProjectsQuery)

    indexData = await getClient(preview).fetch(previewIndexQuery)
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
        homeData,
        allProjectsData,
        indexData,
        menuData,
        // footerData
      }
    }
  }
}

