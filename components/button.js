import styled from "styled-components"
import { motion } from "framer-motion"


const Container = styled(motion.div)`
    border: 1px solid black;
    border-radius: 999px;
    background: white;
    transition: background 0.2s;
    line-height: 0.8;
    width: fit-content;
    cursor: pointer;

    > a:hover {
        background: var(--light-gray) !important;
    }

    > a {
        position: relative;
        display: block;
        border-radius: 999px;
        color: black;
        font-family: Picnic Regular;
        font-size: 2rem;
        text-decoration: none;
        line-height: 0.8;
        padding: 0.5rem 0.5rem;
        margin: 0;
    }

    .active-link {
        background: var(--gray);
    }

    > a > span {
        position: relative;
        font-family: Picnic Regular;
        top: -2px;
    }
`


export default function Component ({ children }) {
    return (
        <Container 
        // whileHover={{scale: 1.05}}
        >
            {children}
        </Container>
    )
}