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
    
    let mobileAndTabletCheck = () => {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    
    useEffect(() => {

        let mobileOrTablet = mobileAndTabletCheck();
        if(mobileOrTablet) return;

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
