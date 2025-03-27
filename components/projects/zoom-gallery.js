import { useRef, useEffect, useState } from 'react'
import styled from "styled-components"
import Plyr from 'plyr';

import { motion } from 'framer-motion'

import { useMediaQuery } from 'react-responsive'

import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

import Image from "../media/image"
import Video from "../media/video-native"

import Button from '../button'

const Container = styled(motion.div)`
    @media(max-width: 989px) {
        height: 100%;
    }
`

const InnerContainer = styled.div`
    position: relative;
    z-index: 999;
    height: 100vh;
    padding: 0;
    overflow: scroll;
    transition: all 0.3s;
    scroll-snap-type: y mandatory;

    .caption {
        opacity: 0;
    }

    @media(max-width: 989px) {
        height: 100%;
        padding: 20px;
        left: 0;
        top: 0;
        box-sizing: border-box;
        overflow: hidden;
    }
`

const SliceOuter = styled.div`
    height: 100vh;
    padding: ${props => props.margin / 2}px 0;
    box-sizing: border-box;
    scroll-snap-align: center;

    @media(max-width: 989px) {
        display: flex;
        align-items: center;
        padding: 0;
        height: 100%;
    }
`


const SliceWrapper = styled.div`
    position: relative;
    overflow: hidden;
    margin: 0px auto;
    transition: all 0.3s;

    &.placement {
        transition: all 0s !important;
    }

    @media(max-width: 989px) {
        width: 100% !important;
    }
`

const Overlay = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: var(--background);
  z-index: 0;
  cursor: nwse-resize;
`

const CloseButton = styled(motion.div)`
    position: fixed;
    // bottom: 20px;
    // left: 50%;
    // transform: translateX(-50%);
    top: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 999;

    @media(max-width: 989px) {
        bottom: auto;
        top: 20px;
    }
