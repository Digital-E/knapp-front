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

    &.show > div:nth-child(1) > h3 {
        opacity: 1;
    }
`

const ListHeader = styled.div`
    display: flex;
    align-items: center;

    > h3 {
        opacity: 0;
        margin-left: 5px;
    }
`

const List = styled.div`
    margin: 30px 0  40px 100px;

    @media(max-width: 989px) {
        margin: 30px 0  40px 90px;
    }
`

const Icon = styled.div`
    svg {
        width: 35px;
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
                <Icon dangerouslySetInnerHTML={{__html: data.icon}} />
                <h3>{data.title}</h3>
            </ListHeader>
            <List>
                {
                    data?.projects?.map((item, index) => (
                        <ListItem data={item} currentSelected={currentSelected} categoryIndex={categoryIndex} projectIndex={index} toggleProject={(currentProject) => toggleProject(currentProject)}/>
                    ))
                }
            </List>
        </Container>
    )
}

export default Component