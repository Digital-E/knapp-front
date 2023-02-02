import { useEffect, useState } from 'react';

import styled from 'styled-components'

import { createNoise2D, createNoise3D, createNoise4D } from 'simplex-noise';

import alea from 'alea';

const prng = alea('B');


const Container = styled.div`
    position: relative;
    height: 100vh;
    width: 100vw;

    canvas {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`

var text = [
    { hexidec: "#25a9cb" },
    { hexidec: "#28aed0" },
    { hexidec: "#32b7d8" }, 
    { hexidec: "#3c2e3" }, 
    { hexidec: "#4ccbeb" }, 
    { hexidec: "#57d8f8" },
    { hexidec: "6ee0fc" },
    { hexidec: "#77e3fd" },
    { hexidec: "#b1e1d1" },
    { hexidec: "#cae1b1" }, 
    { hexidec: "#ebe8b5" }, 
    { hexidec: "#e3dfa1" }
   ]

export default function Component({ data }) {

    useEffect(() => {

        const noise2D = createNoise2D();
        const noise3D = createNoise3D();
        const noise4D = createNoise4D();
        const canvas = document.getElementById('c');
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let t = 0;

        let lineBreak = 0;
        let start = 0;

        let amount = 256;

        ctx.font = '18px serif';

        let sentence = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        let sentenceSplit = sentence.split("");

        let grid = []

        let gridOriginal = []

        for(let i = 0; i < amount; i ++) {

            let obj = {
                letter: ' ',
                coords: {
                    x: '',
                    y: '',
                }
            }

            if(i % 50 === 0)  {
                start = 0;
                lineBreak += 20
            } else {
                start += 10
            }

            obj.letter = sentenceSplit[i] ? sentenceSplit[i] : 'a'
            obj.coords.x = start
            obj.coords.y = lineBreak

            grid.push(obj)

            gridOriginal.push(obj)
        }


        function drawLetter(letter, r, g) {

            ctx.fillText(letter, r, g);
        }
        
        function drawPlasma(){
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          
          for (let x = 0; x < amount; x++) {
            for (let y = 0; y <  amount; y++) {
                let r = noise3D(x / 50, y / 100, t / 1024);

                // grid[x].letter = r

                grid[x].coords.x = r * amount + 256;


                grid[y].coords.y = r * amount + 256;

            }
        }

          t++;

          for(let i = 0; i < grid.length; i++) {
            drawLetter(grid[i].letter, grid[i].coords.x, grid[i].coords.y);
          }

          requestAnimationFrame(drawPlasma);
        }
        
        drawPlasma();  
    

    }, []);

    return (
            <Container>
                <canvas id="c" width="512" height="512"></canvas>
            </Container>
    )
}