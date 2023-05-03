import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import Body from '../body'

const Container = styled(motion.div)`
    position: fixed;
    min-width: 420px;
    min-height: 80px;
    background: var(--background-ternary);
    bottom: 30px;
    left: 40px;
    padding: 20px;
    border-radius: 10px;
    z-index: 999;
    cursor: grab;

    :active {
        cursor: grabbing;
    }
`

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
        0% {
            opacity: 1
        }
        100% {
            opacity: 0
        }
    }
`


const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
`

const Title = styled.h3``

const Text = styled.div`
    margin-top: 20px;

    &.body-large p, &.body-large a {
    font-size: inherit;
    }

    * {
    text-transform: uppercase;
    }    
`


const variants = {
    'show': {
        y: 0
    },
    'hide': {
        y: 100
    }
}

export default function Component({ data, constraintsRef }) {
    let [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 2000)
    }, [])

    return (
        <Container 
            id='shop-notification'
            animate={show ? 'show' : 'hide'} 
            drag
            dragConstraints={constraintsRef}
            // whileHover={{
            //     scale: 1.01
            // }}
            // whileDrag={{ scale: 0.98 }}
            // whileHover={{
            //     scale: 1,
            //     transition: { duration: 0.3 },
            //   }}
            dragMomentum={false}
            whileTap={{ scale: 0.98 }}
        >
            <TitleWrapper><Title>Stockists</Title><Dot /></TitleWrapper>
            <Text className='body-large'>
                <Body content={data} />
            </Text>
        </Container>
    )
}