`


let mediaStackExpandedVar = false

let mediaStackMediaPositionX = 0
let mediaStackMediaPositionY = 0
let mediaStackMediaWidth = 0
let mediaStackMediaHeight = 0
let mediaStackMediaZoomWidth = 0
let mediaStackMediaZoomHeight = 0

let mediaStackMediazoomMargin = 50


let hasClickedTimeout = null;
let hasClicked = false;

let zoomIndex = 0;

let scrollCount = 0;

let scrollTimeout = null;
let isScrolling = false;

let players = null;

export default function Component({ data, toggleZoomState, toggleZoom }) {
    let containerRef = useRef();
    let innerContainerRef = useRef();

    let [mediaStackExpanded, setMediaStackExpanded] = useState(false)

    const isDesktop = useMediaQuery({
        query: '(min-width: 990px)'
    }) 

    useEffect(() => {
        zoomIndex = toggleZoomState
    }, [toggleZoomState])

    let resize = () => {
        mediaStackMediaPositionX = document.querySelector(`#media-stack-element-${zoomIndex}`)?.getBoundingClientRect().x
        mediaStackMediaPositionY = document.querySelector(`#media-stack-element-${zoomIndex}`)?.getBoundingClientRect().y
        mediaStackMediaWidth = document.querySelector(`#media-stack-element-${zoomIndex}`)?.getBoundingClientRect().width
        mediaStackMediaHeight = document.querySelector(`#media-stack-element-${zoomIndex}`)?.getBoundingClientRect().height
        mediaStackMediaZoomWidth = document.querySelector(`#media-stack-zoom-element-${zoomIndex}`)?.getBoundingClientRect().width
        mediaStackMediaZoomHeight = document.querySelector(`#media-stack-zoom-element-${zoomIndex}`)?.getBoundingClientRect().height
        
        Array.from(innerContainerRef.current.children).forEach(item => {
            item.children[0].style.width = `${(window.innerHeight - mediaStackMediazoomMargin) * (item.children[0].getBoundingClientRect().width / item.children[0].getBoundingClientRect().height )}px`
        });
    }

    let onScroll = (e) => {
        clearTimeout(scrollTimeout)

        isScrolling = true

        scrollTimeout = setTimeout(() => {
            isScrolling = false
        }, 0)

        scrollCount += 1;

        if(scrollCount < 1) return
        
        document.querySelectorAll('.media-stack-zoom-element').forEach((item, index) => {
            if(item.getBoundingClientRect().y === mediaStackMediazoomMargin / 2 && mediaStackExpandedVar) {
                gsap.to(document.querySelector('.media-stack-inner-container'), {duration: 0, scrollTo: {y: `#media-stack-element-${index}`, offsetY: 100}})
                zoomIndex = index
            }
        })
    }

    let clickZoomGallery = (e) => {

        let windowWidth = window.innerWidth;
        let mousePositionX = e.clientX;

        if(mousePositionX / windowWidth > 0.5) {
            if(zoomIndex === data.length - 1) {
                zoomIndex = 0;
            } else {
                zoomIndex += 1;
            }
        } else if (mousePositionX / windowWidth <= 0.5) {
            if(zoomIndex === 0) {
                zoomIndex = data.length -1;
            } else {
                zoomIndex -= 1;
            }
        }

        gsap.to(innerContainerRef.current, {duration: 0, ease: "power2.inOut", scrollTo: {y: `#media-stack-zoom-element-${zoomIndex}`, offsetY: 100}})
    }

    useEffect(() => {

        // Add scroll listener
        innerContainerRef.current.addEventListener('scroll', onScroll)

        setTimeout(() => {
            resize();
        }, 100)

        window.addEventListener('resize', resize)
        
        // Add players
        setTimeout(() => {
            players = Plyr.setup('.player', {
                controls: ['play', 'progress', 'current-time', 'mute', 'fullscreen'],
                fullscreen: {iosNative: true}
            }); 

            players?.forEach(item => item.on('canplay', resize))
        }, 0)
    
        return () => {
            window.removeEventListener('resize', resize)
            innerContainerRef.current?.removeEventListener('scroll', onScroll)
        }
    }, [])

    let renderSlice = (slice, index) => {
        
        switch(slice._type) {
            case 'video':
            return <SliceOuter margin={mediaStackMediazoomMargin}><SliceWrapper key={slice._key} id={`media-stack-zoom-element-${index}`} className='placement media-stack-zoom-element'><Video data={slice} hasCaption={true} controls={true} autoplay={false} className='player' /></SliceWrapper></SliceOuter>
            case 'image':
            return <SliceOuter margin={mediaStackMediazoomMargin}><SliceWrapper key={slice._key} id={`media-stack-zoom-element-${index}`} className='placement media-stack-zoom-element'><Image data={slice} hasCaption={true} /></SliceWrapper></SliceOuter>
        }
    }    

    let positionMediaOpen = () => {

        if(hasClicked) return;

        scrollCount = 0;

        clearTimeout(hasClickedTimeout)

        hasClicked = true

        hasClickedTimeout = setTimeout(() => {
            hasClicked = false;
        }, 300);

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

        // Hide HUD elements

        document.querySelectorAll('.hide-on-expand').forEach(item => {
            item.classList.add('hide-on-expand--expanded')
        })        

        if(window.innerWidth < 990) return

        mediaStackMediaPositionX = document.querySelector(`#media-stack-element-${toggleZoomState}`)?.getBoundingClientRect().x
        mediaStackMediaPositionY = document.querySelector(`#media-stack-element-${toggleZoomState}`)?.getBoundingClientRect().y
        mediaStackMediaWidth = document.querySelector(`#media-stack-element-${toggleZoomState}`)?.getBoundingClientRect().width
        mediaStackMediaHeight = document.querySelector(`#media-stack-element-${toggleZoomState}`)?.getBoundingClientRect().height
        mediaStackMediaZoomWidth = document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`)?.getBoundingClientRect().width
        mediaStackMediaZoomHeight = document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`)?.getBoundingClientRect().height


        let scale = mediaStackMediaWidth / mediaStackMediaZoomWidth
        let scaleHeight = mediaStackMediaHeight / mediaStackMediaZoomHeight

        let newLeft = (window.innerWidth - (mediaStackMediaZoomWidth * scale)) / 2
        let left = mediaStackMediaPositionX - newLeft

        let newTop = (window.innerHeight - (mediaStackMediaZoomHeight * scaleHeight)) / 2
        let top = mediaStackMediaPositionY - newTop

        document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).style.transform = `translate(${left}px, ${top}px) scale(${scale})`

        // Enlarge Media
        setTimeout(() => {
            // Hide Clicked Media
            document.querySelector(`#media-stack-element-${toggleZoomState}`).classList.add('hide');

            document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).classList.remove('placement')
            document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).style.transform = 'scale(1)';
        }, 100)        
    }

    let positionMediaClose = () => {
        if(hasClicked || isScrolling) return;

        clearTimeout(hasClickedTimeout)

        hasClicked = true

        hasClickedTimeout = setTimeout(() => {
            hasClicked = false;
        }, 300);

        let currentIndex = 0

        document.querySelectorAll('.media-stack-zoom-element').forEach((item, index) => {
            if(item.getBoundingClientRect().y >= 0 && item.getBoundingClientRect().y <= window.innerHeight) {
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

        setMediaStackExpanded(!mediaStackExpanded)
        mediaStackExpandedVar = !mediaStackExpandedVar

        // Show HUD elements

        document.querySelectorAll('.hide-on-expand').forEach(item => {
            item.classList.remove('hide-on-expand--expanded')
        })      
        
        // Pause all players
        players?.forEach(item => item.pause())

        if(window.innerWidth < 990) return toggleZoom(null)

        mediaStackMediaPositionX = document.querySelector(`#media-stack-element-${toggleZoomState}`)?.getBoundingClientRect().x
        mediaStackMediaPositionY = document.querySelector(`#media-stack-element-${toggleZoomState}`)?.getBoundingClientRect().y
        mediaStackMediaWidth = document.querySelector(`#media-stack-element-${toggleZoomState}`)?.getBoundingClientRect().width
        mediaStackMediaHeight = document.querySelector(`#media-stack-element-${toggleZoomState}`)?.getBoundingClientRect().height
        mediaStackMediaZoomWidth = document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`)?.getBoundingClientRect().width
        mediaStackMediaZoomHeight = document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`)?.getBoundingClientRect().height
        

        let scale = mediaStackMediaWidth / mediaStackMediaZoomWidth
        let scaleHeight = mediaStackMediaHeight / mediaStackMediaZoomHeight

        let newLeft = (window.innerWidth - (mediaStackMediaZoomWidth * scale)) / 2
        let left = mediaStackMediaPositionX - newLeft

        let newTop = (window.innerHeight - (mediaStackMediaZoomHeight * scaleHeight)) / 2
        let top = mediaStackMediaPositionY - newTop   
        
        // Shrink Media
        document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).classList.remove('placement')   
        
        if(!isScrolling) {
            document.querySelector(`#media-stack-zoom-element-${toggleZoomState}`).style.transform = `translate(${left}px, ${top}px) scale(${scale})`  
        }  


        setTimeout(() => {
            // Show Clicked Media
            document.querySelector(`#media-stack-element-${toggleZoomState}`).classList.remove('hide');            

            toggleZoom(null)         
        }, 300)
          
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
                duration: isDesktop ? 0.1 : 0,
            }
        },
        hidden: {
            opacity: 0,
            pointerEvents: 'none',
            transition: {
                pointerEvents: {
                    delay: 0
                },
                opacity: {
                    duration: isDesktop ? 0.3 : 0,
                    delay: isDesktop ? 0.3 : 0
                }
            }
        }
      }  
      
      const closeButtonVariants = {
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3
            }
        },
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.1,
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
        initial={'hidden'}
        variants={zoomGalleryVariants}>
            <Overlay animate={mediaStackExpanded ? 'visible' : 'hidden'} variants={overlayVariants} onClick={(e) => clickZoomGallery(e)}/>
            <InnerContainer ref={innerContainerRef}
                    onClick={(e) => clickZoomGallery(e)}>
                {(data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null}
            </InnerContainer>
            <CloseButton animate={mediaStackExpanded ? 'visible' : 'hidden'} variants={closeButtonVariants}onClick={() => expandMediaStack('close')}><Button>Close</Button></CloseButton>
        </Container>
    )
}
