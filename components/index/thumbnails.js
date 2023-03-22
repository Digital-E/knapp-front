import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Image from '../image'

const Container = styled.div`
    position: fixed;
    bottom: 30px;
    right: 40px;
    width: 25%;
`

const Thumbnail = styled.div`
    position: absolute;
    opacity: 0;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;

    &.show-thumbnail {
        position: relative;
        opacity: 1;
    }
`


function Component({ data, currentSelected }) {
    let containerRef = useRef();
    let [allData, setAllData] = useState();
    let [allThumbnails, setAllThumbnails] = useState([]);
    let count = useRef(0)

    useEffect(() => {

        let allDataArray = JSON.parse(JSON.stringify(data.categories))
        let newAllDataArray = allDataArray

        allDataArray.forEach((itemOne, indexOne) => {
            itemOne.projects.forEach((itemTwo, indexTwo) => {
                newAllDataArray[indexOne].projects[indexTwo].project.index = count.current
                count.current += 1
            })
        })

        setAllData(newAllDataArray)

        let allThumbnailsArray = []
    
        data.categories.forEach(item => {
    
            item.projects.forEach(item => {
                allThumbnailsArray.push(item.project.thumbnail)
            })
    
        })

        setAllThumbnails(allThumbnailsArray)
    
    }, [])

    useEffect(() => {
        Array.from(containerRef.current.children).forEach(item => {
            item.classList.remove('show-thumbnail')
        })

        if(currentSelected === null) return

        let index = allData[currentSelected.category].projects[currentSelected.project].project.index

        Array.from(containerRef.current.children)[index].classList.add('show-thumbnail')

    }, [currentSelected])

    return(
        <Container ref={containerRef}>
            {
            allThumbnails.map((item, index) => {
                    return <Thumbnail className={`thumbnail-${index}`}><Image data={item} /></Thumbnail>
            })
            }
        </Container>
    )
}

export default Component
