import styled from 'styled-components'

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

    return (
        <Wrapper>
            <Container>
                <audio className="player" controls id={id}>
                    <source src={`${data?.audio?.asset?.url}`} type="audio/mp3" />
                </audio>
            </Container>
            {
                data?.caption && <span className="caption">{data.caption}</span>
            }
        </Wrapper>
    )
}