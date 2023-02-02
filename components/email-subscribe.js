import styled from "styled-components"

import EmailSubscribeForm from "./email-subscribe-form"


const Container = styled.div`
    flex-grow: 1;
`;

const EmailSubscribe = ({ data }) => {
    return (
        <Container>
            <EmailSubscribeForm data={data}/>
        </Container>
    )
}

export default EmailSubscribe

