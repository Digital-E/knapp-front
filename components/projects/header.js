import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.div`
    position: fixed;  
    width: 100%;
    display: flex;
    align-items: center;
    z-index: 1;
`

const BackWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;

    @media(max-width: 989px) {
        min-width: auto;
        margin: 0 20px;
    }
`


const Back = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-secondary);
    height: 30px;
    width: 30px;
    min-height: 30px;
    min-width: 30px;
    border-radius: 999px;
    cursor: pointer;

    svg {
        position: relative;
        left: -1px;
        height: 30%;
        fill: var(--primary);
    }
`

const InformationWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-basis: 70%;
    padding: 20px 0px;

    @media(max-width: 989px) {
        align-items: flex-start;
        flex-basis: 100%;
        padding: 20px 20px 20px 0;
    }
`


const Title = styled.h3`
`

const Date = styled.h3`
    margin-left: 150px;

    @media(max-width: 989px) {
        margin-left: auto;
    }
    
`
const Div = styled.div`
    flex-basis: 30%;
    width: 100%;
    margin-right: 40px;

    @media(max-width: 989px) {
        display: none;
    }
`



function Component({ data }) {
    let router = useRouter()

    let getYear = (date) => {
        let split = date.split('-')

        return split[0]
    }

    return(
        <Container className='hide-on-expand'>
            <BackWrapper>
            <Link href='/projects'>
                <Back>
                    <svg viewBox="0 0 134.3 240.5" xmlSpace="preserve">
                    <path d="M120.3,240.5c-3.6,0-7.2-1.4-9.9-4.1L4.1,130.2c-5.5-5.5-5.5-14.3,0-19.8L110.4,4.1c5.5-5.5,14.3-5.5,19.8,0
                        c5.5,5.5,5.5,14.3,0,19.8l-96.4,96.4l96.4,96.4c5.5,5.5,5.5,14.3,0,19.8C127.4,239.1,123.8,240.5,120.3,240.5L120.3,240.5z"/>
                    </svg>               
                </Back>
                </Link> 
            </BackWrapper>
            <InformationWrapper>
                <Title>{data.title}</Title>
                <Date>{getYear(data.date)}</Date>
            </InformationWrapper>
            <Div />
        </Container>
    )
}

export default Component