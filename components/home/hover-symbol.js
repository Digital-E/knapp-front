import { useRef, useEffect, useState } from "react"
import styled from 'styled-components'



const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    pointer-events: none;

    img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    svg {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    #hoverOneGlow {
        opacity: 0;
        transition-duration: 1.5s;
    }

    #hoverOneLine {
        display: none;
    }

    #hoverOneFull {
        z-index: 1;
    }

    .hoverOneFull {
        transition-duration: 0.5s;
        fill: transparent;
        stroke: var(--primary);
        cursor: pointer;
        pointer-events: all;
    }
`


const HoverSymbol = ({ click, backgroundImagePath, hoverLineViewbox, hoverLineD }) => {

    let hoverOneFullRef = useRef();
    let hoverOneGlowRef = useRef();
    

    useEffect(() => {
        hoverOneFullRef.current.addEventListener("mouseenter", () => {
            hoverOneFullRef.current.style.opacity = 1
            hoverOneGlowRef.current.style.opacity = 1
        })

        hoverOneFullRef.current.addEventListener("mouseleave", () => {
            hoverOneFullRef.current.style.opacity = 0
            hoverOneGlowRef.current.style.opacity = 0
        })

        hoverOneFullRef.current.addEventListener("mousedown", () => {
            click();
        })
    }, [])


    return (
        <Container>
                {/* <svg id="hoverOneLine" viewBox={hoverLineViewbox}><defs><style>{`.hoverOneLine{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:.8px;}`}</style></defs><path class="hoverOneLine" d={hoverLineD} /></svg> */}
                <svg id="hoverOneFull" viewBox={hoverLineViewbox}><path ref={hoverOneFullRef} class="hoverOneFull" style={{opacity: 0}} d={hoverLineD} /></svg>
                <img id="hoverOneGlow" ref={hoverOneGlowRef} src={backgroundImagePath} />           
        </Container>
    )
}

export default HoverSymbol;