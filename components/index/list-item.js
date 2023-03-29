import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Link from '../link'

const Container = styled.div`
    margin-bottom: 15px;
    width: fit-content;

    a {
        text-transform: uppercase;
        font-family: ProFontWindows;
        font-size: 1.125rem;
    }

    &.highlight > a {
        color: var(--primary);
    }
`


function Component({ data, currentSelected, categoryIndex, projectIndex, toggleProject}) {
    let [isSelected, setIsSelected] = useState(false)

    let currentProject = {
        category: categoryIndex,
        project: projectIndex
    }

    useEffect(() => {
        if(currentSelected === null) return

        if(currentSelected.category === currentProject.category && currentSelected.project === currentProject.project) {
            setIsSelected(true)
        } else {
            setIsSelected(false)
        }
    }, [currentSelected])

    return(
        <Container onMouseOver={() => toggleProject(currentProject)} className={isSelected ? 'highlight' : ''}>
            <Link href={data.project.slug.current}>
                {data.project.title}
            </Link>
        </Container>
    )
}

export default Component