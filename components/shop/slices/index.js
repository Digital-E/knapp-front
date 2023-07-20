import { useRef } from 'react'
import styled from "styled-components"

import Body from '../../body'
import MediaGallery from '../../projects/slices/media-gallery'

const Container = styled.div`
  margin-top: 50px;
`

const SliceWrapper = styled.div`
    margin: 20px 0;
`

const Title = styled.h5``

const Description = styled.div``


const HideCounter = styled.div`
  display: none;
`



export default function Component({ data, toggleZoom }) {

  let mediaCount = useRef(0);

  let renderSlice = (slice, index) => {
            return (
              <Container>
              <Title>{slice.title}</Title>
              <SliceWrapper key={slice._key} className='media-gallery'><MediaGallery data={slice.media} mediaCount={mediaCount.current} toggleZoom={(index) => toggleZoom(index)} /></SliceWrapper>
              <Description className='text'><Body content={slice.description} /></Description>
              <HideCounter>{mediaCount.current += slice.media.length}</HideCounter>
              </Container>
            )
  }  

  return (data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null
}
