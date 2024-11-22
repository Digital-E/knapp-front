import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import Thumbnails from './thumbnails'

const Container = styled.div`

`

const InnerContainer = styled.div`
    padding-top: 170px;
    overflow: scroll;

    @media(max-width: 989px) {
        padding-top: 60px;
        padding-bottom: 30px;
    }

    @media(min-width: 990px) {
        height: calc(100vh - 210px);
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
            <InnerContainer>
            {
                data?.categories?.map((item, index) => (
                    <SubList index={index} data={item} categoryIndex={index} currentSelected={currentSelected} toggleProject={(currentProject) => toggleProject(currentProject)} />
                ))
            }
            </InnerContainer>
            <Thumbnails data={data} currentSelected={currentSelected} />
        </Container>
    )
}

export default Component