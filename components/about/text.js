import { useEffect, useState } from 'react';

import styled from 'styled-components'

import FastSimplexNoise from './functions'


const Container = styled.div`
    position: relative;
    min-height: 100vh;
    width: 100%;
`

const Text = styled.div`
    position: relative;
    z-index: 999;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    width: 350px;
    font-family: FluxischElse Regular;
    font-size: 16px;

    .letter {

    }
`


export default function Component({ data }) {

    let letters = [];

    let init = () => {
        let string = document.querySelector(".text").innerText.split("");

        document.querySelector(".text").innerHTML = "";

        string.forEach((item, index) => {
            let span = document.createElement("span")
            span.innerText = item
            span.classList.add("letter")
            document.querySelector(".text").appendChild(span)
        })

        setTimeout(() => {

        Array.from(document.querySelector(".text").children).forEach((item, index) => {
            // Get Letter Position

            let letterNode = document.querySelector(".text").children[index]

            let letterNodeXPos = letterNode.getBoundingClientRect().x

            let letterNodeYPos = letterNode.getBoundingClientRect().y

            let obj = {
                letter: item,
                x: letterNodeXPos,
                y: letterNodeYPos
            }


            letters.push(obj)
        })


        // Set All Positions

        letters.forEach((item, index) => {
            let letterNode = document.querySelector(".text").children[index]

            letterNode.style.left = `${item.x}px`
            letterNode.style.top = `${item.y + 4}px`
        })

        // Set All Absolute

        letters.forEach((item, index) => {
            let letterNode = document.querySelector(".text").children[index]

            letterNode.style.position = "absolute"
        })

        }, 250)
    }

    useEffect(() => {
        init();
    }, []);

    return (
            <Container id="container">
                <Text className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
            </Container>
    )
}