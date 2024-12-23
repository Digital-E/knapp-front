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

    return (
        <Container className="container">
            <InnerContainer id="map">
                {/* Gems */}
                {/* <Gem x={70} y={80} index={0} sizeRatio={1.1} liftClick={() => hasClicked(0)} />
                <Gem x={80} y={85} index={0} sizeRatio={0.8} liftClick={() => hasClicked(0)} />
                <Gem x={85} y={70} index={0} sizeRatio={1} liftClick={() => hasClicked(0)} />   */}
                <HoverSymbol click={() => hasClickedSymbol(0)} />
                <BackgroundImage
                hasLoaded={() => setHasLoaded(true)}
                loadProgress={val => setLoadProgress(val)}
                />
            </InnerContainer>
            <LoadingOverlay progress={loadProgress} />  
        </Container>
    )
}