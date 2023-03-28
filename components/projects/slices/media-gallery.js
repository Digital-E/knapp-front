import styled from "styled-components"

import Image from "../../image"
import Video from "../../video-native"


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

    :hover {
        border: 2px solid var(--primary);
    }

`


let renderSlice = (slice, index) => {
    
      switch(slice._type) {
          case 'video':
          return <SliceWrapper key={slice._key} aspectRatio={slice.width / slice.height}><Video data={slice} hasCaption={true} /></SliceWrapper>
          case 'image':
          return <SliceWrapper key={slice._key} aspectRatio={slice.asset.metadata.dimensions.aspectRatio}><Image data={slice} hasCaption={true} /></SliceWrapper>
      }
}


export default function Component({ data }) {

    return <Container>{(data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null}</Container>
}
