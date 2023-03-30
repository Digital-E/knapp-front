import styled from 'styled-components'

import ListItem from './list-item'

const Container = styled.div`
    &.hide {
        opacity: 0.1;
        transition: opacity 0.3s;
    }

    &.show {
        opacity: 1;
        transition: opacity 0.7s;
    }
`

const ListHeader = styled.h3`
`

const List = styled.div`
    margin: 30px 0  40px 90px;

    @media(max-width: 989px) {
        margin: 30px 0  40px 90px;
    }
`


function Component({ index, data, categoryIndex, currentSelected, toggleProject }) {

    return(
        <Container className={currentSelected?.category === index ? 'show' : currentSelected !== null ? 'hide' : 'show'}>
            <ListHeader>{data.title}</ListHeader>
            <List>
                {
                    data.projects.map((item, index) => (
                        <ListItem data={item} currentSelected={currentSelected} categoryIndex={categoryIndex} projectIndex={index} toggleProject={(currentProject) => toggleProject(currentProject)}/>
                    ))
                }
            </List>
        </Container>
    )
}

export default Component