import React from 'react'

import { RxDashboard } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";
import { BsClockHistory } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { Button, IconButton } from '@chakra-ui/react';

export const SideNavbar = () => {
  return (
    
       <div className="side-navbar">
          <div className="dashboard">
            {/* <div className="dash-img">
              <RxDashboard style={{ "color": "#ffffff",width: "1.7vmax",height: "1.7vmax" }} />
              </div> */}
            <Button
              className="dash-btn"
              as={IconButton}
              size={["xs", "sm", "md"]}

              icon={
                <RxDashboard
                  color="white"
                  width={"1.7vmax"}
                  height={"1.7vmax"}
                />
              }
              colorScheme="blue"
            ></Button>
            <div className="dash-text">Dashboard</div>
          </div>
          <div className="calender">
            <Button
              backgroundColor={"#E9E9E9"}
              className="calender-btn"
              as={IconButton}
              icon={
                <SlCalender
                  color="#1479FF"
                  width={"1.7vmax"}
                  height={"1.7vmax"}
                />
              }
            ></Button>
            <div className="calender-text">Calender</div>
          </div>
          <div className="history">
            <Button
              backgroundColor={"#E9E9E9"}
              className="history-btn"
              as={IconButton}
              icon={
                <BsClockHistory
                  color="#1479FF"
                  width={"1.7vmax"}
                  height={"1.7vmax"}
                />
              }
            ></Button>
            <div className="history-text">History</div>
          </div>
          <div className="profile-user">
            <Button
              backgroundColor={"#E9E9E9"}
              className="profile-btn"
              as={IconButton}
              icon={
                <FaRegUser
                  color="#1479FF"
                  width={"1.7vmax"}
                  height={"1.7vmax"}
                />
              }
            ></Button>
            <div className="profile-text">Profile</div>
          </div>
        </div>
    
  )
}
