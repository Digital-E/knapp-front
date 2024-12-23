import { useRef, useEffect, useState } from "react"
import styled from 'styled-components'



const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;

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
    }
`


const HoverSymbol = ({ click }) => {

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
                <svg id="hoverOneLine" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2458.33 3100.89"><defs><style>{`.hoverOneLine{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:.8px;}`}</style></defs><path class="hoverOneLine" d="M637.33,2414.67c-1.73-.25-1.73-.74,0-.99,20-3.46,31.11-14.81,35.06-30.86,5.68-22.96,3.95-92.84,5.19-104.2l.25-2.47c.25-2.47.74-2.47.99,0l.25,2.47c1.23,11.36.49,81.24,5.43,104.2,2.22,10.62,8.4,19.75,18.02,25.43,1.73.99,3.46,1.98,5.43,2.72,1.98-.74,3.7-1.73,5.43-2.72,9.14-5.68,15.06-14.81,17.28-25.19,4.94-22.96,4.2-92.84,5.43-104.2l.25-2.47c.25-2.47.74-2.47.99,0l.25,2.47c1.23,11.36-.49,81.24,5.19,104.2,3.95,16.05,15.06,27.41,35.06,30.86,1.73.25,1.73.74,0,.99-10.12,1.98-20,1.98-30.86,3.21-19.26,2.22-29.63,15.31-33.58,30.62-5.68,23.21-3.95,61.73-5.19,73.09l-.25,2.47c-.25,2.47-.74,2.47-.99,0l-.25-2.47c-1.23-11.36-.49-49.88-5.43-72.84-3.46-16.05-15.31-27.9-35.8-30.86-8.89-1.23-18.77-1.73-28.15-3.46Z"/></svg>
                <svg id="hoverOneFull" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2460.1 3098.8"><path ref={hoverOneFullRef} class="hoverOneFull" style={{opacity: 0}} d="M637.99,2413.22c-1.73-.25-1.73-.74,0-.99,20-3.46,31.11-14.81,35.06-30.86,5.68-22.96,3.95-92.84,5.19-104.2l.25-2.47c.25-2.47.74-2.47.99,0l.25,2.47c1.23,11.36.49,81.24,5.43,104.2,2.22,10.62,8.4,19.75,18.02,25.43,1.73.99,3.46,1.98,5.43,2.72,1.98-.74,3.7-1.73,5.43-2.72,9.14-5.68,15.06-14.81,17.28-25.19,4.94-22.96,4.2-92.84,5.43-104.2l.25-2.47c.25-2.47.74-2.47.99,0l.25,2.47c1.23,11.36-.49,81.24,5.19,104.2,3.95,16.05,15.06,27.41,35.06,30.86,1.73.25,1.73.74,0,.99-10.12,1.98-20,1.98-30.86,3.21-19.26,2.22-29.63,15.31-33.58,30.62-5.68,23.21-3.95,61.73-5.19,73.09l-.25,2.47c-.25,2.47-.74,2.47-.99,0l-.25-2.47c-1.23-11.36-.49-49.88-5.43-72.84-3.46-16.05-15.31-27.9-35.8-30.86-8.89-1.23-18.77-1.73-28.15-3.46Z"/></svg>
                <img id="hoverOneGlow" ref={hoverOneGlowRef} src="/map/hover-one/TEXT_GLOWopti.png" />           
        </Container>
    )
}

export default HoverSymbol;