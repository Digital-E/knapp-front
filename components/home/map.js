import { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import BackgroundImage from './background-image'
import LoadingOverlay from './loading-overlay'

import { gsap } from 'gsap'

import Gem from './gem'

import HoverSymbol from './hover-symbol'

const Container = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
`


const InnerContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200vw;

    > img {
        position: relative;
        margin-bottom: -5px;
        width: 100%;
    }
`


let containerPosRight = null;
let containerPosTop = null;

export default function Component({ hasClickedSymbol }) {
    let [loadProgress, setLoadProgress] = useState(0);
    let [hasLoaded, setHasLoaded] = useState(false);

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

        let translateX = 0;
        let translateY = 0;

        let translateXInit = 0;
        let translateYInit = 0;

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

        document.querySelector(".container").addEventListener("mousewheel", e => trackpadAction(e));  
            
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
            if(mouseDown) {
                isDraggingFunc(e, initMousePosition);
                isDragging = true;
            }
        });
     

        document.addEventListener('mouseup', (e) => {
            mouseDown = false;
            isDragging = false;

            // clearTimeout(isDraggingTimeoutFunction)
            // let isDraggingTimeoutFunction = setTimeout(function(){
            //     isDragging = false
            // }, 500);

            // incrementAmount.x = 0;
            // incrementAmount.y = 0;

        });

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

                if (document.querySelector("#map")) {
                document.querySelector(
                    "#map"
                ).style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
                }
            }
            window.requestAnimationFrame(animate);
        };

    animate();
    }, [hasLoaded]); 

    let backgroundImagePathSound = `/map/hover-sound/SOUND_ROLLOVER_.png`
    let hoverLineViewboxSound = `0 0 2458.33 3100.89`
    let hoverLineDSound = `M913.48,1866.36c1.29-1.29,1.94-.97.97.97-15.2,21.35-15.52,42.37-3.88,61.13,6.14,9.7,14.88,20.05,23.61,32.34l1.62,2.26c1.94,2.91,1.62,3.23-.97,1.62l-2.91-1.94c-11.64-9.7-22.64-17.14-32.66-23.29-18.76-11.64-39.46-11-60.8,4.2-1.94,1.29-2.26.97-.97-.97,10.03-14.88,21.67-28.78,34.61-41.4,12.61-12.94,26.2-24.58,41.4-34.93ZM794.79,1942.04c.97,1.62.65,2.26-.97.97-21.67-14.88-42.69-15.2-61.45-3.88-9.7,6.47-21.02,13.91-32.34,23.61l-2.26,1.94c-2.59,2.26-3.88,1.29-1.62-1.29l2.26-2.59c9.7-11.32,16.82-22.64,22.96-32.66,11.64-18.76,11-39.46-4.2-60.8-1.29-1.94-.97-2.26.97-.97,14.88,10.03,28.78,21.67,41.72,34.28,12.61,12.94,24.26,26.52,34.93,41.4ZM716.53,1816.88c2.26.32,2.26.97,0,1.29M761.48,1817.85c-1.94-.32-1.94-.97,0-1.29,26.2-4.53,41.07-19.08,46.25-40.43,2.91-11.32,5.17-24.58,6.79-39.46l.32-3.23c.32-3.23,1.62-3.23,1.94,0l.32,3.23c1.62,14.88,3.88,28.14,6.47,39.46,4.85,21.35,19.73,35.9,45.92,40.43,2.26.32,2.26.97,0,1.29-17.79,3.23-35.9,4.85-53.69,4.85s-36.22-1.62-54.33-4.85ZM818.4,1919.4c-.97.97-1.29.97-2.26,0-10.67-11.64-32.02-28.78-61.77-83.76-2.26-4.2-.65-3.56,1.29-.97,23.93,32.02,41.07,44.31,61.45,44.31s37.52-12.29,61.45-44.31c1.94-2.59,3.56-3.23,1.29.97-29.75,54.98-50.13,72.44-61.45,83.76Z`

    let backgroundImagePathArt = `/map/hover-art/ART_ROLLOVER_.png`
    let hoverLineViewboxArt = `0 0 2458.3 3100.9`
    let hoverLineDArt = `M1912,699.9c-50.8-29.6-95.6-53.2-149.7-69.3,38.9-40.1,66.3-82.1,96-132.2,3.9-6.6,5.5-11.3-1.8-1.6-42.1,57-72.2,95.4-94.9,104.4-1.6.6-3.2,1.3-4.9,1.8,18.1-43.9,41.6-105.5,54.6-157,1.7-7.1,2.2-11.8-2.2-.5-21.8,52.8-31.2,93.9-55.3,126.8-5.1,6.7-10.2,12.4-15.6,16.9-6.7-19-6.4-52.8-5.1-79,.3-7.1,0-12-1.8-.2-4.9,29.6-8,58.9-7.5,88.5-5.2,2.3-10.6,3.7-16.3,4.2-14-26.1-30.9-50.2-49.6-73.6-7.3-9.3-5.2-5-1.5,1.1,13.9,22.3,30.5,51.6,33.9,71.4-6.7-1.4-13.8-3.7-21.5-7.1-37.1-17.1-65.3-48.4-110-83.9-9.4-7.8-6.6-3.9-1.7,1.5,38.6,41,76.3,78.1,120.1,111.3-.4,0-.8,0-1.1.1-24.5,3.2-69.5-15.7-134-45-11.1-4.9-7.4-1.6-.4,2.6,50.5,29.4,95.2,52.9,149.3,69-38.8,40.1-66.3,82.1-95.7,132.1-4.2,6.7-5.8,11.4,1.5,1.7,42.1-57,72.2-95.4,95.2-104.5.2,0,.5-.2.7-.3-22,50.3-36.9,101.1-50.6,156-1.8,6.8-2.3,11.5,2.2.5,21.7-53.1,31.1-94.2,55.3-126.8,5.2-7,10.4-12.8,15.8-17.3,6.4,19,6.1,52.8,5.2,79-.6,7.2-.4,12.1,1.8.2,4.7-29.5,7.7-58.7,7.2-88.3,5.3-2.4,10.7-3.7,16.3-4.2,14,26.1,30.9,50.1,49.6,73.6,7.3,9.3,5.2,5,1.5-1.1-13.8-22.2-30.4-51.4-33.9-71.2,6.8,1.4,13.9,3.9,21.5,7.3,37,16.7,65.2,48.1,110,83.9,9.3,7.4,6.6,3.6,1.7-1.5-38.7-41.3-76.5-78.4-120.2-111.7.5,0,1-.1,1.5-.2,24.1-3.1,69.1,15.8,133.7,45.1,11.1,4.9,7.4,1.6.8-2.3Z`

    let backgroundImagePathFashion = `/map/hover-fashion/FASHION_ROLLOVER_.png`
    let hoverLineViewboxFashion = `0 0 2458.3 3100.9`
    let hoverLineDFashion = `M1243.5,1575.6c-2-2-1.5-2.7,1.1-1.5,34.8,16,62,9.2,87.9-10.3,13.4-10.5,26.6-24.7,40.6-41.1l3-3.6c3-3.6,3.8-3.1,1.5,1.1l-2.3,4.1c-10.2,19-19.1,36.1-24.1,52.4-9.3,30.9-5.8,58.7,21.6,85.4,2.4,2.2,1.9,3-1.1,1.5-23.8-10.7-46.6-23.5-67.7-38-21.5-14.8-41.7-31.4-60.6-50ZM1394.9,1420.8c-9.6-8.3-19.2-16.5-28.2-25.6-2-2-1.5-2.7,1.1-1.5,34.8,16,65.4,10.9,87.9-10.3,32.2-30.5,105.6-140,119.7-156.3l3-3.6c3-3.6,3.8-3.1,1.5,1.1l-2.3,4.1c-10.2,19-87.5,125.9-103.1,167.7-11,29.2-5.8,58.7,21.6,85.4,2.4,2.2,1.9,3-1.1,1.5-11.3-4.9-22.5-10.9-33.3-16.6,8.6,85.5,3.9,166.5-5,253.6-.9,9.6-2.4,15.9-3.1-.4-3.2-78.5,3.9-135.8-12.1-189.1-15.1-50.5-43-72.4-99.1-68-55.5,4.3-106.4,31.6-180.8,56.8-15.4,5.2-10.1,1.5-1.5-2.7,78.1-39.7,151.9-73.2,234.8-96Z`

    
    let backgroundImagePathText = `/map/hover-text/TEXT_GLOWopti.png`
    let hoverLineViewboxText = `0 0 2458.33 3100.89`
    let hoverLineDText = `M637.33,2414.67c-1.73-.25-1.73-.74,0-.99,20-3.46,31.11-14.81,35.06-30.86,5.68-22.96,3.95-92.84,5.19-104.2l.25-2.47c.25-2.47.74-2.47.99,0l.25,2.47c1.23,11.36.49,81.24,5.43,104.2,2.22,10.62,8.4,19.75,18.02,25.43,1.73.99,3.46,1.98,5.43,2.72,1.98-.74,3.7-1.73,5.43-2.72,9.14-5.68,15.06-14.81,17.28-25.19,4.94-22.96,4.2-92.84,5.43-104.2l.25-2.47c.25-2.47.74-2.47.99,0l.25,2.47c1.23,11.36-.49,81.24,5.19,104.2,3.95,16.05,15.06,27.41,35.06,30.86,1.73.25,1.73.74,0,.99-10.12,1.98-20,1.98-30.86,3.21-19.26,2.22-29.63,15.31-33.58,30.62-5.68,23.21-3.95,61.73-5.19,73.09l-.25,2.47c-.25,2.47-.74,2.47-.99,0l-.25-2.47c-1.23-11.36-.49-49.88-5.43-72.84-3.46-16.05-15.31-27.9-35.8-30.86-8.89-1.23-18.77-1.73-28.15-3.46Z`

    return (
        <Container className="container">
            <InnerContainer id="map">
                {/* Gems */}
                {/* <Gem x={70} y={80} index={0} sizeRatio={1.1} liftClick={() => hasClicked(0)} />
                <Gem x={80} y={85} index={0} sizeRatio={0.8} liftClick={() => hasClicked(0)} />
                <Gem x={85} y={70} index={0} sizeRatio={1} liftClick={() => hasClicked(0)} />   */}
                {/* Fashion */}
                <HoverSymbol 
                    click={() => hasClickedSymbol(0)}
                    backgroundImagePath = {backgroundImagePathFashion}
                    hoverLineViewbox = {hoverLineViewboxFashion}
                    hoverLineD = {hoverLineDFashion}
                    /> 
                {/* Sound */}
                <HoverSymbol 
                    click={() => hasClickedSymbol(3)}
                    backgroundImagePath = {backgroundImagePathSound}
                    hoverLineViewbox = {hoverLineViewboxSound}
                    hoverLineD = {hoverLineDSound}
                    /> 
                {/* Art */}
                <HoverSymbol 
                    click={() => hasClickedSymbol(1)}
                    backgroundImagePath = {backgroundImagePathArt}
                    hoverLineViewbox = {hoverLineViewboxArt}
                    hoverLineD = {hoverLineDArt}
                    />                                                                   
                {/* Text */}
                <HoverSymbol 
                    click={() => hasClickedSymbol(2)}
                    backgroundImagePath = {backgroundImagePathText}
                    hoverLineViewbox = {hoverLineViewboxText}
                    hoverLineD = {hoverLineDText}
                    />                 
                <BackgroundImage
                hasLoaded={() => setHasLoaded(true)}
                loadProgress={val => setLoadProgress(val)}
                />
            </InnerContainer>
            <LoadingOverlay progress={loadProgress} />  
        </Container>
    )
}