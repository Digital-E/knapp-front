import styled from 'styled-components'
import sanityClient from '@sanity/client';
import { sanityConfig } from "../../lib/config"
import { useNextSanityImage } from 'next-sanity-image';
import Img from 'next/image';

const Container = styled.div`
    position: relative;
`


const Image = ({ data, hasCaption }) => {

    if(data === null || data === undefined) return null;

    const configuredSanityClient = sanityClient(sanityConfig);

    const imageProps = useNextSanityImage(
        configuredSanityClient,
        data.asset
    );

    return (
        <Container>
            <Img {...imageProps} alt={data.caption} 
            layout="responsive" 
            sizes="(max-width: 800px) 100vw, 800px" 
            />
            {
                (hasCaption && data.caption) && <span className="caption">{data.caption}</span>
            }
        </Container>
    )
}

export default Image;