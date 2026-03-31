import { useRef } from 'react'
import styled from "styled-components"

import Image from "../media/image"
import Video from "../media/video-native"

const Container = styled.div`
    cursor: nwse-resize;
`


const InnerContainer = styled.div`
    height: calc(100vh - 112px);
    padding: 112px 0 0 0;
    overflow: scroll;
    transition: all 0.5s;

    &.expand > div {
        margin-bottom: 50px;
    }

    > span, > div {
        border-radius: 7px;
    }

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

const SliceWrapper = styled.div`
    overflow: hidden;
    margin-bottom: 10px;
    // pointer-events: none;
    // pointer-events: clickable;

    &.hide {
        opacity: 0;
    }

    :last-child {
        margin-bottom: 20px;
    }
`

export default function Component({ data, toggleZoom }) {
    let containerRef = useRef();
    let innerContainerRef = useRef();

    let renderSlice = (slice, index) => {
        
        switch(slice._type) {
            case 'video':
            return <SliceWrapper key={slice._key} id={`media-stack-element-${index}`} onClick={() => toggleZoom(index)}><Video data={slice} hasCaption={true} autoPlay={true} /></SliceWrapper>
            case 'image':
            return <SliceWrapper key={slice._key} id={`media-stack-element-${index}`} onClick={() => toggleZoom(index)}><Image data={slice} hasCaption={true} /></SliceWrapper>
        }
    }    

    return (
        <Container ref={containerRef} >
            <InnerContainer 
                className='media-stack-inner-container'
                ref={innerContainerRef} 
                >
                {(data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null}
            </InnerContainer>
        </Container>
    )
}
