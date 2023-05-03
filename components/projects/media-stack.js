import { useRef, useEffect, useState } from 'react'
import styled from "styled-components"

import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

import Image from "../media/image"
import Video from "../media/video-native"


const Container = styled.div`
    height: calc(100vh - 112px);
    padding-top: 112px;
    overflow: scroll;
    transition: all 0.5s;
    // transform-origin: left top;

    &.expand {
        transform: ${props => `translate(${(props.windowWidth / 2) - props.columnPosX - props.columnWidth / 2}px, ${props.windowHeight * 0.4 - 201.6 + 112}px) scale(1.8)`}
    }

    &.expand > div:last-child {
        margin-bottom: ${props => `${props.windowHeight * 0.41}px`}
    }
`

const SliceWrapper = styled.div`
    border-radius: 7px;
    overflow: hidden;
    margin-bottom: 10px;
    transition: all 0.5s;

    :last-child {
        margin-bottom: 30px;
    }
`



let renderSlice = (slice, index) => {
    
      switch(slice._type) {
          case 'video':
          return <SliceWrapper key={slice._key} id={`media-stack-element-${index}`}><Video data={slice} hasCaption={true} /></SliceWrapper>
          case 'image':
          return <SliceWrapper key={slice._key} id={`media-stack-element-${index}`}><Image data={slice} hasCaption={true} /></SliceWrapper>
      }
}


export default function Component({ data, toggleExpand }) {
    let containerRef = useRef();
    let [windowHeight, setWindowHeight] = useState(0)
    let [windowWidth, setWindowWidth] = useState(0)
    let [columnPosX, setColumnPosX] = useState(0)
    let [columnWidth, setColumnWidth] = useState(0)

    let setContainerWidth = () => {
        containerRef.current.style.width = 'initial';
        containerRef.current.style.width = `${containerRef.current.getBoundingClientRect().width}px`
    }

    let resize = () => {
        setColumnPosX(containerRef.current.getBoundingClientRect().x);
        setColumnWidth(containerRef.current.getBoundingClientRect().width);
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {

        setContainerWidth();
        resize();

        // window.addEventListener('resize', setContainerWidth)
        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', setContainerWidth)
            window.removeEventListener('resize', resize)
        }
    }, [])

    let expandMediaStack = () => {
        toggleExpand()
        if(containerRef.current.classList.contains('expand')) {
            containerRef.current.classList.remove('expand')
        } else {
            containerRef.current.classList.add('expand')
        }
    }

    return (
        <Container 
            id="container" 
            windowHeight={windowHeight} 
            windowWidth={windowWidth} 
            columnPosX={columnPosX} 
            columnWidth={columnWidth} 
            ref={containerRef} 
            onClick={() => expandMediaStack()}
            >
            {(data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null}
        </Container>
    )
}
