import { useState } from 'react'
import styled from 'styled-components'
import sanityClient from '@sanity/client';
import { sanityConfig } from "../../lib/config"
import { useNextSanityImage } from 'next-sanity-image';
import Img from 'next/image';

const Container = styled.div`
    position: relative;
`

const StyledImg = styled(Img)`
    opacity: ${props => props.loaded ? 1 : 0};
    transition: opacity 0.4s ease;
`

const Image = ({ data, hasCaption }) => {
    const [loaded, setLoaded] = useState(false)

    if(data === null || data === undefined) return null;

    const configuredSanityClient = sanityClient(sanityConfig);

    const imageProps = useNextSanityImage(
        configuredSanityClient,
        data.asset
    );

    return (
        <Container>
            <StyledImg
                {...imageProps}
                alt={data.caption}
                layout="responsive"
                sizes="(max-width: 800px) 100vw, 800px"
                loaded={loaded ? 1 : 0}
                onLoadingComplete={() => setLoaded(true)}
            />
            {
                (hasCaption && data.caption) && <span className="caption">{data.caption}</span>
            }
        </Container>
    )
}

export default Image;
