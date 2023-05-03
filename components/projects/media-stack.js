import { useRef, useEffect, useState } from 'react'
import { Portal } from 'react-portal';
import styled from "styled-components"

import { motion } from 'framer-motion'

import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

import Image from "../media/image"
import Video from "../media/video-native"

const Container = styled.div`
    cursor: nwse-resize;
`


const InnerContainer = styled.div`
    height: calc(100vh - 112px);
    padding-top: 112px;
    overflow: scroll;
    transition: all 0.5s;
    // transform-origin: left top;

    &.expand {
        // transform: ${props => `translate(${(props.windowWidth / 2) - props.columnPosX - props.columnWidth / 2}px, ${props.windowHeight * 0.4 - 201.6 + 112}px) scale(1.8)`}
        transform: ${props => `translate(${(props.windowWidth / 2) - props.columnPosX - props.columnWidth / 2}px, ${props.windowHeight * 0.4 - 201.6 + 20}px) scale(1.8)`}
    }

    &.expand > div:last-child {
        // margin-bottom: ${props => `${props.windowHeight * 0.41}px`}
        margin-bottom: ${props => `${props.windowHeight * 0.365}px`}
    }
`

const SliceWrapper = styled.div`
    overflow: hidden;
    margin-bottom: 10px;
    transition: all 0.5s;

    :last-child {
        margin-bottom: 20px;
    }

    span, div {
        border-radius: 7px;
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
`

const overlayVariants = {
    visible: {
      display: 'block',
      opacity: 1,
    //   transition: {
    //     duration: 0.3,
    //     ease: "linear"
    //   }
    },
    hidden: {
      opacity: 0,
      transitionEnd: {
        display: 'none'
      }
    }
  }

let renderSlice = (slice, index) => {
    
      switch(slice._type) {
          case 'video':
          return <SliceWrapper key={slice._key} id={`media-stack-element-${index}`}><Video data={slice} hasCaption={true} /></SliceWrapper>
          case 'image':
          return <SliceWrapper key={slice._key} id={`media-stack-element-${index}`}><Image data={slice} hasCaption={true} /></SliceWrapper>
      }
}

let mediaStackExpandedVar = false

export default function Component({ data, toggleExpand }) {
    let containerRef = useRef();
    let innerContainerRef = useRef();
    
    let [windowHeight, setWindowHeight] = useState(0)
    let [windowWidth, setWindowWidth] = useState(0)
    let [columnPosX, setColumnPosX] = useState(0)
    let [columnWidth, setColumnWidth] = useState(0)

    let [mediaStackExpanded, setMediaStackExpanded] = useState(false)

    let setContainerWidth = () => {
        containerRef.current.style.width = 'initial';
        containerRef.current.style.width = `${containerRef.current.getBoundingClientRect().width}px`
    }

    let resize = () => {
        setColumnPosX(containerRef.current.getBoundingClientRect().x);
        setColumnWidth(containerRef.current.getBoundingClientRect().width);
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);

        if(mediaStackExpandedVar) {
            innerContainerRef.current.classList.add('expand')
        }
    }

    useEffect(() => {

        // setContainerWidth();
        resize();

        // window.addEventListener('resize', setContainerWidth)
        window.addEventListener('resize', resize)

        return () => {
            // window.removeEventListener('resize', setContainerWidth)
            window.removeEventListener('resize', resize)
        }
    }, [])

    let expandMediaStack = () => {
        setMediaStackExpanded(!mediaStackExpanded)
        mediaStackExpandedVar = !mediaStackExpandedVar
        
        if(innerContainerRef.current.classList.contains('expand')) {
            innerContainerRef.current.classList.remove('expand')

            document.querySelectorAll('.hide-on-expand').forEach(item => {
                item.classList.remove('hide-on-expand--expanded')
            })
        } else {
            innerContainerRef.current.classList.add('expand')

            document.querySelectorAll('.hide-on-expand').forEach(item => {
                item.classList.add('hide-on-expand--expanded')
            })
        }
    }

    useEffect(() => {
        if(toggleExpand < 1) return
        expandMediaStack()
    }, [toggleExpand])

    return (
        <Container ref={containerRef} >
            <Overlay animate={mediaStackExpanded ? 'visible' : 'hidden'} variants={overlayVariants} onClick={() => expandMediaStack()} />
            <InnerContainer 
                ref={innerContainerRef} 
                id="container" 
                windowHeight={windowHeight} 
                windowWidth={windowWidth} 
                columnPosX={columnPosX} 
                columnWidth={columnWidth} 
                onClick={() => expandMediaStack()}
                >
                {(data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null}
            </InnerContainer>
        </Container>
    )
}
