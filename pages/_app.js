import 'reset-css';

import '../styles/index.css'

import '../styles/flickity.css';

import { useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { StateProvider } from '../store'

import Body from '../components/body'
import CookieConsent from 'react-cookie-consent'


import Header from '../components/header'
import Footer from '../components/footer'

let desktopVariants = {
  pageInitial: {
    opacity: 0,
    filter: "blur(10px)"
  },
  pageAnimate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      opacity: {
        duration: 0.5
      },
      filter: {
        duration: 0.5,
      }
    }
  },
  pageExit: {
    opacity: 0,
    filter: "blur(20px)",
    transition: {
      opacity: {
        duration: 0.5
      },
      filter: {
        duration: 0.5,
      }
    }
  }
}


function MyApp({ Component, pageProps, router }) {

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#__next").style.opacity = 1
    }, 250)
  },[])

  return (
    <StateProvider>
      <Header data={pageProps.data?.menuData} />
      {/* <CookieConsent
        buttonText={pageProps.data?.menuData.cookieaccept}
        declineButtonText={pageProps.data?.menuData.cookierefuse}
        enableDeclineButton
        cookieName={"ContrechampsCHCookieConsent"}
        onAccept={() => {
          // gtag('consent', 'update', {
          //   'analytics_storage': 'granted'
          // });
        }}
        onDecline={() => {}}
        >
        <Body content={pageProps.data?.menuData.cookietext} />
      </CookieConsent> */} 
      <AnimatePresence exitBeforeEnter 
      onExitComplete={() => { window.scrollTo(0,0) }}
      >   
        <motion.div key={router.asPath} initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={desktopVariants}>            
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      {/* <Footer data={pageProps.data?.footerData}/> */}
    </StateProvider>
  )
}

export default MyApp
