import { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import { store } from '../../store'

const Container = styled.div`
    position: relative;
    padding-bottom: ${props => props.className ? 'auto' : props.height / props.width * 100}%;

    > video {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        opacity: ${props => props.loaded ? 1 : 0};
        transition: opacity 0.4s ease;
    }
`


export default function Component({ data, autoPlay, controls, className }) {
    const [loaded, setLoaded] = useState(false)
    const videoRef = useRef()
    const { state } = useContext(store)

    useEffect(() => {
        if (state.meditationModeActive) videoRef.current?.pause()
    }, [state.meditationModeActive])

    return (
        <>
            <Container width={data.width} height={data.height} className={className} loaded={loaded ? 1 : 0}>
                <video ref={videoRef} className={className} width={data.width} height={data.height} autoPlay={autoPlay} muted loop playsInline controls={controls} onCanPlay={() => setLoaded(true)}>
                    <source src={data.asset.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Container>
            {
                data?.caption && <span className="caption">{data.caption}</span>
            }
        </>
    )
}
