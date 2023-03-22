import styled from 'styled-components'

import ListItem from './list-item'

const Container = styled.div``

const ListHeader = styled.h3`
`

const List = styled.div`
    margin: 30px 0  40px 80px;
`


function Component({ data, categoryIndex, toggleProject }) {

    return(
        <Container>
            <ListHeader>{data.title}</ListHeader>
            <List>
                {
                    data.projects.map((item, index) => (
                        <ListItem data={item} categoryIndex={categoryIndex} projectIndex={index} toggleProject={(currentProject) => toggleProject(currentProject)}/>
                    ))
                }
            </List>
        </Container>
    )
}

export default Component