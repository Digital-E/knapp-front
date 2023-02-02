import { useEffect, useRef, useState, useContext } from 'react';
import { useRouter } from 'next/router';

import styled from "styled-components"

import { store } from '../../store'

import { motion } from 'framer-motion'

import Slices from '../../components/slices'




const Container = styled(motion.div)`
    position: fixed;
    height: 100%;
    width: 45%;
    right: 0;
    z-index: 999;
    background: white;
`

const CloseButton = styled.div`
    position: absolute;
    right: 30px;
    top: 30px;
    font-family: "Picnic Regular";
    cursor: pointer;
    transition: 0.2s;
    z-index: 999;

    :hover {
        transform: scale(1.1);
    }

    img {
        width: 30px;
    }
`

let Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh !important;
  width: 100vw !important;
//   backdrop-filter: blur(1px);
  z-index: 1;
  transform: none !important;
  pointer-events: all;
`

const Title = styled.h1`
    margin-bottom: 30px;
`


let ContainerInner = styled.div`
    height: 100%;
    overflow: scroll;

    > div {
        padding: 30px;
    }

    > div > h1 {
        padding-right: 50px;
    }
`




let variants = {
    open: {
        right: 0,
        transition: {
            duration: 0.5
        }
    },
    closed: {
        right: "-45%",
        transition: {
            duration: 0.5
        }
    }
}

let overlayVariants = {
    "visible": {
      opacity: 1,
      display: "block",
    },
    "hidden": {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    }
  }


export default ({ preview, data }) => {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let router = useRouter();

    let containerRef = useRef();

    let [reveal, setReveal] = useState(false);


    useEffect(() => {
        setReveal(true)
    }, [])

    let hasClicked = () => {
        setReveal(false)

        setTimeout(() => {
            router.push("/")
        }, 250)
    }


    return (
        <>
            <Container ref={containerRef} initial="closed" animate={reveal ? "open" : "closed"} variants={variants}>
                <CloseButton onClick={() => hasClicked()}><img src="/icons/close.svg" /></CloseButton>
                <ContainerInner>
                    <div>
                        <Title>{ data?.title }</Title>
                        <Slices data={ data?.slices } />
                    </div>
                </ContainerInner>
            </Container>
            <Overlay animate={reveal ? "visible" : "hidden"} variants={overlayVariants} onClick={() => hasClicked()}/>
        </>
    )
}