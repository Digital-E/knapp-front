import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import Thumbnails from './thumbnails'

const Container = styled.div`
    margin-top: 170px;

    @media(max-width: 989px) {
        margin-top: 60px;
    }
`

import SubList from './sub-list'

function Component({ data }) {
    let [currentSelected, setCurrentSelected] = useState(null);

    let toggleProject = (currentProject) => {
        setCurrentSelected(currentProject)
    }

    return(
        <Container>
            {
                data?.categories?.map((item, index) => (
                    <SubList index={index} data={item} categoryIndex={index} currentSelected={currentSelected} toggleProject={(currentProject) => toggleProject(currentProject)} />
                ))
            }
            <Thumbnails data={data} currentSelected={currentSelected} />
        </Container>
    )
}

export default Component