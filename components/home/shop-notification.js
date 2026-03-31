import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Link from '../link'
import NextLink from 'next/link'
import { useMediaQuery } from 'react-responsive'

const Container = styled(motion.div)`
    position: fixed;
    bottom: 20px;
    right: 20px;
    min-width: 200px;
    width: fit-content;
    background: var(--background-ternary);
    padding: 20px;
    border-radius: 10px;
    z-index: 999;

    @media(max-width: 989px) {
        min-width: 0;
        width: fit-content;
        padding: 7px 10px 5px 10px;
        border-radius: 25px;
        background: #252525;
        bottom: 35px;
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
    top: 20px;
    right: 20px;
    cursor: pointer;
    opacity: 0.5;
    line-height: 1;

    :hover {
        opacity: 1;
    }
`

const variants = {
    show: { opacity: 1, y: 0 },
    hide: { opacity: 0, y: 40 }
}

export default function Component() {
    let [show, setShow] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 989px)' })

    useEffect(() => {
        const t = setTimeout(() => setShow(true), 3000)
        return () => clearTimeout(t)
    }, [])

    const inner = (
        <Container animate={show ? 'show' : 'hide'} variants={variants} initial='hide'>
            {/* <CloseButton onClick={() => setShow(false)}><p>X</p></CloseButton> */}
            <TitleWrapper><Title>Shop</Title><Dot /></TitleWrapper>
            <Text className='body-large'>
                <Link href='/shop'>Explore all products</Link>
            </Text>
        </Container>
    )

    return isMobile ? <NextLink href='/shop'>{inner}</NextLink> : inner
}
