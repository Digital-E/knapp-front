import styled from "styled-components"
import { motion } from "framer-motion"


const Container = styled(motion.div)`
    width: fit-content;
    padding: 9px 12px;
    border-radius: 999px;
    background: #161616;
    text-transform: uppercase;
    font-family: ProFontWindows;
    font-size: 0.875rem;
    user-select: none;

    @media(min-width: 990px) {
        transition: opacity 0.2s ease;
        &:hover {
            opacity: 0.5;
        }
    }

    span {
        position: relative;
        top: 0.5px;
    }
`


export default function Component ({ children }) {
    return (
        <Container>
            <span>{children}</span>
        </Container>
    )
}
