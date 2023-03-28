import styled from "styled-components"

import Image from "../image"
import Video from "../video-native"


const Container = styled.div`
`

const SliceWrapper = styled.div`
    border-radius: 7px;
    overflow: hidden;
    margin-bottom: 10px;

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


export default function Component({ data }) {

    return <Container>{(data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null}</Container>
}
