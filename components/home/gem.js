import { useRef, useEffect, useState } from "react"
import styled from 'styled-components'

import { gsap } from "gsap";

const Container = styled.div`
    position: absolute;
    top: ${props => props.y}%;
    left: ${props => props.x}%;
    height: ${props => props.sizeRatio * 120}px;
    cursor: pointer;
    z-index: 1;

    img {
        height: 100%;
    }
`

const Gem = ({x, y, index, sizeRatio, liftClick}) => {
    let gemRef = useRef();
    let [hasClicked, setHasClicked] = useState(false);
    let [tween, setTween] = useState(null)


    useEffect(() => {
        let randomDelay = Math.random() * 2 * 1000

        setTimeout(() => {
            setTween(gsap.to(gemRef.current, {y: 10, duration: 3, yoyo: true, repeat: -1, ease: "power3.inOut"}))
        }, randomDelay)
    }, []);

    useEffect(() => {
        if(!hasClicked) return
        let tl = gsap.timeline()
        tl.to(gemRef.current, {scale: 1.5, duration: 1}, "start")
        // tl.to(gemRef.current, { y: -50, duration: 1, ease: "sine.inOut"}, "start")
        tl.to(gemRef.current, {rotateZ: -10, duration: 0.3}, "start")
        tl.to(gemRef.current, { rotateZ: 0, duration: 2, ease: "elastic.out(1, 0)"}, "start+=0.1")
        tl.to(gemRef.current, { scale: 0, opacity: 0, y: window.innerHeight, duration: 1, ease: "expo.inOut"}, "<1")
        tween.kill()

    }, [hasClicked])

    const handleClick = () => {
        setHasClicked(true)
        // liftClick()
    }

    return (
    <Container x={x} y={y} sizeRatio={sizeRatio} ref={gemRef} onClick={handleClick}>
        <img src={`/map/gems/gem${index}.png`} />
    </Container>
    )
}

export default Gem;