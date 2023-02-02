import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import styled from 'styled-components'

import Button from '../../button'
import Tag from './tag'

const Container = styled.div`
    position: fixed;
    top: 30px;
    right: 40px;
    z-index: 2;
    transition: 0.7s;

    > div:nth-child(1) {
        margin-left: auto;
        margin-bottom: 0.5rem;
        width: fit-content;
    }

    > div:nth-child(1).filter-open > div {
        background: var(--gray);
    }

    &.hide-filter {
        transform: translateY(-150px);
    }
`

const Tags = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
`

let variants = {
    'open': {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    },
    'closed': {
        opacity: 0,
    }
}



export default function Component({ data }) {
    let [filterOpen, setFilterOpen] = useState(false);
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
        <Container className="filter">
            <div 
            className={filterOpen ? 'filter-open' : ''}
            onClick={() => setFilterOpen(!filterOpen)}
            >
                <Button><a><span>Filter</span></a></Button>
            </div>
            <Tags
                init='closed'
                animate={filterOpen ? 'open' : 'closed'}
                variants={variants}
            >
                {tags.map((item, index) => <Tag data={item} index={index} selectTag={(i) => toggleTag(i)}/>)}
                <Tag data={tags} isClear={true} clearAll={() => clearAll()} showClear={showClear}>× Clear </Tag>
            </Tags>
        </Container>
        )
}