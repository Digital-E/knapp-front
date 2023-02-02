import { useEffect, useState } from 'react';

import styled from 'styled-components'

import FastSimplexNoise from './functions'


const Container = styled.div`
    position: relative;
    min-height: 100vh;
    width: 100%;

    canvas {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

export default function Component({ data }) {

    var cols = 30;
    var rows = 30;
    var scale = 12;

    var width = cols * scale;
    var height = rows * scale;

    let incrX = 0;
    let incrY = 0;


    // var text = [
    //     { hexidec: "#25a9cb" },
    //     { hexidec: "#28aed0" },
    //     { hexidec: "#32b7d8" }, 
    //     { hexidec: "#3dc2e3" }, 
    //     { hexidec: "#4ccbeb" }, 
    //     { hexidec: "#57d8f8" },
    //     { hexidec: "6ee0fc" },
    //     { hexidec: "#77e3fd" },
    //     { hexidec: "#b1e1d1" },
    //     { hexidec: "#cae1b1" }, 
    //     { hexidec: "#ebe8b5" }, 
    //     { hexidec: "#e3dfa1" }
    //    ]


    let letterIndex = 0;
    let letterPositionX = 0;
    let letterPositionY = 0;

    let sentence = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    // let sentence = "Lorem Ipsum is simply dummy text"
    // let sentence = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages."
    let sentenceSplit = sentence.split("");
    let sentenceSplitShort = sentenceSplit.slice("").splice(0, 30);

    let time = 5;

    useEffect(() => {
        var canv = document.createElement("canvas");
            canv.width = 500;
            canv.height = 500;

        document.querySelector("#canvas-container").appendChild(canv);

        var ctx = canv.getContext("2d");

        // ctx.font = "18px FluxischElse Light";

        var noiseGen = new FastSimplexNoise({
                        amplitude: 0.015,
                        frequency: 0.005,
                        octaves: 2,
                        max: sentenceSplitShort.length - 1,
                        min: 0
        });

        let rowCount = (sentenceSplit.length - (sentenceSplit.length % (cols + 1))) / (cols + 1)

        let rowIndex = 0;

        let colIndex = 0;

        let remainingCount = sentenceSplit.length % (cols + 1);

        let staticText = (i, j) => {

            // ctx.fillStyle = "#FF0000";

            letterIndex = ((rowIndex * cols) + colIndex + rowIndex)

            if(j > letterPositionY && j <= rowCount) {
                rowIndex += 1;
            } else {
                rowIndex = 0;
            }

            if((i > remainingCount - 1 && j > rowCount) || (j > rowCount + 1) || (i > cols)) return false

            if(sentenceSplit[letterIndex] !== undefined) {
                ctx.fillText(sentenceSplit[letterIndex], i * scale, j * scale);
            } else {
                ctx.fillText(' ', i * scale, j * scale);
            }


            return true;

        }

        const draw = () => {
            ctx.clearRect(0, 0, canv.width, canv.height);

            for (var i = 0; i < width; i++) {

                if(i > letterPositionX && i <= cols) {
                    colIndex += 1;
                } else {
                    colIndex = 0;
                }

                for (var j = 0; j < height; j++) {

                    var n = noiseGen.in3D(i, j, Date.now() * 0.005);
                                
                    var h = parseInt(n);
                    
                    var t = sentenceSplitShort[h];
                
                    // ctx.fillStyle = t.hexidec;

                    // Flat
                    // if(h >= 0 && h <= 8) {
                    //     ctx.fillStyle = "#00ff00";
                    // } else {
                    //     ctx.fillStyle = "#000000";
                    // }


                    let showStatic = staticText(i, j);

                    if(!showStatic) {
                        ctx.fillStyle = "#000000";
                        ctx.fillText(t, i * scale , j * scale );
                    }

                }
                }


                requestAnimationFrame(draw);
        }

        draw();
        


    }, []);

    return (
            <Container id="canvas-container">
            </Container>
    )
}