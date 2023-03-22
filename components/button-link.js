import styled from "styled-components"
import { motion } from "framer-motion"

import Link from './link'
import Button from './button'


const Container = styled(motion.div)``


export default function Component ({ href, children }) {
    return (
        <Link href={href}>
            <Button>{children}</Button>
        </Link>
    )
}