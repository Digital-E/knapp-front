import { useEffect, useState, useRef, useContext } from 'react'
import styled from 'styled-components'

import { useRouter } from 'next/router'

import { gsap } from "gsap/dist/gsap";

import { motion } from "framer-motion";

import { store } from "../../../store";

import splitSlug from "../../../lib/splitSlug"



const Element = styled(motion.div)`
  position: absolute;
  display: flex;
  left: ${props => props.data.islandPositionX }% !important;
  top: ${props => props.data.islandPositionY }% !important;
  width: 30%;
  pointer-events: none;
  z-index: auto;

  transition: 0.1s;

  &.closing-island {
    transition: 1s;
    z-index: 2 !important;
  }

  &.open-island {
    // width: 70vw !important;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) scale(1.7) !important;
    z-index: 2 !important;
    transition: 1s;
  }

  .island-text {
    transition: 0.5s;
  }

  .island-svg {
    position: relative;
    z-index: -1;
  }

  .island-svg path {
    pointer-events: all;
    cursor: pointer;
    fill: ${props => props.data.color };
  }

  &.open-island .island-text {
    transform: translate(-50%,-50%) scale(0.7);
  }

  img {
    width: 100%;
  }

  > div {
    transition: transform 0.7s;
  }

  &.hover-island > div {
    transform: scale(1.1) !important
  }
`

const Name = styled.div`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  transform: translate(-50%, -50%);
  font-family: FluxischElse Light;
  font-size: 1rem;
`

const Projects = styled.div`
`

const Project = styled.div`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  transform: translate(-50%, -50%);
  font-family: FluxischElse Light;
  font-size: 0.8rem;
  pointer-events: all;

  display: flex;
  align-items: center;

  img {
      width: 10px;
      margin-right: 5px;
  }

  :hover {
    opacity: 0.5;
    cursor: pointer;
  }
`

let variants = {
    "open": {
      width: "70%",
      left: "50%",
      top: "50%",
      x: "-50%",
      y: "-50%",
      zIndex: "2 !important",
      transition: "1s"
    },
    "close": {
      width: "30%",
      transitionEnd: {
        transition: "0s",
      },
    }
  }

let closingIslandTimeout = null;

export default function Component({ data, index, dataAll, allProjects, toggle, prevOpen }) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let router = useRouter();

    let elRef = useRef();
    let islandSVGRef = useRef();
    let [isOpen, setIsOpen] = useState(false);

    let mouseEnter = () => {
        elRef.current.style.zIndex = 2;
        elRef.current.classList.add("hover-island")
    }

    let mouseLeave = () => {
        elRef.current.style.zIndex = 'auto';
        elRef.current.classList.remove("hover-island")
    }

    useEffect(() => {

        if(dataAll[index].isOpen === true) {
            setIsOpen(true)
            elRef.current.classList.add("open-island");
        } else if(dataAll[index].isOpen === false && prevOpen === index) {
            clearTimeout(closingIslandTimeout);

            setIsOpen(false)

            elRef.current.classList.add("closing-island");
            elRef.current.classList.remove("open-island");
            
            closingIslandTimeout = setTimeout(() => {
                elRef.current.classList.remove("closing-island");
            }, 1000)
        }

    }, [dataAll])

    useEffect(() => {
      Array.from(islandSVGRef.current.children[0].children).forEach(item => {
        item.addEventListener("mouseenter", mouseEnter)
        item.addEventListener("mouseleave", mouseLeave)
        item.addEventListener("click", toggle)
      })
    }, [])

    const toggleSidepanel = (reference) => {
      
      let match = allProjects.filter(item => item._id === reference)

      let pathname = `/${splitSlug(match[0].slug, 0)}/${splitSlug(match[0].slug, 1)}`
      router.push(pathname)
        // dispatch({type: "sidepanel open", value: true})
        // dispatch({type: "current project reference", value: reference})
      }

  return (
        <Element 
            ref={elRef} 
            data={data} 
            data-depth={data.dataDepth}
            variants={variants}
            >
            <div>
                <Name x={data.titlePositionX} y={data.titlePositionY} className='island-text'>{data.title}</Name>
                <Projects>
                    {data.projects?.map(item => 
                    <Project 
                        x={item.titlePositionX} 
                        y={item.titlePositionY}
                        onMouseOver={() => mouseEnter()}
                        onMouseLeave={() => mouseLeave()}
                        onClick={() => toggleSidepanel(item.project._ref)}
                        className='island-text'
                        >
                            <img src={`/icons/keys/${index + 1}.svg`} />
                            {item.title}
                    </Project>
                    )}
                </Projects>
                <div                
                  ref={islandSVGRef}
                  className='island-svg'
                  dangerouslySetInnerHTML={{__html: data.svg}}
                />
          </div>
        </Element>
  )
}
