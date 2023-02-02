import { useEffect } from "react"
import styled from "styled-components"
import Plyr from 'plyr';


import Body from "../body"
import Image from "../image"
import Video from "../video"

const SliceWrapper = styled.div`
    margin: 0 0 30px 0;
`


let renderSlice = (slice ,index) => {
    
      switch(slice._type) {
          case 'video':
          return <SliceWrapper key={slice._id}><Video data={slice.video} id={`video-${index}`}/></SliceWrapper>
          case 'image':
          return <SliceWrapper key={slice._id} className="image-slice"><Image data={slice} hasCaption={true} /></SliceWrapper>
          case 'Text':
          return <SliceWrapper key={slice._id} className={slice.doubleColumn ? "double-col" : ""}><Body content={slice.text} /></SliceWrapper>;
      }
}


export default function Component({ data }) {

    useEffect(() => {
        // const players = Array.from(document.querySelectorAll('.player')).map((p) => new Plyr(p));
        const players = Plyr.setup('.player');
    },[])

  return (data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null
}
