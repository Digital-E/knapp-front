import { useRouter } from "next/router"
import Link from './link'
import styled from "styled-components"
import Body from "./body"

import EmailSubscribe from "./email-subscribe"

let Container = styled.footer`
  position: relative;
  display: flex;
  padding: 20px;

  @media(max-width: 989px) {
    flex-direction: column;
  }
`

let Col = styled.div`
  @media(max-width: 989px) {
    margin-bottom: 10px;
  }
`

let Newsletter = styled.div`
  display: flex;
  width: 80%;

  @media(max-width: 989px) {
      width: 100%;
      flex-direction: column;
  }
`
let LinkWrapper = styled.div`
  margin-left: auto;
`




export default function Header({ data }) {
  let router = useRouter();
  
  if(data === undefined || data === null) return null;

  return (
    <Container>
      <Newsletter>
        <Col><Body content={data.textFieldOne} /></Col>
        <EmailSubscribe data={data} />
      </Newsletter>
      <LinkWrapper>
        <Link href={`/${router.query.lang}/legal`}><p>{data.legalLabel}</p></Link>
      </LinkWrapper>
    </Container>
  )
}
