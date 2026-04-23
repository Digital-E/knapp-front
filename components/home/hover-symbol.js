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
        // pointer-events: all;
    }

    .hoverOneActivate {
        display: none;
        pointer-events: none;
    }

    ellipse {
        pointer-events: all;
        opacity: 0;
        cursor: pointer;
    }
`


const HoverSymbol = ({ click, backgroundImagePath, hoverLineViewbox, hoverLineD, hoverActivation, forceGlow }) => {

    let hoverOneFullRef = useRef();
    let hoverOneGlowRef = useRef();
    let hoverOneActivateRef = useRef();

    let glowOn = false;

    // useEffect(() => {
    //     console.log(forceGlow)
    //     if(forceGlow) {
    //         funcGlowOn();
    //     }
    // }, [forceGlow])
    
    let glowOffTimeout = useRef(null);

    let funcGlowOn = () => {
        if (!hoverOneFullRef.current || !hoverOneGlowRef.current) return
        hoverOneFullRef.current.style.opacity = 1
        hoverOneGlowRef.current.style.opacity = 1

        glowOffTimeout.current = setTimeout(() => {
            funcGlowOff();
        }, 1000);
    }

    let funcGlowOff = () => {
        if (!hoverOneFullRef.current || !hoverOneGlowRef.current) return
        hoverOneFullRef.current.style.opacity = 0
        hoverOneGlowRef.current.style.opacity = 0
    }

    useEffect(() => {

        const glowOnTimeout = setTimeout(() => {
            funcGlowOn();
        }, 1500);

        hoverOneActivateRef.current.addEventListener("mouseenter", () => {
            hoverOneFullRef.current.style.opacity = 1
            hoverOneGlowRef.current.style.opacity = 1
        })

        hoverOneActivateRef.current.addEventListener("mouseleave", () => {
            hoverOneFullRef.current.style.opacity = 0
            hoverOneGlowRef.current.style.opacity = 0
        })

        hoverOneActivateRef.current.addEventListener("mousedown", () => {
            click();
        })

        return () => {
            clearTimeout(glowOnTimeout);
            clearTimeout(glowOffTimeout.current);
        }
    }, [])


    return (
        <Container>
                {/* <svg id="hoverOneLine" viewBox={hoverLineViewbox}><defs><style>{`.hoverOneLine{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:.8px;}`}</style></defs><path class="hoverOneLine" d={hoverLineD} /></svg> */}
                <svg id="hoverOneFull" viewBox={hoverLineViewbox}><path ref={hoverOneFullRef} class="hoverOneFull" style={{opacity: 0}} d={hoverLineD} /></svg>
                <img id="hoverOneGlow" ref={hoverOneGlowRef} src={backgroundImagePath} />  
                <svg id="hoverOneActivate" viewBox="0 0 2458.3 3100.9">
                <defs>
                    {/* <style>
                    .st0 {
                        fill: #fff;
                        stroke: #000;
                        stroke-miterlimit: 10;
                    }
                    </style> */}
                    
                </defs>
                <ellipse ref={hoverOneActivateRef} class="st0" cx={hoverActivation.cx} cy={hoverActivation.cy} rx={hoverActivation.rx} ry={hoverActivation.ry} />
                </svg>         
        </Container>
    )
}

export default HoverSymbol;