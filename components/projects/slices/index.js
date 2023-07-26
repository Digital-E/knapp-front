import { useRef, useEffect } from 'react'
import styled from "styled-components"
import Plyr from 'plyr';


import Body from '../../body'
import MediaGallery from './media-gallery'
import Audio from '../../media/audio'

const SliceWrapper = styled.div`
    margin: 70px 0;

    @media(max-width: 989px) {
      margin: 35px 0;
    }
`

const HideCounter = styled.div`
  display: none;
`


export default function Component({ data, toggleZoom }) {

  let mediaCount = useRef(0);

  useEffect(() => {
      const players = Plyr.setup('.player', {
        controls: ['play', 'progress', 'current-time', 'mute']
      });
  },[])

  let renderSlice = (slice, index) => {
        switch(slice._type) {
            case 'MediaGallery':
            return (
              <>
              <SliceWrapper key={slice._key} className='media-gallery'><MediaGallery data={slice.media} mediaCount={mediaCount.current} toggleZoom={(index) => toggleZoom(index)} /></SliceWrapper>
              <HideCounter>{mediaCount.current += slice.media.length}</HideCounter>
              </>
            )
            case 'textObject':
            return <SliceWrapper key={slice._key} className='text'><Body content={slice.text} /></SliceWrapper>;
            case 'audio':
            return <SliceWrapper key={slice._key} className='audio'><Audio data={slice} /></SliceWrapper>;
        }
  }  

  return (data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null
}
