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
`


function Component({ data, categoryIndex, projectIndex, toggleProject}) {
    let currentProject = {
        category: categoryIndex,
        project: projectIndex
    }

    return(
        <Container onMouseOver={() => toggleProject(currentProject)}>
            <Link href={data.project.slug.current}>
                {data.project.title}
            </Link>
        </Container>
    )
}

export default Component