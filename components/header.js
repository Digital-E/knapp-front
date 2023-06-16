import { useRouter } from "next/router"
import { useState } from "react"
import Link from './link'
import styled from "styled-components"

let Container = styled.header`
  position: fixed;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 20px;
  z-index: 2;
  top: 0;
  // left: 50%;
  // transform: translateX(-50%);
  right: 0;
  box-sizing: border-box;
  user-select: none;

  > div:nth-child(1) {
    z-index: 1;
  }

  > div:nth-child(1) .active-link {
    background: none;
  }

  .p {
   margin: 0;
  }

  @media(min-width: 990px) {
    .active-link {
      opacity: 1 !important;
    }

    .active-link svg {
      opacity: 0.3;
    }
  }

.nav-mobile-burger {
  position: relative;
  display: none;
  padding: 7px 10px;
  border-radius: 25px;
  z-index: 1;
  color: var(--primary);
  background: #252525;
  font-family: FT88 Regular;
  text-transform: uppercase;
  font-size: 0.875rem !important;
}

.nav-mobile-burger span {
  font-size: 0.875rem !important;
  margin: 0;
  padding: 0;
  letter-spacing: 0;
  color: var(--primary);
}

.nav-mobile-burger > span:nth-child(1) {
  display: block;
}

.nav-mobile-burger > span:nth-child(2) {
  display: none;
}

&.nav--open .nav-mobile-burger > span:nth-child(1) {
  display: none;
}

&.nav--open .nav-mobile-burger > span:nth-child(2) {
  display: block;
}


@media(max-width: 989px) {
  top: auto;
  bottom: 0;
  left: 50%;
  padding: 35px;
  transform: translateX(-50%);
  justify-content: space-between;
  
  .nav-mobile-burger {
    display: flex;
  }
}

`

let List = styled.ul`
  display: flex;

  @media(max-width: 989px) {
    align-items: center;
  }
`

let ListItem = styled.li`

  a {
    display: flex;
    align-items: center;
    width: fit-content;
    text-decoration: none;
    text-transform: uppercase;
    margin: 20px 0;
  }

  @media(max-width: 989px) {
    > a > span:nth-child(2) {
      display: none;
    }
  }

  @media(min-width: 990px) {
    > a > span:nth-child(3) {
      display: none;
    }

    a {
      margin: 0;
    }
  }
`

let Menu = styled.div`
  
  ${ListItem} {
    margin: 0 10px;
  }

  @media(max-width: 989px) {
    display: none;
    flex-direction: column;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 230px;
    background: #1A1A1A;
    border-radius: 25px;
    bottom: 20px;
    padding: 20px 0 65px 0;

    ${ListItem} {
      margin: 0;
    }

    > ul {
      flex-direction: column;
    }

    &.nav--open {
      display: flex;
    }
  }
`

let IconSVG = styled.div`
  svg {
    width: 30px;
    filter: drop-shadow(0 0 0.3rem var(--primary));
    transition: filter 0.4s, opacity 0.3s;
  }

  :hover svg {
    filter: drop-shadow(0 0 0.1rem var(--primary));
  }

  path {
    fill: var(--primary);
  }
`

let IconLabel = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translate(-50%, 0);
  opacity: 0;

  @media(max-width: 989px) {
    opacity: 1;
  }
`

let Icon = styled.div`
  position: relative; 

  :hover {
    ${IconLabel} {
      opacity: 1;
    }
  }
`





export default function Header({ data }) {
  let [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  if(data === undefined) return null;


  return (
    <Container className={menuOpen ? "nav--open" : ""}>
      {/* <div
        onClick={() => {setMenuOpen(false);}}>
          <Button>
            <Link href={`/`}>
              <span></span>
            </Link>
          </Button>
      </div> */}
      <div class="nav-mobile-burger" onClick={() => setMenuOpen(!menuOpen)}>
        <span>Menu</span>
        <span>Close</span>
      </div>
      <Menu className={menuOpen ? "nav--open" : ""}>
        <List>
          {
          data?.menuItems?.map((item, index) => {
            return (
              <ListItem key={item._id}  onClick={() => setMenuOpen(false)} >
                <Link href={item.url} isMenu={true}>
                  <Icon>
                    <IconSVG dangerouslySetInnerHTML={{__html: item.icon}} />
                    <IconLabel>{item.label}</IconLabel>
                  </Icon>
                </Link>
              </ListItem>
            )
          })
          }
        </List>
      </Menu>
    </Container>
  )
}
