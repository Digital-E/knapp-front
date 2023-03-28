import styled from "styled-components"

import Body from '../../body'
import MediaGallery from './media-gallery'

const SliceWrapper = styled.div`
    margin: 70px 0 70px 0;

    // &.text {
    //     width: 75%;
    // }
`


let renderSlice = (slice, index) => {
    
    
      switch(slice._type) {
          case 'MediaGallery':
          return <SliceWrapper key={slice._key} className='media-gallery'><MediaGallery data={slice.media}  /></SliceWrapper>
          case 'textObject':
          return <SliceWrapper key={slice._key} className='text'><Body content={slice.text} /></SliceWrapper>;
      }
}


export default function Component({ data }) {

  return (data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null
}
