import { useRef, useEffect, useState } from 'react'
import { Portal } from 'react-portal';
import styled from "styled-components"

import { motion } from 'framer-motion'

import { useMediaQuery } from 'react-responsive'

import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

import Image from "../media/image"
import Video from "../media/video-native"

const Container = styled(motion.div)`

`


const InnerContainer = styled.div`
    position: relative;
    z-index: 999;
    height: 100vh;
    padding: 0;
    overflow: scroll;
    transition: all 0.5s;
    scroll-snap-type: y mandatory;

    &.expand .caption {
        opacity: 0;
    }

    @media(max-width: 989px) {
        height: 100vh;
        padding: 20px;
        left: 0;
        top: 0;
        box-sizing: border-box;

        &.expand {
            width: 100%;
            position: fixed;
            transform: none;
            transition: all 0s;
        }


        &.expand > div:last-child {
            margin-bottom: 0
        }
    }
`

const SliceOuter = styled.div`
    height: 100vh;
    padding: 100px 0;
    box-sizing: border-box;
    scroll-snap-align: center;
`


const SliceWrapper = styled.div`
    position: relative;
    overflow: hidden;
    margin: 0px auto;
    transition: all 0.5s;

    &.placement {
        transition: all 0s !important;
    }
`

const Overlay = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: var(--background);
  z-index: 0;
  cursor: nwse-resize;
