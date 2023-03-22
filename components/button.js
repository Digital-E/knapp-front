import styled from "styled-components"
import { motion } from "framer-motion"


const Container = styled(motion.div)`
    padding: 9px 12px;
    border-radius: 999px;
    background: #161616;
    text-transform: uppercase;
    font-family: ProFontWindows;
    font-size: 0.875rem;

    span {
        position: relative;
        top: 0.5px;
    }
`


export default function Component ({ children }) {
    return (
        <Container 
        // whileHover={{scale: 1.05}}
        >
            <span>{children}</span>
        </Container>
    )
}