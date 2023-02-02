import { useRouter } from "next/router"
import { useState } from "react"
import Link from './link'
import LocaleLink from "./locale-link"
import styled from "styled-components"

import Button from './button'

let Container = styled.header`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 30px 30px;
  z-index: 2;
  top: 0;
  box-sizing: border-box;

  > div:nth-child(1) {
    z-index: 1;
  }

  > div:nth-child(1) .active-link {
    background: none;
  }

  .p {
   margin: 0;
  }

  .nav-mobile-burger {
    display: none;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    width: 30px;
    height: 35px;
    z-index: 1;
}

.nav-mobile-burger > div {
    height: 1px;
    width: 30px;
    background-color: black;
    margin: 3px 0px;
}

&.nav--open .nav-mobile-burger > div:nth-child(1) {
    position: absolute;
    transform: rotateZ(45deg);
    transform-origin: center center;
}

&.nav--open .nav-mobile-burger > div:nth-child(2) {
    position: absolute;
    transform: rotateZ(-45deg);
    transform-origin: center center;
}

&.nav--open .nav-mobile-burger > div:nth-child(3) {
    display: none;
}

@media(max-width: 989px) {
  // background: white;
  justify-content: space-between;
  
  .nav-mobile-burger {
    display: flex;
  }
}

`

let List = styled.ul`
  display: flex;
  flex-direction: column;
`

let ListItem = styled.li`
  width: fit-content;
`

let Menu = styled.div`
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  

  ${ListItem} {
    margin-left: 10px;
  }

  @media(max-width: 989px) {
    display: none;
    position: absolute;
    flex-direction: column;
    padding: 80px 30px 30px 30px;
    // background: white;

    ${ListItem} {
      margin-left: 0px;
      margin-bottom: 10px;
    }

    > ul {
      flex-direction: column;
    }

    &.nav--open {
      display: flex;
    }
  }
`





export default function Header({ data }) {
  let [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  if(data === undefined) return null;


  return (
    <Container className={menuOpen ? "nav--open" : ""}>
      <div
        onClick={() => {setMenuOpen(false);}}>
          <Button>
            <Link href={`/`}>
              <span>cities.work</span>
            </Link>
          </Button>
      </div>
      <div class="nav-mobile-burger" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Menu className={menuOpen ? "nav--open" : ""}>
        <List>
          {
          data?.menuItems?.map((item, index) => {
            let isLast = index === data.menuItems.length - 1 ? true : false
            return <ListItem key={item._id}  onClick={() => setMenuOpen(false)} ><Button><Link href={item.url} isMenu={true}><span>{item.label}</span></Link></Button></ListItem>
          })
          }
        </List>
      </Menu>
    </Container>
  )
}
