import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../components/layout'
import { SITE_NAME } from '../lib/constants'
import { homeQuery, previewHomeQuery, shopQuery, previewShopQuery, menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

import styled from 'styled-components'

// Components

import Body from '../components/body'
import Slices from '../components/shop/slices'
import MediaStack from '../components/projects/media-stack'
import Notification from '../components/shop/notification'


const Container = styled.div`
  position: relative; 
  min-height: 100vh;
`

const Constraints = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  transform: translate(-50%, -50%);
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
  padding: 20px 0 20px 0;
  overflow: scroll;
  z-index: -1;
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
`

let RightCol = styled.div`
  flex-basis: 30%;
  margin: 0 20px 0 0;
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



export default function Shop({ data = {}, preview }) {

  let constraintsRef = useRef();

  const router = useRouter()

  let [mediaStack, setMediaStack] = useState([])

  let [toggleExpand, setToggleExpand] = useState(0)

  const slug = data?.shopData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {
    // Create Media Stack Array
    let array = []

    data.shopData.products.forEach(item => {
      array.push(...item.media)
    })

    setMediaStack(array)

    // Set Padding Bottom
    let shopNotificationHeight = document.querySelector('#shop-notification').getBoundingClientRect().height

    document.querySelector('#shop-left-col').style.paddingBottom = `${shopNotificationHeight + 50}px`

  }, [])

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.shopData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.shopData?.content}
          />
        </Head>
        <Container>
          <Constraints ref={constraintsRef} />
          <InnerContainer>
            <LeftCol id='shop-left-col'>
              <InnerLeftCol>
              <Text className='body-large'>
                <Body content={data?.shopData?.text} />
              </Text>                
                <Slices data={data.shopData.products} toggleExpand={() => setToggleExpand(toggleExpand += 1)} />
              </InnerLeftCol>
            </LeftCol>
            <RightCol id='media-stack-right-column'>
              <MediaStack data={mediaStack} toggleExpand={toggleExpand} />
            </RightCol>
            <Notification data={data.shopData.stockists} constraintsRef={constraintsRef} />     
          </InnerContainer>     
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let slug = `shop`

  let homeData = await getClient(preview).fetch(homeQuery)

  let shopData = await getClient(preview).fetch(shopQuery, {
    slug: slug,
  })

  if(preview) {
    shopData = await getClient(preview).fetch(previewShopQuery) 

    aboutData = await getClient(preview).fetch(previewShopQuery, {
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
        homeData,
        shopData,
        menuData,
        footerData
      }
    }
  }
}
