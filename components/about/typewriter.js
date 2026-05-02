import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

import DotTyping from './dot-typing'

const Container = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    z-index: 999;
    padding-top: 1.5px;
`

const CursorWrapper = styled.div`
    position: absolute;
    transition: opacity 0.3s;

    &.hide {
        opacity: 0;
        transition: opacity 0s;
    }
`

export default function Component({ data, start }) {
    let [triggerInit, setTriggerInit] = useState(false);
    let containerRef = useRef();
    let textWrapperRef = useRef();
    let cursorRef = useRef();
    let interval = useRef(null);
    let sentenceIndex = useRef(0);
    let letterIndex = useRef(0);

    let initAllSentences = () => {
        if (!data || data.length === 0) return
        textWrapperRef.current.innerHTML = ''
        data.forEach((sentence) => {
            const el = document.createElement('div')
            el.style.cssText = 'margin: 8px 0; line-height: 1; user-select: none; position: relative; width: 100%;'
            sentence.split('').forEach(char => {
                const span = document.createElement('span')
                span.style.opacity = '0'
                if (char === '\n') {
                    span.appendChild(document.createElement('br'))
                } else {
                    span.textContent = char
                }
                el.appendChild(span)
            })
            textWrapperRef.current.appendChild(el)
        })
    }

    let typeText = () => {
        const currentEl = textWrapperRef.current?.children[sentenceIndex.current]
        if (!currentEl) return

        if (letterIndex.current < currentEl.children.length) {
            const letterEl = currentEl.children[letterIndex.current]
            if (letterEl) {
                letterEl.style.opacity = '1'
                if (cursorRef.current && containerRef.current) {
                    const letterRect = letterEl.getBoundingClientRect()
                    const containerRect = containerRef.current.getBoundingClientRect()
                    cursorRef.current.style.left = `${letterRect.right - containerRect.left}px`
                    cursorRef.current.style.top = `${letterRect.top - containerRect.top}px`
                }
            }
            letterIndex.current += 1
        } else {
            if (sentenceIndex.current < data.length - 1) {
                sentenceIndex.current += 1
                letterIndex.current = 0
            } else {
                clearInterval(interval.current)
                cursorRef.current?.classList.add('hide')
            }
        }
    }

    let init = () => {
        if (!data || data.length === 0) return
        initAllSentences()
        interval.current = setInterval(typeText, 10)
    }

    useEffect(() => {
        if (triggerInit) init()
    }, [triggerInit])

    useEffect(() => {
        if (start) {
            setTriggerInit(true)
            cursorRef.current?.classList.remove('hide')
        }
    }, [start])

    useEffect(() => {
        return () => clearInterval(interval.current)
    }, [])

    return (
        <Container ref={containerRef}>
            <div ref={textWrapperRef} />
            <CursorWrapper ref={cursorRef} className="hide">
                <DotTyping />
            </CursorWrapper>
        </Container>
    )
}
