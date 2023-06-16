import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

import DotTyping from './dot-typing'

const Container = styled.div`
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    z-index: 999;
    overflow: hidden;
`

const TextWrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`

const Text = styled.p`
    position: relative;
    width: 100%;
    user-select: none;

    .letter {
        opacity: 0;
    }

    .reveal-letter {
        opacity: 1 !important;
        transition: opacity 0s;
    }

    &.hide {
        opacity: 0;
        // transform: scale(1.1);
        transition: opacity 0s, transform 0s;
    }

    // @media(max-width: 576px) {
    //     width: 90%;
    // }
`


const Cursor = styled.div`
    position: absolute;
    display: inline-block;
    height: 1.2em;
    width: 2px;
    margin-top: 0em;
    margin-left: 0.1em;
    background: var(--color);
    animation: none;
    opacity: 1;
    transition: opacity 1s;
    animation: blink 0.5s infinite;
    display: none;

    &.hide {
        opacity: 0;
        transition: opacity 0s;
    }

    &.typing {
        animation: none;
    }

    @keyframes blink {
        0%  { background-color: var(--color); }
        49% { background-color: var(--color); }
        50% { background-color: transparent; }
        99% { background-color: transparent; }
        100%  { background-color: var(--color); }
    }

    @media(max-width: 989px) {
        height: 0.9em;
        margin-top: 0.2em;
    }
`

const CursorWrapper = styled.div`
    position: absolute;
    transition: opacity 0.3s;

    &.typing {
        opacity: 0;
        transition: opacity 0s;
    }

    &.hide {
        opacity: 0;
        transition: opacity 0s;
    }
`


const Replay = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    right: 13px;
    z-index: 999;
    font-family: helvetica;
    color: white;
    font-size: 12px;
    height: 23px;
    width: 23px;
    border-radius: 999px;
    background: var(--background);
    backdrop-filter: blur(10px);
    user-select: none;

    * {
        cursor: pointer;
    }

    transition: color 0.3s, background 0.3s, transform 0.1s;

    &.bump {
        transform: scale(1.03);
    }

    @media(min-width: 990px) {
        // :hover {
        //     cursor: pointer;
        //     background: var(--color);
        //     color: black;
        //     transition: color 0.3s, background 0.3s, transform 0.1s;
        // }
    
        // :hover path {
        //     fill: black;
        //     transition: fill 0.3s;
        // }
    }

    svg {
        height: 12px;
        // margin-left: 5px;
    }

    path {
        fill: black;
        transition: fill 0.3s;
    }
`

