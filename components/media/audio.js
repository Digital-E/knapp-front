import { useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import { store } from '../../store'

const Wrapper = styled.div`
    .caption {
        position: relative;
        bottom: auto;
        right: auto;
        top: 10px;
        color: var(--secondary);
    }
`

const Container = styled.div`
    position: relative;
`


export default function Component({ data, id }) {
    const audioRef = useRef()
    const { state } = useContext(store)

    useEffect(() => {
        if (state.meditationModeActive) audioRef.current?.pause()
    }, [state.meditationModeActive])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        const handlePlay = () => {
            document.querySelectorAll('audio').forEach(el => {
                if (el !== audio) el.pause()
            })
        }
        const handleEnded = () => {
            const all = Array.from(document.querySelectorAll('audio:not(#meditation-audio)'))
            const next = all[all.indexOf(audio) + 1]
            if (next) { next.currentTime = 0; next.play() }
        }
        audio.addEventListener('play', handlePlay)
        audio.addEventListener('ended', handleEnded)
        return () => {
            audio.removeEventListener('play', handlePlay)
            audio.removeEventListener('ended', handleEnded)
        }
    }, [])

    return (
        <Wrapper>
            <Container>
                <audio ref={audioRef} className="player" controls id={id}>
                    <source src={`${data?.audio?.asset?.url}`} type="audio/mp3" />
                </audio>
            </Container>
            {
                data?.caption && <span className="caption">{data.caption}</span>
            }
        </Wrapper>
    )
}