import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./Context";
import { deleteCookie, getCookie } from "../utils/cookie";
import { loginCheck } from "../utils/loginCheck";
import axios from "axios";

const TopNavbar = () => {
  const { userType, setLogin, login } = useContext(AppContext);
  const [patient, setPatient] = useState({});
  const [doctor, setDoctor] = useState({});
  const [hospital, setHospital] = useState({});
  const toast = useToast()

  const logout = () => {
    toast({
      title: 'Logged out',
      status: 'info',
      duration: 9000,
      isClosable: true,
    })
    deleteCookie("auth-token");
    deleteCookie("type");
    let username = getCookie("username");
    let email = getCookie("email");
    if (username) {
      deleteCookie("username");
    }
    if (email) {
      deleteCookie("email");
    }
    setTimeout(() => {
      location.reload();
      
    }, 1500);
    setLogin(loginCheck());
  };
  let username = getCookie("username");
  let hosEmail = getCookie("email");

  useEffect(() => {
    if (userType == "Patient") {
      axios
        .get(`http://localhost:6969/patients/${username}`)
        .then((res) => {
          setPatient(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (userType == "Doctor") {
      axios
        .get(`http://localhost:6969/doctors/${username}`)
        .then((res) => {
          setDoctor(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (userType == "Hospital") {
      axios
        .get(`http://localhost:6969/hospitals/${hosEmail}`)
        .then((res) => {
          setHospital(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userType]);
  return (
    <div className="login">
      <div className="profile">
        <div className="name">
          {login ? (
            <>
              {userType == "Hospital" ? (
                <>
                  <div className="greeting">Hi, Welcome Back</div>
                  <div className="username">{hospital.name}</div>
                </>
              ) : userType == "Doctor" ? (
                <>
                  <div className="greeting">Hi, Welcome Back</div>
                  <div className="username">{doctor.name}</div>
                </>
              ) : userType == "Patient" ? (
                <>
                  <div className="greeting">Hi, Welcome Back</div>
                  <div className="username">{patient.name}</div>
                </>
              ) : (
                ""
              )}
              {/* <div className="greeting">Hi, Welcome Back</div>
              <div className="username">{username}</div> */}
            </>
          ) : (
            ""
          )}
        </div>
        <Menu>
          <MenuButton>
            <Wrap>
              <WrapItem>
                <Avatar name={hospital.name ? hospital.name : doctor.name ? doctor.name : patient.name ? patient.name : ""} src="" />
              </WrapItem>
            </Wrap>
          </MenuButton>
          <MenuList>
            {login ? (
              <MenuItem onClick={logout}>Logout</MenuItem>
            ) : (
              <>
                <Link to={"/patient/login"}>
                  <MenuItem>Patient</MenuItem>
                </Link>
                <Link to={"/doctor/login"}>
                  <MenuItem>Doctor</MenuItem>
                </Link>
                <Link to={"/hospital/login"}>
                  <MenuItem>Hospital</MenuItem>
                </Link>
              </>
            )}
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
  );
};

export default TopNavbar;
