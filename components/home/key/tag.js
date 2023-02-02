import { useEffect, useState } from 'react';

import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    margin: 5px 0;
    display: flex;
    align-items: center;

    &.is--active > span {
        color: var(--light-gray);
    }

    > span {
        position: relative;
        display: block;
        color: black;
        font-family: FluxischElse Light;
        font-size: 1rem;
        text-decoration: none;
        line-height: 1;
        margin: 0;
    }

    img {
        width: 15px;
        margin-right: 10px;
    }
`

export default function Component({ data, index, selectTag, children, isClear, clearAll, showClear }) {


    return (
            isClear ?
            <Container className={showClear ? 'is--active' : ''} onClick={() => clearAll()}><span>{ children }</span></Container>
            :
            <Container className={data.isActive ? 'is--active' : ''} onClick={() => selectTag(index)}><img src={`/icons/keys/${index + 1}.svg`} /><span>{ data.label }</span></Container>
    )
}