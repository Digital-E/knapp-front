import { useEffect, useState, useContext, useRef } from 'react'
import styled from 'styled-components'
import BackgroundImage, { isCached } from './background-image'
import LoadingOverlay from './loading-overlay'

import { gsap } from 'gsap'

import Gem from './gem'

import HoverSymbol from './hover-symbol'

const Container = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;

    @media(max-width: 989px) {
        overflow: scroll;
    }
`


const MobileBlurBg = styled.div`
    display: none;

    @media(max-width: 989px) {
        display: block;
        position: fixed;
        inset: -40px;
        background: url('/map/TK_MAP_opti2.jpg') center / cover no-repeat;
        filter: blur(20px);
        z-index: -1;
        opacity: 0;
    }
`

const InnerContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200vw;
    will-change: transform;

    > img {
        position: relative;
        margin-bottom: -5px;
        width: 100%;
    }

    @media(max-width: 989px) {
        position: relative;
        opacity: 0;
        -webkit-mask-image:
            linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%),
            linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        -webkit-mask-composite: source-in;
        mask-image:
            linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%),
            linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        mask-composite: intersect;
    }
`


let containerPosRight = null;
let containerPosTop = null;

export default function Component({ hasClickedSymbol, indexData }) {
    let [loadProgress, setLoadProgress] = useState(0);
    let [hasLoaded, setHasLoaded] = useState(() => isCached());
    const wasCachedAtMount = useRef(isCached());

    const fadeInMap = () => {
        const map = document.querySelector('#map');
        const bg = document.querySelector('#map-blur-bg');
        if (!map) return;
        requestAnimationFrame(() => {
            map.style.transition = 'opacity 2s ease';
            map.style.opacity = '1';
            if (bg) {
                bg.style.transition = 'opacity 0s 2s';
                bg.style.opacity = '1';
            }
        });
    };

    useEffect(() => {
        if (window.innerWidth >= 990) return;
        if (wasCachedAtMount.current) fadeInMap();
    }, []);

    useEffect(() => {
        if (!hasLoaded || wasCachedAtMount.current || window.innerWidth >= 990) return;
        fadeInMap();
    }, [hasLoaded]);

    let isSwiping;
    let isDragging;

    useEffect(() => {
        if (!hasLoaded) return;

        // if (isMobile) return;

        // let counterArray = new Array(counterAmount).fill(0);
        // setCounter(counterArray);

        let currentCursorPos = { x: 0, y: 0 };

        let incrementAmount = { x: 0, y: 0 };

        let map = document.querySelector("#map");

        containerPosRight = window.innerWidth - map.getBoundingClientRect().width;
        containerPosTop = window.innerHeight - map.getBoundingClientRect().height;

        const isMobile = window.innerWidth <= 989;

        let translateX = isMobile ? 0 : containerPosRight / 2;
        let translateY = isMobile ? 0 : -containerPosTop / 2;

        if (isMobile) {
            const container = document.querySelector('.container');
            container.scrollLeft = -containerPosRight / 2;
            container.scrollTop = -containerPosTop / 2;
        } else {
            map.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        }

        let translateXInit = translateX;
        let translateYInit = translateY;

        let mousePosition = (e, initMousePosition) => {
            
            currentCursorPos = {
                x: e.clientX,
                y: e.clientY,
            };


            incrementAmount.x = (e.clientX - initMousePosition.x) 
            incrementAmount.y = (e.clientY - initMousePosition.y)


        

            // if (currentCursorPos.x > window.innerWidth / 2) {
            // incrementAmount.x = window.innerWidth / 2 - currentCursorPos.x;
            // } else if (currentCursorPos.x < window.innerWidth / 2) {
            // incrementAmount.x = window.innerWidth / 2 - currentCursorPos.x;
            // }

            // if (currentCursorPos.y > window.innerHeight / 2) {
            // incrementAmount.y = window.innerHeight / 2 - currentCursorPos.y;
            // } else if (currentCursorPos.y < window.innerHeight / 2) {
            // incrementAmount.y = window.innerHeight / 2 - currentCursorPos.y;
            // }
        };

        let isTrackPad = e => {
            const { deltaY } = e;
            if (deltaY && !Number.isInteger(deltaY)) {
                return false;
            }
            return true;
        }

        let trackpadAction = e => {

            let isTrackPadVar = isTrackPad(e);

            if(!isTrackPadVar) return

            isSwiping = true;

            clearTimeout(isSwipingTimeoutFunction)

            let isSwipingTimeoutFunction = setTimeout(function(){
                isSwiping = false
            }, 500);

            incrementAmount.x = e.wheelDeltaX * 12
            incrementAmount.y = e.wheelDeltaY * 12
        };

        // document
        //     .querySelector(".container")
        //     .addEventListener("mousemove", e => mousePosition(e));

        document.querySelector(".container").addEventListener("wheel", e => trackpadAction(e), { passive: true });
            
        let mouseDown = false;
        let initMousePosition = {x: 0, y: 0};

        document.addEventListener('mousedown', (e) => {
            mouseDown = true

            translateXInit = translateX;
            translateYInit = translateY;

            initMousePosition = {
                x: e.clientX,
                y: e.clientY,
            }
        });

 
        document.addEventListener('mousemove', (e) => {
            if(mouseDown) {
                isDraggingFunc(e, initMousePosition);
                isDragging = true;
            }
        }, { passive: true });
     

        document.addEventListener('mouseup', (e) => {
            mouseDown = false;
            isDragging = false;

        });

        window.addEventListener('resize', () => {
            containerPosRight = window.innerWidth - map.getBoundingClientRect().width;
            containerPosTop = window.innerHeight - map.getBoundingClientRect().height;
            isSwiping = true;
        })

        let isDraggingFunc = (e, initMousePosition) => {
            if(mouseDown === true) {
                mousePosition(e, initMousePosition)
            }
        }
 


        // document.body.addEventListener("mouseleave", () => {
        //     gsap.to(incrementAmount, { duration: 1, x: 0 });
        //     gsap.to(incrementAmount, { duration: 1, y: 0 });
        // });

        const animate = () => {

            if(isSwiping || isDragging) {
            // X Axis Easing
            let ratioX = 0;

            if (translateX < containerPosRight / 2) {
            ratioX =
                1 + (-containerPosRight / 2 + translateX) / (-containerPosRight / 2);
            } else {
            ratioX =
                1 - (-containerPosRight / 2 + translateX) / (-containerPosRight / 2);
            }

            if (ratioX === 0) {
            ratioX = 0.1;
            }

            if (
            (incrementAmount.x < 0 && translateX > containerPosRight / 2) ||
            (incrementAmount.x > 0 && translateX < containerPosRight / 2)
            ) {
            ratioX = 1;
            }

            if(isDragging) {
                translateX = translateXInit + incrementAmount.x;
            } else {
                translateX += incrementAmount.x * ratioX * 0.01;
            }

            translateX = Math.max(containerPosRight, translateX);

            translateX = Math.min(0, translateX);

            // Y Axis Easing

            let ratioY = 0;

            if (translateY < -containerPosTop / 2) {
            ratioY = 1 - (containerPosTop / 2 + translateY) / (containerPosTop / 2);
            } else {
            ratioY = 1 + (containerPosTop / 2 + translateY) / (containerPosTop / 2);
            }

            if (ratioY === 0) {
            ratioY = 1;
            }

            if (
            (incrementAmount.y < 0 && translateY > -containerPosTop / 2) ||
            (incrementAmount.y > 0 && translateY < -containerPosTop / 2)
            ) {
            ratioY = 1;
            }

            if(isDragging) {
                translateY = translateYInit + incrementAmount.y
            } else {
                translateY += incrementAmount.y * ratioY * 0.01;
            }

            translateY = Math.max(0, translateY);

            translateY = Math.min(-containerPosTop, translateY);

                if (map) {
                    map.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
                }
            }
            window.requestAnimationFrame(animate);
        };

    animate();
    }, [hasLoaded]);

    let backgroundImagePathSound = `/map/hover-sound/SOUND_ROLLOVER_.png`
    let hoverActivationSound = {
        cx: 815.6,
        cy: 1862.6,
        rx: 247.5,
        ry: 225.5
    }

    let backgroundImagePathArt = `/map/hover-art/ART_ROLLOVER_.png`
    let hoverActivationArt = {
        cx: 1726.7,
        cy: 640.4,
        rx: 247.7,
        ry: 247.7
    }

    let backgroundImagePathFashion = `/map/hover-fashion/FASHION_ROLLOVER_.png`
    let hoverActivationFashion = {
        cx: 1412.7,
        cy: 1471.4,
        rx: 332.5,
        ry: 266.3
    }

    let backgroundImagePathText = `/map/hover-text/TEXT_GLOWopti.png`
    let hoverActivationText = {
        cx: 707.6,
        cy: 2393.3,
        rx: 118.9,
        ry: 178.2
    }

    useEffect(() => {
        // let arrayInit = [
        //     false,
        //     false,
        //     false,
        //     false
        // ]

        // setInterval(() => {
        //     let newArray = [...arrayInit]

        //     newArray[Math.floor(Math.random() * 3)] = true;

        //     setForceGlowArray([...newArray]);

        // }, 1000);


    }, [])

    return (
        <Container className="container">
            <MobileBlurBg id="map-blur-bg" />
            <InnerContainer id="map">
                {/* Gems */}
                {/* <Gem x={70} y={80} index={0} sizeRatio={1.1} liftClick={() => hasClicked(0)} />
                <Gem x={80} y={85} index={0} sizeRatio={0.8} liftClick={() => hasClicked(0)} />
                <Gem x={85} y={70} index={0} sizeRatio={1} liftClick={() => hasClicked(0)} />   */}
                {/* Fashion */}
                <HoverSymbol
                    click={() => hasClickedSymbol(0)}
                    backgroundImagePath={backgroundImagePathFashion}
                    hoverActivation={hoverActivationFashion}
                    icon={indexData?.categories[0]?.icon}
                    label="Fashion"
                    />
                {/* Sound */}
                <HoverSymbol
                    click={() => hasClickedSymbol(4)}
                    backgroundImagePath={backgroundImagePathSound}
                    hoverActivation={hoverActivationSound}
                    icon={indexData?.categories[4]?.icon}
                    label="Sound"
                    />
                {/* Art */}
                <HoverSymbol
                    click={() => hasClickedSymbol(2)}
                    backgroundImagePath={backgroundImagePathArt}
                    hoverActivation={hoverActivationArt}
                    icon={indexData?.categories[2]?.icon}
                    label="Art"
                    />
                {/* Text */}
                <HoverSymbol
                    click={() => hasClickedSymbol(3)}
                    backgroundImagePath={backgroundImagePathText}
                    hoverActivation={hoverActivationText}
                    icon={indexData?.categories[3]?.icon}
                    label="Text"
                    />                 
                <BackgroundImage
                hasLoaded={() => setHasLoaded(true)}
                loadProgress={val => setLoadProgress(val)}
                />
            </InnerContainer>
            {!isCached() && <LoadingOverlay progress={loadProgress} />}  
        </Container>
    )
}