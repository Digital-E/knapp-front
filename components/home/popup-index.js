import React, {useEffect, useState, useContext} from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import Image from "../media/image"
import Link from "../link"

const CloseButton = styled.div`
    position: absolute;
    right: -10px;
    top: -10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background: #555;
    opacity: 0;
    transition: opacity 0.2s ease;

    svg path {
        fill: var(--primary);
    }
`

const PopUp = styled(motion.div)`
    position: fixed;
    width: 480px;
    height: auto;
    border-radius: 20px;
    padding: 80px 20px 40px 20px;
    z-index: 9998;
    max-width: 480px;
    background: var(--background);

    :hover ${CloseButton} {
        opacity: 1;
    }

    @media(max-width: 989px) {
        width: calc(100% - 60px);
    }
`

const Overlay = styled(motion.div)`
    position: fixed;
    z-index: 9997;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(50px);
    cursor: pointer;
`

const Category = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    left: 20px;
    top: 20px;

    p {
        text-transform: uppercase;
        font-family: ProFontWindows;
        font-size: 1.125rem;
        margin: 0;
        color: var(--primary);
    }
`

const List = styled.div``

const ListItem = styled.div`
    width: fit-content;

    > a {
        display: flex;
        align-items: center;
    }

    // :hover > a > div:nth-child(1) {
    //     opacity: 0.4;
    //     transition: opacity var(--transition-in);
    // }

    :hover > a > div:nth-child(2) {
        color: var(--primary);
        transition: color var(--transition-in);
    }
`

const Title = styled.div`
    text-transform: uppercase;
    font-family: ProFontWindows;
    font-size: 1.125rem;
    margin-left: 15px;
    color: var(--secondary);
`

const Thumbnail = styled.div`
    position: relative;
    height: 30px;
    width: 30px;
    border-radius: 3px;
    overflow: hidden;

    > div {
        height: 100%;
        width: 100%;
    }

    > div > span {
        height: 100% !important;
        width: 100% !important;
    }

    > div > span > span {
        padding-top: 0 !important;
    }

    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`




const popUpVariants = {
    initial: {
        opacity: 0,
        scale: 1.1,
        display: "none",
        y: "-50%",
        x: "-50%",
        left: "50%",
        top: "50%",
    },
    hidden: {
        opacity: 0,
        scale: 0.9,
        y: "-50%",
        x: "-50%",
        left: "50%",
        top: "50%",
        transition: {
            duration: 0.7,
            type: 'spring',
            ease: "easeInOut"
        },
        transitionEnd: {
            scale: 1.1,
            display: "none"
        }
    },
    visible: {
        opacity: 1,
        scale: 1,
        display: "block",
        y: "-50%",
        x: "-50%",
        left: "50%",
        top: "50%",
        transition: {
            duration: 1,
            type: 'spring',
            ease: "easeInOut",
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

const overlayVariants = {
    hidden: {
        opacity: 0,
        transitionEnd: {
            display: "none"
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
        },
        display: "block"
    }
}

let Icon = styled.div`
    svg {
        height: 25px;
        margin-right: 5px;
    }

    path {
        fill: var(--primary) !important;
    }
`


const Component = ({ data, togglePopup, popupOpen, currentCategoryIndex }) => {

    return (
        <>
        <Overlay onClick={() => togglePopup()} animate={popupOpen? "visible" : "hidden"} variants={overlayVariants}/>
        <PopUp initial={"initial"} animate={popupOpen ? "visible" : "hidden"} variants={popUpVariants}>
            <Category>
                <Icon 
                    dangerouslySetInnerHTML={{__html: data.categories[currentCategoryIndex].icon}}
                />
                <p>{data.categories[currentCategoryIndex].title}</p>
            </Category>
            <CloseButton onClick={() => togglePopup()}>
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="currentColor"/></svg>
            </CloseButton>
            <List>
                {data.categories[currentCategoryIndex].projects.map(item =>
                    <ListItem>
                        <Link href={item.project.slug.current}>
                            <Thumbnail><Image data={item.project.thumbnail}/></Thumbnail>
                            <Title>{item.project.title}</Title>
                        </Link>                        
                    </ListItem>
                )}
            </List>
            {/* <Information dangerouslySetInnerHTML={{ __html: data !== null && data.AboutText }}/> */}
        </PopUp>
        </>          
    )
}

export default Component