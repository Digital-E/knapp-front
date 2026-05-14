import { useRef, useEffect, useState } from "react"
import { createPortal } from "react-dom"
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
    }

    .hoverOneActivate {
        display: none;
        pointer-events: none;
    }

    ellipse {
        pointer-events: all;
        opacity: 0;
        cursor: pointer;

        @media(min-width: 990px) {
            cursor: none;
        }
    }
`

const Cursor = styled.div`
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 2px;
    // padding: 8px 14px 8px 10px;
    padding: 0px 17px;
    border-radius: 999px;
    background: #161616;
    white-space: nowrap;
    top: 0;
    left: 0;
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.1);
    filter: blur(100px);

    &.visible {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
        filter: blur(0px);
        transition: opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    filter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    &.hidden {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.1);
        filter: blur(100px);
        transition: opacity 0.4s ease-in,
                    transform 0.4s ease-in,
                    filter 0.4s ease-in;
    }

    svg {
        height: 25px;
        width: auto;
    }

    path {
        fill: var(--primary) !important;
    }

    span {
        font-family: ProFontWindows;
        font-size: 1.125rem;
        text-transform: uppercase;
        color: var(--primary);
        position: relative;
        // top: 0.5px;
    }

    span:nth-child(1) {
        position: relative;
        top: 1px;
    }

    @media(max-width: 989px) {
        display: none;
    }
`


const HoverSymbol = ({ click, backgroundImagePath, hoverActivation, icon, label }) => {

    let hoverOneFullRef = useRef();
    let hoverOneGlowRef = useRef();
    let hoverOneActivateRef = useRef();
    let cursorRef = useRef();
    let [mounted, setMounted] = useState(false);

    let glowOffTimeout = useRef(null);

    let funcGlowOn = () => {
        if (!hoverOneGlowRef.current) return
        hoverOneGlowRef.current.style.opacity = 1
        glowOffTimeout.current = setTimeout(() => { funcGlowOff(); }, 1000);
    }

    let funcGlowOff = () => {
        if (!hoverOneGlowRef.current) return
        hoverOneGlowRef.current.style.opacity = 0
    }

    useEffect(() => {

        setMounted(true);

        const glowOnTimeout = setTimeout(() => { funcGlowOn(); }, 1500);

        const el = hoverOneActivateRef.current;
        let lastMousePos = { x: -9999, y: -9999 };
        let isHovering = false;

        const onEnterState = (x, y) => {
            if (window.innerWidth < 990) return;
            isHovering = true;
            document.body.style.cursor = 'none';
            hoverOneGlowRef.current.style.opacity = 1;
            document.querySelectorAll('.hover-symbol-cursor').forEach(c => {
                if (c !== cursorRef.current) {
                    c.classList.remove('visible');
                    c.style.opacity = '0';
                    c.style.transition = 'none';
                }
            });
            if (cursorRef.current) {
                cursorRef.current.style.left = x + 'px';
                cursorRef.current.style.top = y + 'px';
                cursorRef.current.style.opacity = '';
                cursorRef.current.style.transition = '';
                cursorRef.current.classList.remove('hidden');
                cursorRef.current.classList.add('visible');
            }
        };

        const onLeaveState = () => {
            isHovering = false;
            hoverOneGlowRef.current.style.opacity = 0;
            if (cursorRef.current) {
                cursorRef.current.classList.remove('visible');
                cursorRef.current.classList.add('hidden');
            }
            setTimeout(() => {
                const anyVisible = Array.from(document.querySelectorAll('.hover-symbol-cursor'))
                    .some(c => c.classList.contains('visible'));
                if (!anyVisible) document.body.style.cursor = '';
            }, 0);
        };

        const checkHover = (x, y) => {
            if (x === -9999) return;
            const popupOpen = document.body.classList.contains('popup-open');
            if (isHovering && popupOpen) { onLeaveState(); return; }
            const hit = document.elementFromPoint(x, y);
            const isOver = hit === el || el.contains(hit);
            if (isOver && !isHovering && !popupOpen) onEnterState(x, y);
            else if (!isOver && isHovering) onLeaveState();
        };

        const onDocumentMouseMove = (e) => {
            lastMousePos = { x: e.clientX, y: e.clientY };
            if (cursorRef.current) {
                cursorRef.current.style.left = e.clientX + 'px';
                cursorRef.current.style.top = e.clientY + 'px';
            }
            checkHover(e.clientX, e.clientY);
        };

        const onWheel = () => {
            requestAnimationFrame(() => checkHover(lastMousePos.x, lastMousePos.y));
        };

        const onMouseDown = () => { click(); onLeaveState(); };

        const onPopupClose = new MutationObserver(() => {
            if (!document.body.classList.contains('popup-open')) {
                requestAnimationFrame(() => checkHover(lastMousePos.x, lastMousePos.y));
            }
        });
        onPopupClose.observe(document.body, { attributeFilter: ['class'] });

        el.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onDocumentMouseMove);
        document.addEventListener('wheel', onWheel, { passive: true });

        return () => {
            clearTimeout(glowOnTimeout);
            clearTimeout(glowOffTimeout.current);
            onPopupClose.disconnect();
            el.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onDocumentMouseMove);
            document.removeEventListener('wheel', onWheel);
        }
    }, [])


    return (
        <Container>
                <img id="hoverOneGlow" ref={hoverOneGlowRef} src={backgroundImagePath} />
                <svg id="hoverOneActivate" viewBox="0 0 2458.3 3100.9">
                <ellipse ref={hoverOneActivateRef} class="st0" cx={hoverActivation.cx} cy={hoverActivation.cy} rx={hoverActivation.rx} ry={hoverActivation.ry} />
                </svg>
                {mounted && createPortal(
                    <Cursor ref={cursorRef} className="hover-symbol-cursor">
                        <span dangerouslySetInnerHTML={{__html: icon}} />
                        <span>{label}</span>
                    </Cursor>,
                    document.body
                )}
        </Container>
    )
}

export default HoverSymbol;