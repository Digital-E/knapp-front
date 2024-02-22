import styled from "styled-components";

let Container = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background: var(--background-secondary);
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid var(--primary);
  color: var(--primary);

  a {
    color: var(--primary);
  }
`


export default function Alert({ preview }) {
  return (
    <div>
          {preview ? (
            <Container>
              <p>
              This page is a preview.{' '}
              <a
                href="/api/exit-preview"
              >
                Click here
              </a>{' '}
              to exit preview mode.
              </p>
            </Container>
          ) : null}
    </div>
  )
}
