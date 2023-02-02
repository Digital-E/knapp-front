
import styled from "styled-components"


const Container = styled.div`
    position: absolute;
    display: flex;
    left: 50%;  
    bottom: 20px;
    transform: translateX(-50%);
    box-sizing: border-box;
    z-index: 99;

    // @media(max-width: 578px) {
    //     bottom: 100px;
    // }
`
const Circle = styled.div`
    height: 15px;
    width: 15px;
    min-height: 15px;
    min-width: 15px;
    margin: 0 5px;
    border-radius: 999px;
    background-color: ${props => props.color};
    cursor: pointer;

    &&.is-active, :hover {
        box-shadow: 3px 3px 5px rgb(0 0 0 / 70%);        
    }
`



export default ({ data, brushIndex, setBrushIndex }) => {

    return (
        <Container>
            <Circle className={brushIndex === 0 ? 'is-active' : ''} onClick={() => setBrushIndex(0)} color={data[0].color} />
            <Circle className={brushIndex === 1 ? 'is-active' : ''} onClick={() => setBrushIndex(1)} color={data[1].color}/>
            <Circle className={brushIndex === 2 ? 'is-active' : ''} onClick={() => setBrushIndex(2)} color={data[2].color}/>
            <Circle className={brushIndex === 3 ? 'is-active' : ''} onClick={() => setBrushIndex(3)} color={data[3].color}/>
            <Circle className={brushIndex === 4 ? 'is-active' : ''} onClick={() => setBrushIndex(4)} color={data[4].color}/>
        </Container>
    )
}