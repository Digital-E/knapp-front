import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 30px 40px;
`

const Back = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1A1A1A;
    height: 30px;
    width: 30px;
    min-height: 20px;
    min-width: 20px;
    border-radius: 999px;

    svg {
        position: relative;
        left: -1px;
        height: 30%;
        fill: var(--primary);
    }
`

const Title = styled.h3`
    margin-left: 50px;
`

const Date = styled.h3`
    margin-left: 150px;
`



function Component({ data }) {

    let getYear = (date) => {
        let split = date.split('-')

        return split[0]
    }

    return(
        <Container>
            <Back>
            <svg viewBox="0 0 134.3 240.5" xmlSpace="preserve">
            <path d="M120.3,240.5c-3.6,0-7.2-1.4-9.9-4.1L4.1,130.2c-5.5-5.5-5.5-14.3,0-19.8L110.4,4.1c5.5-5.5,14.3-5.5,19.8,0
                c5.5,5.5,5.5,14.3,0,19.8l-96.4,96.4l96.4,96.4c5.5,5.5,5.5,14.3,0,19.8C127.4,239.1,123.8,240.5,120.3,240.5L120.3,240.5z"/>
            </svg>                
            </Back>
            <Title>{data.title}</Title>
            <Date>{getYear(data.date)}</Date>
        </Container>
    )
}

export default Component