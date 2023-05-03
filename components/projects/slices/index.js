import { useRef } from 'react'
import styled from "styled-components"


import Body from '../../body'
import MediaGallery from './media-gallery'

const SliceWrapper = styled.div`
    margin: 70px 0 70px 0;
`

const HideCounter = styled.div`
  display: none;
`


export default function Component({ data, toggleExpand }) {

  let mediaCount = useRef(0);

  let renderSlice = (slice, index) => {
        switch(slice._type) {
            case 'MediaGallery':
            return (
              <>
              <SliceWrapper onClick={() => toggleExpand()} key={slice._key} className='media-gallery'><MediaGallery data={slice.media} mediaCount={mediaCount.current} /></SliceWrapper>
              <HideCounter>{mediaCount.current += slice.media.length}</HideCounter>
              </>
            )
            case 'textObject':
            return <SliceWrapper key={slice._key} className='text'><Body content={slice.text} /></SliceWrapper>;
        }
  }  

  return (data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null
}
