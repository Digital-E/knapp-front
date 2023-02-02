import { useEffect, useState } from 'react'

import styled from 'styled-components'

import Button from '../../button'
import Tag from './tag'

const Container = styled.div`
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 999;
    border: 1px solid black;
    border-radius: 15px;
    background: white;
    padding: 15px 20px;
`

const Tags = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`



export default function Component({ data }) {
    let [tags, setTags] = useState([]);
    let [showClear, setShowClear] = useState(false);

    useEffect(() => {

       let tagObjects = data.map(item => {
        let obj = {};
        obj.label = item;
        obj.isActive = false;

        return obj;
       })

       setTags(tagObjects)

    }, []);

    useEffect(() => {
        let showClear = false;

        tags.forEach(item => { if(item.isActive) showClear = true })

        if(showClear === true) {
            setShowClear(true)
        } else {
            setShowClear(false)
        }        
    }, [tags])

    let toggleTag = (i) => {
        let tagsObj = JSON.parse(JSON.stringify(tags));

        tagsObj[i].isActive = !tagsObj[i].isActive

        setTags(tagsObj)
        
    }

    let clearAll = () => {
        let tagsObj = JSON.parse(JSON.stringify(tags));

        tagsObj.forEach((item, index) => {
            tagsObj[index].isActive = false
        })

        setTags(tagsObj)
    }
    
    return (
        <Container>
            <Tags>
                {tags.map((item, index) => <Tag data={item} index={index} selectTag={(i) => toggleTag(i)}/>)}
                {/* <Tag data={tags} isClear={true} clearAll={() => clearAll()} showClear={showClear}>× Clear </Tag> */}
            </Tags>
        </Container>
        )
}