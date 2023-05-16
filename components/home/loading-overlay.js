import { useRef, useEffect, useState } from "react"
import styled from 'styled-components'

const Wrapper = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    &.hide {
        opacity: 0;
        transition: 0.3s;
    }
`


const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 150px;
    height: 2px;
    // border-radius: 999px;
    // background: linear-gradient(180deg,rgb(58 27 6) 0%,rgb(155 86 41) 50%,rgb(120 66 30) 70%,rgba(116,55,14,1) 100%);
`


const ContainerBackground = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 150px;
    height: 2px;
    // box-shadow: 0px 5px 20px black;
    background: var(--secondary);
`

const Progress = styled.div`
    position: absolute;
    width: ${props => props.progress}%;
    height: 100%;
    background: var(--primary);
    border-radius: 999px;
    transition: 1s;
`

const Number = styled.div`
    position: absolute;
    top: -200%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
    font-size: 20px;
    font-family: Sinistre Saint Caroline;
`

const Overlay = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 999;
    left: 0;
    top: 0;
    background-color: black;
`




const LoadingProgress = ({progress}) => {
    let wrapperRef = useRef();

    useEffect(() => {
        if(progress === 100) {
            setTimeout(() => {
                wrapperRef.current.classList.add("hide");
            }, 1000);

            setTimeout(() => {
                wrapperRef.current.style.display = "none";
            }, 1300);
        }
    }, [progress]);


    return (
    <Wrapper ref={wrapperRef}>
        <Overlay />
        <ContainerBackground />
        <Container>
            <Progress progress={progress} />
            {/* <Number>{progress}%</Number> */}
        </Container>
    </Wrapper>
    )
}

export default LoadingProgress;