`

let mediaStackExpandedVar = false

let mediaStackMediaPositionXInit = 0
let mediaStackMediaPositionYInit = 0
let mediaStackMediaWidthInit = 0
let mediaStackMediaHeightInit = 0


let mediaStackMediaZoomWidthInit = 0
let mediaStackMediaZoomHeightInit = 0

let hasClickedTimeout = null;
let hasClicked = false;

export default function Component({ data, toggleZoomState, toggleZoom }) {
    let containerRef = useRef();
    let innerContainerRef = useRef();

    let [mediaStackExpanded, setMediaStackExpanded] = useState(false)

    const isDesktop = useMediaQuery({
        query: '(min-width: 990px)'
    }) 

    let resize = () => {
        Array.from(innerContainerRef.current.children).forEach(item => {
            item.children[0].style.width = `${(window.innerHeight - 200) * (item.children[0].getBoundingClientRect().width / item.children[0].getBoundingClientRect().height )}px`
        });
    }

    let onScroll = () => {
        document.querySelectorAll('.media-stack-zoom-element').forEach((item, index) => {
            if(item.getBoundingClientRect().y > 0 && item.getBoundingClientRect().y < window.innerHeight) {
                setTimeout(() => {
                    gsap.to(document.querySelector('.media-stack-inner-container'), {duration: 0, scrollTo: {y: `#media-stack-element-${index}`, offsetY: 100}})
                }, 500)
            }
        })
    }

    useEffect(() => {

        // Add scroll listener
        innerContainerRef.current.addEventListener('scroll', onScroll)

        setTimeout(() => {
            resize();
        }, 100)

        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
            innerContainerRef.current.removeEventListener('scroll', onScroll)
        }
    }, [])

    let renderSlice = (slice, index) => {
        
        switch(slice._type) {
            case 'video':
            return <SliceOuter><SliceWrapper key={slice._key} id={`media-stack-zoom-element-${index}`} className='placement media-stack-zoom-element'><Video data={slice} hasCaption={true} /></SliceWrapper></SliceOuter>
            case 'image':
            return <SliceOuter><SliceWrapper key={slice._key} id={`media-stack-zoom-element-${index}`} className='placement media-stack-zoom-element'><Image data={slice} hasCaption={true} /></SliceWrapper></SliceOuter>
        }
    }    

    let positionMediaOpen = () => {
        setMediaStackExpanded(!mediaStackExpanded)
        mediaStackExpandedVar = !mediaStackExpandedVar 
        
        // Reset All
        document.querySelectorAll('.media-stack-zoom-element').forEach(item => {
            item.classList.add('placement')
            item.style.transform = 'none';
            item.style.top = '0px';
        })

        // Place Media
        gsap.to(innerContainerRef.current, {duration: 0, ease: "power2.inOut", scrollTo: {y: `#media-stack-zoom-element-${toggleZoomState}`, offsetY: 100}})

        if(!hasClicked) {
            mediaStackMediaPositionXInit = document.querySelector(`#media-stack-element-${toggleZoomState}`).getBoundingClientRect().x
            mediaStackMediaPositionYInit = document.querySelector(`#media-stack-element-${toggleZoomState}`).getBoundingClientRect().y
            mediaStackMediaWidthInit = document.querySelector(`#media-stack-element-${toggleZoomState}`).getBoundingClientRect().width
            mediaStackMediaHeightInit = document.querySelector(`#media-stack-element-${toggleZoomState}`).getBoundingClientRect().height


            mediaStackMediaZoomWidthInit = document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).getBoundingClientRect().width
            mediaStackMediaZoomHeightInit = document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).getBoundingClientRect().height
        }

        // hasClicked = true;
        
        // hasClickedTimeout = setTimeout(() => {
        //     hasClicked = false
        // }, 500)


        let scale = mediaStackMediaWidthInit / mediaStackMediaZoomWidthInit
        let scaleHeight = mediaStackMediaHeightInit / mediaStackMediaZoomHeightInit

        let newLeft = (window.innerWidth - (mediaStackMediaZoomWidthInit * scale)) / 2
        let left = mediaStackMediaPositionXInit - newLeft

        let newTop = (window.innerHeight - (mediaStackMediaZoomHeightInit * scaleHeight)) / 2
        let top = mediaStackMediaPositionYInit - newTop

        document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).style.transform = `translate(${left}px, ${top}px) scale(${scale})`

        // Hide HUD elements

        document.querySelectorAll('.hide-on-expand').forEach(item => {
            item.classList.add('hide-on-expand--expanded')
        })


        // Hide Clicked Media
        document.querySelector(`#media-stack-element-${toggleZoomState}`).classList.add('hide');

        // Enlarge Media
        setTimeout(() => {
            document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).classList.remove('placement')
            document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).style.transform = 'scale(1)';
        }, 10)        
    }

    let positionMediaClose = () => {
        let currentIndex = 0

        document.querySelectorAll('.media-stack-zoom-element').forEach((item, index) => {
            if(item.getBoundingClientRect().y === 100) {
                currentIndex = index
            }
        })

        toggleZoomState = currentIndex

        Array.from(document.querySelector('.media-stack-inner-container').children).forEach((item, index) => {
            if(item.classList.contains('hide') && currentIndex !== index) {
                item.classList.remove('hide')
            }

            if(!item.classList.contains('hide') && currentIndex === index) {
                item.classList.add('hide')
            }
        })

        let mediaStackMediaPositionX = document.querySelector(`#media-stack-element-${toggleZoomState}`).getBoundingClientRect().x
        let mediaStackMediaPositionY = document.querySelector(`#media-stack-element-${toggleZoomState}`).getBoundingClientRect().y
        let mediaStackMediaWidth = document.querySelector(`#media-stack-element-${toggleZoomState}`).getBoundingClientRect().width
        let mediaStackMediaHeight = document.querySelector(`#media-stack-element-${toggleZoomState}`).getBoundingClientRect().height

        let mediaStackMediaZoomWidth = document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).getBoundingClientRect().width
        let mediaStackMediaZoomHeight = document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).getBoundingClientRect().height

        let scale = mediaStackMediaWidth / mediaStackMediaZoomWidth
        let scaleHeight = mediaStackMediaHeight / mediaStackMediaZoomHeight

        let newLeft = (window.innerWidth - (mediaStackMediaZoomWidth * scale)) / 2
        let left = mediaStackMediaPositionX - newLeft

        let newTop = (window.innerHeight - (mediaStackMediaZoomHeight * scaleHeight)) / 2
        let top = mediaStackMediaPositionY - newTop   
        
        // Shrink Media
        document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).classList.remove('placement')   
        
        document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).style.transform = `translate(${left}px, ${top}px) scale(${scale})`    

        // Show HUD elements

        document.querySelectorAll('.hide-on-expand').forEach(item => {
            item.classList.remove('hide-on-expand--expanded')
        }) 


        setMediaStackExpanded(!mediaStackExpanded)
        mediaStackExpandedVar = !mediaStackExpandedVar

        setTimeout(() => {
            // Show Clicked Media
            document.querySelector(`#media-stack-element-${toggleZoomState}`).classList.remove('hide');            

            toggleZoom(null)         
        }, 500)
          
    }

    let expandMediaStack = (action) => {

        if(action !== 'close') {
            positionMediaOpen()
        } else {
            positionMediaClose()
        }

    }

    const overlayVariants = {
        visible: {
        //   display: 'block',
          pointerEvents: 'all',
          opacity: 1,
          transition: {
            duration: isDesktop ? 0.3 : 0,
          }
        },
        hidden: {
          opacity: 0,
          pointerEvents: 'none',
          transition: {
            duration: isDesktop ? 0.3 : 0,
          },
        //   transitionEnd: {
        //     display: 'none'
        //   }
        }
      }

      const zoomGalleryVariants = {
        visible: {
            pointerEvents: 'all',
            opacity: 1,
            transition: {
                duration: 0
            }
        },
        hidden: {
            opacity: 0,
            pointerEvents: 'none',
            transition: {
                duration: 0,
                delay: 0.5
            }
        }
      }      

    useEffect(() => {
        if(toggleZoomState !== null) {
            expandMediaStack();
        }
    }, [toggleZoomState])

    return (
        <Container ref={containerRef} 
        animate={mediaStackExpanded ? 'visible' : 'hidden'} 
        variants={zoomGalleryVariants}>
            <Overlay animate={mediaStackExpanded ? 'visible' : 'hidden'} variants={overlayVariants}  />
            <InnerContainer 
                ref={innerContainerRef} 
                onClick={() => expandMediaStack('close')}
                >
                {(data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null}
            </InnerContainer>
        </Container>
    )
}
