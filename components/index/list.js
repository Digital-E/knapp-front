import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import Thumbnails from './thumbnails'

const Container = styled.div`
    @media(max-width: 989px) {
        height: 100%;
    }
`

const InnerContainer = styled.div`
    padding-top: 170px;
    overflow: scroll;

    @media(max-width: 989px) {
        height: 100%;
        padding-top: 0;

        > div:nth-child(1) {
            padding-top: 20px
        }
        > div:last-child {
            padding-bottom: 50px
        }
    }

    @media(min-width: 990px) {
        height: calc(100vh - 190px);
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