import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    padding-bottom: ${props => props.className ? 'auto' : props.height / props.width * 100}%;

    > video {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
    }
`


export default function Component({ data, autoPlay, controls, className }) {

    return (
        <>
            <Container width={data.width} height={data.height} className={className}>
                <video className={className} width={data.width} height={data.height} autoPlay={autoPlay} muted loop playsInline controls={controls}>
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