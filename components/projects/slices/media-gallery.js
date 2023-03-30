import { useState, useEffect } from 'react'
import styled from "styled-components"
import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

import Image from "../../media/image"
import Video from "../../media/video-native"


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const SliceWrapper = styled.div`
    height: 110px;
    width: ${props => props.aspectRatio * 110}px;
    border-radius: 7px;
    overflow: hidden;
    margin: 2px;
    border: 2px solid transparent;
    cursor: pointer;

    :hover {
        border: 2px solid var(--primary);
    }

`




export default function Component({ data, mediaCount }) {

    let [mediaCountState, setMediaCountState] = useState(0)

    useState(() => {
        setMediaCountState(mediaCount)
    }, [])

    let toggleMediaStack = (index) => {
        let mediaStack =  document.querySelector('#media-stack-right-column')

        scrollTo = gsap.to(mediaStack, {duration: 0.3, ease: "power2.inOut", scrollTo: {y: `#media-stack-element-${mediaCountState + index}`, offsetY: 130}, 
        // onComplete: () => killScroll()
        })
    }

    let renderSlice = (slice, index) => {
        
        switch(slice._type) {
            case 'video':
            return <SliceWrapper onMouseEnter={() => toggleMediaStack(index)} key={slice._key} aspectRatio={slice.width / slice.height}><Video data={slice} hasCaption={true} /></SliceWrapper>
            case 'image':
            return <SliceWrapper onMouseEnter={() => toggleMediaStack(index)} key={slice._key} aspectRatio={slice.asset.metadata.dimensions.aspectRatio}><Image data={slice} hasCaption={true} /></SliceWrapper>
        }
    }    

    return <Container>{(data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null}</Container>
}
