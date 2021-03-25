import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons/lib'

// const Nava = styled.div`
//   background: #75787d;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const SidebarNav = styled.nav`
  background: #adb5bd;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`

const SidebarWrap = styled.div`
  width: 100%;
`

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <SidebarNav sidebar={true}>
          <SidebarWrap>
            <NavIcon to="#"></NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  )
}

export default Sidebar