export default function Component({ data, start, toggleFinishedFunc }) {

    let [triggerInit, setTriggerInit] = useState(false);
    let containerRef = useRef();
    let typeWriterRef = useRef();
    let replayButtonRef = useRef();
    let cursorRef = useRef();

    let interval = useRef(null);
    let newSentenceTimeout = useRef(null);
    let replayTimeout = useRef(null);

    let displayText = useRef();
    let sentenceIndex = useRef(0);
    let letterIndex = useRef(0);
    
    let [renderPortal, setRenderPortal] = useState(false)

    let cursorActive = true;

    let hasTriggeredAutoReset = false;

    let initSentence = () => {

        if(letterIndex.current === 0) {
            let splitText = data[sentenceIndex.current].split('')

            let splitTextWithSpan = splitText.map(item => {
                if(item === '\n') return `<span class='letter'><br/></span>`

                return `<span class='letter'>${item}</span>`
            })

            displayText.current = splitTextWithSpan.join('')

            typeWriterRef.current.innerHTML = displayText.current
        }
    }

    let typeText = () => {

        let sentence = data[sentenceIndex.current]
        let sentenceLength = sentence.length

        if(sentenceIndex.current === data.length - 1 && letterIndex.current > sentenceLength && hasTriggeredAutoReset === false) {
            // setTimeout(() => {
            //     replay(true);
            //     hasTriggeredAutoReset = false;
            // }, 1500)

            // hasTriggeredAutoReset = true;
        }

        initSentence();


        if(letterIndex.current <= sentenceLength) {

            if(typeWriterRef.current?.children[letterIndex.current] !== undefined) {
                
                if(cursorActive) {
                    cursorRef.current.style.left = `${typeWriterRef.current.children[letterIndex.current].getBoundingClientRect().x + typeWriterRef.current.children[letterIndex.current].getBoundingClientRect().width - typeWriterRef.current.children[0].getBoundingClientRect().x}px`
                    cursorRef.current.style.top = `${typeWriterRef.current.children[letterIndex.current].getBoundingClientRect().y - typeWriterRef.current.children[0].getBoundingClientRect().y}px`

                    if(
                        window.innerWidth < 990 && (typeWriterRef.current.children[letterIndex.current].getBoundingClientRect().x + typeWriterRef.current.children[letterIndex.current].getBoundingClientRect().width - typeWriterRef.current.children[0].getBoundingClientRect().x > 180)
                        ) {
                        cursorRef.current.style.left = `0px`
                        cursorRef.current.style.top = `${typeWriterRef.current.children[letterIndex.current].getBoundingClientRect().y - typeWriterRef.current.children[0].getBoundingClientRect().y + typeWriterRef.current.children[letterIndex.current].getBoundingClientRect().height}px`   
                    }
                }

                typeWriterRef.current.children[letterIndex.current].classList.add("reveal-letter")

                cursorRef.current?.classList.add("typing")

            }
            
            letterIndex.current +=1;
        } else {
            cursorRef.current?.classList.remove("typing")

            if(sentenceIndex.current === data.length - 1 ) {
                cursorRef.current?.classList.add("typing")
                clearInterval(interval.current)
                return
                // return toggleFinishedFunc()
            }

            newSentenceTimeout.current = setTimeout(() => {
                if(cursorRef.current === null || typeWriterRef.current === null ) return
                cursorRef.current.classList.add('hide');

                typeWriterRef.current.classList.add('hide');

                typeWriterRef.current.innerHTML = ''
                displayText.current = ''
                letterIndex.current = 0;
                sentenceIndex.current += 1;
                
                typeWriterRef.current.classList.remove('hide');
                cursorRef.current.classList.remove('hide');

                newSentenceTimeout.current = null;

            }, 4000)
        }
    }

    let bump = () => {
        replayButtonRef.current.classList.add("bump")

        setTimeout(() => {
            replayButtonRef.current.classList.remove("bump")
        }, 100)
    }

    let replay = (auto) => {

        if(!auto) bump();

        cursorRef.current.classList.add('hide');

        if(replayTimeout.current !== null) return;

        clearInterval(replayTimeout.current)

        replayTimeout.current = null

        typeWriterRef.current.classList.add('hide');

        clearInterval(interval.current);

        interval.current = null;

        clearTimeout(newSentenceTimeout.current);
        
        newSentenceTimeout.current = null;

        displayText.current = '';
        typeWriterRef.current.innerHTML = '';
        sentenceIndex.current = 0;
        letterIndex.current = 0;
        
        replayTimeout.current = setTimeout(() => {

            typeWriterRef.current.classList.remove('hide');

            cursorRef.current.classList.remove('hide');

            init();

            replayTimeout.current = null;
        }, 300);
    }

    let init = () => {
        initSentence();

        containerRef.current.style.height = `${containerRef.current.getBoundingClientRect().height}px`

        interval.current = setInterval(() => {
            if(newSentenceTimeout.current !== null) return
            typeText();
        }, 20);
    }

    useEffect(() => {
        if(triggerInit) {
            init();
        }
    }, [triggerInit]) 

    useEffect(() => {
        if(start) {
            setTriggerInit(true)
            cursorRef.current.classList.remove('hide')
        }
    }, [start])

    useEffect(() => {

        // setTimeout(() => {
        //     setTriggerInit(true)
        //     cursorRef.current.classList.remove('hide');
        // }, 1500)

        window.addEventListener('resize', () => {
            if(typeWriterRef.current === null) return
            if(typeWriterRef.current.children[letterIndex.current - 2] === undefined) return;

            cursorRef.current.style.left = `${typeWriterRef.current.children[letterIndex.current - 2].getBoundingClientRect().x + typeWriterRef.current.children[letterIndex.current - 2].getBoundingClientRect().width}px`
            cursorRef.current.style.top = `${typeWriterRef.current.children[letterIndex.current - 2].getBoundingClientRect().y - typeWriterRef.current.children[letterIndex.current - 2].getBoundingClientRect().height / 2}px`
        })

        setRenderPortal(true)

        return () => {
            clearInterval(interval.current)
        }
    }, [])


    return (
      <>
      <Container>
        <TextWrapper ref={containerRef}>
            <Text ref={typeWriterRef} className="body-large"/>
        </TextWrapper>
        <CursorWrapper ref={cursorRef} className="hide">
            <DotTyping />
        </CursorWrapper>
        {/* <Cursor ref={cursorRef} className="hide" /> */}
      </Container>
      </>
    )
  }