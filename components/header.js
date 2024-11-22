import { useRouter } from "next/router"
import { useState } from "react"
import Link from './link'
import styled from "styled-components"

let Container = styled.header`
  position: fixed;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  z-index: 2;
  top: 0;
  // left: 50%;
  // transform: translateX(-50%);
  right: 0;
  box-sizing: border-box;
  user-select: none;
  pointer-events: none;

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
  pointer-events: all;
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

@media(min-width: 990px) {
  width: 100%;
}

`

let List = styled.ul`
  position: relative;
  display: flex;
  margin-top: 5px;
  pointer-events: all;

  @media(max-width: 989px) {
    align-items: center;
  }

  @media(min-width: 990px) {
      margin-top: 5px;
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
  pointer-events: all;

  ${ListItem} {
    margin: 0 10px;
  }

  ${ListItem}:last-child {
    margin-right: 0;
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

  @media(min-width: 990px) {
    margin-right: 60px;
  }
`

let IconSVG = styled.div`
  svg {
    width: 35px;
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
  bottom: -12px;
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

let Logo = styled.div`
  position: relative;
  width: auto;
  height: 25px;
  pointer-events: all;

  svg {
    height: 100%;
    opacity: 1 !important;
  }

  path {
    fill: var(--primary);
  }

  @media(max-width: 989px) {
    display: none;
  }
`

let BackgroundBlur = styled.div`
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300%;
    height: 300%;
    backdrop-filter: blur(10px);
    mask-image: radial-gradient(black 20%, transparent 50%);
    pointer-events: none;

    @media(max-width: 989px) {
      display: none;
    }
`



export default function Header({ data }) {
  let [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  if(data === undefined) return null;


  return (
    <Container className={menuOpen ? "nav--open hide-on-expand" : "hide-on-expand"}>
      {/* <div
        onClick={() => {setMenuOpen(false);}}>
          <Button>
            <Link href={`/`}>
              <span></span>
            </Link>
          </Button>
      </div> */}
        <Logo>
          <BackgroundBlur></BackgroundBlur>  
          <Link href="/">
          <svg x="0px" y="0px"
            viewBox="0 0 2304.3 232.7">
          <path d="M1848.3,86.1c-11,6-38,21-47,26c-8,4-19,7-23,4c-6-4,1-18,6-24C1804.3,66.1,1830.3,63.1,1848.3,86.1z M1923.3,178.1
            c-7-13-17-22-66-92c16-10,33-21,49-32c-17,8-35,19-52,29l-34-47c-39,44-76,97-107,142c46-27,94-60,138-89
            C1875.3,119.1,1899.3,150.1,1923.3,178.1z M799.3,88.1c24,30,48,61,72,89c-7-13-17-22-66-92c16-10,33-21,49-32c-17,8-35,19-52,29
            M796.3,85.1c-11,6-38,21-47,26c-8,4-19,7-23,4c-6-4,1-18,6-24C752.3,65.1,778.3,62.1,796.3,85.1z M871.3,177.1c-7-13-17-22-66-92
            c16-10,33-21,49-32c-17,8-35,19-52,29l-34-47c-39,44-75,93-106,138c46-27,93-56,137-85C823.3,118.1,847.3,149.1,871.3,177.1z
            M214.3,107.1c0,21,2,46,5,71c3-71,12-66,83-66s80-5,83,66c3-25,5-50,5-71s-2-46-5-71c-3,71-12,67-83,67s-80,4-83-67
            C216.3,61.1,214.3,86.1,214.3,107.1z M947.3,138.1c-10,0-18-4-28-12c-21-17-34-42-58-73c33,62,68,104,86,124c18-20,53-62,86-124
            c-24,31-37,56-58,73C965.3,134.1,957.3,138.1,947.3,138.1z M1518.3,180.1c-18-11-58-35-100-54c-6,5-25,19-38,34c21-15,44-18,67-9
            C1455.3,154.1,1505.3,176.1,1518.3,180.1z M1619.3,102.1c-57-30-82-54-91-66c-3,59-6,98-1,142c1-37,1-83,17-92c15-9,45,9,71,22
            c57,30,82,55,91,69c3-59,6-100,1-144c-1,37-1,83-17,92C1675.3,134.1,1645.3,115.1,1619.3,102.1z M2124.3,180.1c-6-34-9-64-14-97
            c-4-22-10-35-31-41c111,8,152,22,193,35c-77,21-145,37-193,47c57-17,130-32,131-47c1-16-94-38-91,11L2124.3,180.1z M1943.3,179.1
            c-6-34-9-64-14-97c-4-22-10-35-31-41c111,8,152,22,193,35c-77,21-145,37-193,47c57-17,130-32,131-47c1-16-94-38-91,11L1943.3,179.1z
            M565.3,102.1c34,13,74,35,93,55c-33,11-76,16-146,15c62-6,101-10,105-26C620.3,133.1,586.3,114.1,565.3,102.1z M510.3,86.1
            c2-49,77-38,78-19c1,15-20,19-72,51c62-28,83-36,120-58c-42-14-88-22-143-6c6,5,8,11,10,34c2,22,1,59,3,89
            C508.3,147.1,509.3,90.1,510.3,86.1z M122.3,178.1c3-39,0-77,12-99c12-21,35-25,74-25c-54-10-115-10-172,0c41,0,64,4,75,25
            C123.3,101.1,119.3,139.1,122.3,178.1z M1335.3,36.1c-4,48-3,94-1,144c41-27,111-91,155-144c-33,30-65,60-110,90c-18,12-32,7-37-18
            C1337.3,84.1,1335.3,64.1,1335.3,36.1z M1120.3,178.1c3-39,0-77,12-99c12-21,35-25,74-25c-54-10-116-10-172,0c41,0,64,4,75,25
            C1121.3,101.1,1117.3,139.1,1120.3,178.1z M401.3,170.1c28,6,58,6,87,0c-10-1-18-4-24-8c-7-5-11-12-13-21c-6-27-4-72-7-105
            c-2,33,0,78-5,105C436.3,158.1,422.3,167.1,401.3,170.1z"/>
          </svg> 
          </Link>       
        </Logo>       
      <div class="nav-mobile-burger" onClick={() => setMenuOpen(!menuOpen)}>
        <span>Menu</span>
        <span>Close</span>
      </div>
      <Menu className={menuOpen ? "nav--open" : ""}>    
        <List>
        <BackgroundBlur></BackgroundBlur>   
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
