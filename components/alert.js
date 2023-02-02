import styled from "styled-components";

let Container = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background: white;
  border: 1px solid black;
  padding: 15px 20px;

  a {
    color: red;
  }
`


export default function Alert({ preview }) {
  return (
    <div>
          {preview ? (
            <Container>
              This page is a preview.{' '}
              <a
                href="/api/exit-preview"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </Container>
          ) : null}
    </div>
  )
}
