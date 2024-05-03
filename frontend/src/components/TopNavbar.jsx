import { Avatar, Menu, MenuButton, MenuItem, MenuList, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const TopNavbar = () => {
  return (
    <div className="login">
    <div className="profile">
      <div className="name">
        <div className="greeting">Hi, Welcome Back</div>
        <div className="username">Rikhil Taneja</div>
      </div>
      <Menu>
        <MenuButton>
          <Wrap>
            <WrapItem>
              <Avatar name="Rikhil Taneja" src="https://avatars.githubusercontent.com/u/142862928?v=4" />
            </WrapItem>
          </Wrap>
        </MenuButton>
        <MenuList>
          <Link to={"/patient/login"}>
            <MenuItem>Patient</MenuItem>
          </Link>
          <Link to={"/doctor/login"}>
            <MenuItem>Doctor</MenuItem>
          </Link>
          <Link to={"/hospital/login"}>
            <MenuItem>Hospital</MenuItem>
          </Link>
        </MenuList>
      </Menu>

      {/* <div className="dp">
        <img
          src="https://avatars.githubusercontent.com/u/142862928?v=4"
          alt=""
        />
      </div> */}
    </div>
  </div>
  )
}

export default TopNavbar