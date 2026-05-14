import styled from "styled-components"

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

    @media(max-width: 989px) {
        opacity: 1;
    }
`

const Overlay = styled.div`
    position: fixed;
    z-index: 9997;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.4s ease-in,
                visibility 0s 0.4s;

    backdrop-filter: blur(50px);

    &.open {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        transition: opacity 0.4s ease,
                    visibility 0s;
    }
`

const PopUp = styled.div`
    position: fixed;
    width: 480px;
    height: auto;
    border-radius: 20px;
    padding: 80px 20px 40px 20px;
    z-index: 9998;
    max-width: 480px;
    background: var(--background);
    left: 50%;
    top: 50%;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translate(-50%, -50%) scale(1.1);
    filter: blur(100px);
    transition: opacity 0.4s ease-in,
                transform 0.4s ease-in,
                filter 0.4s ease-in,
                visibility 0s 0.4s;

    &.open {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        transform: translate(-50%, -50%) scale(1);
        filter: blur(0px);
        transition: opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    filter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    visibility 0s;
    }

    @media(max-width: 989px) {
        width: calc(100% - 80px);
    }

    @media(min-width: 990px) {
        &:hover ${CloseButton} {
            opacity: 1;
        }
    }
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
        <Overlay onClick={() => togglePopup()} className={popupOpen ? 'open' : ''} />
        <PopUp className={popupOpen ? 'open' : ''}>
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
                    <ListItem key={item.project.slug.current}>
                        <Link href={item.project.slug.current}>
                            <Thumbnail><Image data={item.project.thumbnail}/></Thumbnail>
                            <Title>{item.project.title}</Title>
                        </Link>
                    </ListItem>
                )}
            </List>
        </PopUp>
        </>
    )
}

export default Component
