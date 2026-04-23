import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Link from '../link'
import NextLink from 'next/link'
import { useMediaQuery } from 'react-responsive'

const Container = styled.div`
    min-width: 200px;
    width: fit-content;
    background: var(--background-ternary);
    padding: 20px;
    border-radius: 10px;

    @media(max-width: 989px) {
        position: absolute;
        min-width: 0;
        width: fit-content;
        padding: 7px 10px 5px 10px;
        border-radius: 25px;
        background: #252525;
        bottom: 35px;
        right: 20px;
    }
`

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;

    @media(max-width: 989px) {
        margin: 0;
    }
`

const Title = styled.h3``

const Dot = styled.div`
    position: relative;
    top: -1px;
    height: 10px;
    width: 10px;
    min-height: 10px;
    min-width: 10px;
    margin-left: 5px;
    background: var(--primary);
    border-radius: 999px;
    animation: blink 0.5s infinite alternate;

    @keyframes blink {
        0% { opacity: 1 }
        100% { opacity: 0 }
    }
`

const Text = styled.div`
    margin-top: 20px;
    text-transform: uppercase;

    @media(max-width: 989px) {
        display: none;
    }
`

const CloseButton = styled.div`
    position: absolute;
    top: -10px;
    right: -10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background: #555;
    opacity: 0;
    transition: opacity 0.2s ease;
    line-height: 1;

    svg path {
        fill: var(--primary);
    }

    @media(max-width: 989px) {
        display: none;
    }
`

const ContainerWrapper = styled(motion.div)`
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1;

    :hover ${CloseButton} {
        opacity: 1;
    }

    @media(max-width: 989px) {
        // position: absolute;
        bottom: 0;
        right: 0;
    }
`

const variants = {
    initial: {
        opacity: 0,
        scale: 1.1,
        display: "none",
    },
    show: {
        opacity: 1,
        scale: 1,
        display: "block",
        transition: { duration: 1, type: 'spring', ease: "easeInOut" }
    },
    hide: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.7, type: 'spring', ease: "easeInOut" },
        transitionEnd: { scale: 1.1, display: "none" }
    }
}

export default function Component() {
    let [show, setShow] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 989px)' })

    useEffect(() => {
        const t = setTimeout(() => setShow(true), 3000)
        return () => clearTimeout(t)
    }, [])

    const inner = (
        <ContainerWrapper className="hide-on-expand" animate={show ? 'show' : 'hide'} variants={variants} initial='initial'>
            <CloseButton onClick={() => setShow(false)}><svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="currentColor"/></svg></CloseButton>
            <Container>
                <TitleWrapper><Title>Shop</Title><Dot /></TitleWrapper>
                <Text className='body-large'>
                    <Link href='/shop'>Explore all products</Link>
                </Text>
            </Container>
        </ContainerWrapper>
    )

    return isMobile ? <NextLink href='/shop'>{inner}</NextLink> : inner
}
