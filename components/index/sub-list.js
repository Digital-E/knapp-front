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
    margin: 30px 0  40px 100px;

    @media(max-width: 989px) {
        margin: 30px 0  40px 90px;
    }
`

const Icon = styled.div`
    svg {
        width: 30px;
        filter: drop-shadow(0 0 0.3rem var(--primary));
        transition: filter 0.4s;
    }

    :hover svg {
        filter: drop-shadow(0 0 0.1rem var(--primary));
    }

    path {
        fill: var(--primary);
    }
`



function Component({ index, data, categoryIndex, currentSelected, toggleProject }) {

    return(
        <Container className={currentSelected?.category === index ? 'show' : currentSelected !== null ? 'hide' : 'show'}>
            <ListHeader>
                {/* {data.title} */}
                <Icon dangerouslySetInnerHTML={{__html: data.icon}} />
            </ListHeader>
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