import { useEffect, useState, useRef, useContext } from "react"
import styled from "styled-components"

import { motion } from 'framer-motion'

import { store } from "../store"

import DynamicBackground from './dynamic-background-2'

const Container = styled(motion.div)`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;
    backdrop-filter: blur(50px);

    .ml13 {
    font-size: inherit;
    text-transform: uppercase;
    text-align: center;
    // letter-spacing: 0.5em;
    // font-weight: 600;
    }

    .ml13 .letter {
    // display: inline-block;
    // line-height: 1em;
    }

    canvas {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
    }
`

const InnerContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    height: 100%;
    max-width: 70%;
    z-index: 1;
`

const containerVariants = {
    visible: {
        display: 'block',
        pointerEvents: 'all',
        opacity: 1,
        transition: {
        duration: 0.7,
        }
    },
    hidden: {
        opacity: 0,
        pointerEvents: 'none',
        transition: {
        duration: 0.3,
        },
      transitionEnd: {
        display: 'none'
      }
    }
    }


let audioVolumeInterval = null
let animeTl = null

let sentences = [
    "La vie elle-même est ton professeur, et tu es dans un état d'apprentissage permanent.",
    "Ne crains pas l'échec. Ce n'est pas l'échec, mais le manque d'ambition qui est un crime. Avec des objectifs élevés, l'échec peut être glorieux.",
    "Je ne crains pas l’homme qui a pratiqué 10.000 coups une fois, mais je crains l’homme qui a pratiqué un coup 10.000 fois.",
    "Toute forme de connaissance, au bout du compte, est une connaissance de soi-même."
]

let sentencesArray = sentences.slice();

export default function Component({}) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if(state.meditationModeActive) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [state])

    let toggleMeditationMode = () => {
        dispatch({type: "toggle meditation mode", value: false})
    }   
    
    useEffect(() => {
        let audio = document.querySelector('#meditation-audio')
        if(isOpen) {
            audio.currentTime = 0
            audio.volume = 0

            clearInterval(audioVolumeInterval)

            audio.play()

            audioVolumeInterval = setInterval(() => {
                if(audio.volume > 0.99) return clearInterval(audioVolumeInterval)

                audio.volume = audio.volume + 0.01
            }, 100)

            triggerSentence();
        } else {

            hideSentence();

            clearInterval(audioVolumeInterval)

            audioVolumeInterval = setInterval(() => {
                if(audio.volume < 0.01) {
                    audio.pause()
                    return clearInterval(audioVolumeInterval)
                }

                audio.volume = audio.volume - 0.01
            }, 50)
        }
    }, [isOpen])

    let triggerSentence = () => {

        // Wrap every letter in a span
        var textWrapper = document.querySelector('.ml13');

        if(sentencesArray.length === 0) sentencesArray = sentences.slice()

        let index = Math.round(Math.random() * (sentencesArray.length - 1))

        textWrapper.innerHTML = sentencesArray[index]

        sentencesArray.splice(index, 1)

        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");           
        
        animeTl = anime.timeline({loop: false})
        .add({
            targets: '.ml13 .letter',
            translateY: [100,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 300 + 30 * i
        })
        // .add({
        //     targets: '.ml13 .letter',
        //     translateY: [0,-100],
        //     opacity: [1,0],
        //     easing: "easeInExpo",
        //     duration: 1200,
        //     delay: (el, i) => 100 + 30 * i
        // }); 
    }

    let hideSentence = () => {
        animeTl?.pause();
    }

    useEffect(() => {    
    }, [])


  return (
    <>
        {/* <Overlay animate={isOpen ? 'visible' : 'hidden'} variants={overlayVariants} onClick={() => toggleMeditationMode()} /> */}
        <audio id="meditation-audio" src="/sounds/meditation.mp3" />
        <Container animate={isOpen ? 'visible' : 'hidden'} variants={containerVariants} onClick={() => toggleMeditationMode()}>
            <InnerContainer>
                <h1 class="ml13"></h1>
            </InnerContainer>
            <DynamicBackground />
        </Container>
    </>
  )
}
