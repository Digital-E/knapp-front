import sanityClient from '@sanity/client';
import { sanityConfig } from "../lib/config"
import { useNextSanityImage } from 'next-sanity-image';
import Img from 'next/image';

const Image = ({ data, hasCaption }) => {

    if(data === null) return null;

    const configuredSanityClient = sanityClient(sanityConfig);

    const imageProps = useNextSanityImage(
        configuredSanityClient,
        data.asset
    );

    return (
        <>
        <Img {...imageProps} alt={data.caption} layout="responsive" sizes="(max-width: 800px) 100vw, 800px" />
        {
            (hasCaption && data.caption) && <span className="caption">{data.caption}</span>
        }
        </>
    )
}

export default Image;