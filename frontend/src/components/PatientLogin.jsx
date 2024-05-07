import { Box, HStack, Image, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import patientlogin from "../assets/images/patient-login.jpg";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SideNavbar } from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import { setCookie } from "../utils/cookie";
import { loginCheck, typeCheck } from "../utils/loginCheck";
import { AppContext } from "./Context";

export default function PatientLogin() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const {setLogin,setUserType} = useContext(AppContext)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // console.log(watch())
  const toast = useToast();
  const toastIdRef = React.useRef();
  const FormSubmitHandler = (data) => {
    toastIdRef.current = toast({
      title: `Signing Up`,
      status: "loading",
      isClosable: false,
    });
    setTimeout(() => {
      axios
        .post("http://localhost:6969/patients/signin", data)
        .then((res) => {
          setCookie("type","Patient",10)
          setCookie("auth-token", res.data, 10);
          setCookie("username", data.username, 10);
          setLogin(loginCheck())
          setUserType(typeCheck())
          toast.update(toastIdRef.current, {
            title: `Signed Up`,
            status: "success",
            isClosable: false,
          });
          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            if (err.response.status == 404) {
              toast.update(toastIdRef.current, {
                title: `Username not found`,
                status: "error",
                isClosable: false,
              });
            }  
            else if(err.response.status == 401){
              toast.update(toastIdRef.current, {
                title: `Wrong Password`,
                status: "error",
                isClosable: false,
              });
            }
            else {
              toast.update(toastIdRef.current, {
                title: `Server Error! Contact Admin`,
                status: "error",
                isClosable: false,
              });
            }
          } else {
            toast.update(toastIdRef.current, {
              title: `Server Error! Contact Admin`,
              status: "error",
              isClosable: false,
            });
          }
        });
    }, 1200);
  };
  return (
    <div className="patient-login-container">
      <TopNavbar />
      <div className="patient-login-body">
        <SideNavbar />
        <Box flex={1}>

          <div className="form-parent">
            <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
              <Text as="b" fontSize="2.3vmax">
                Welcome back
              </Text>
              <Text as="i" fontSize="1vmax">
                Enter the following details!
              </Text>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Username
                </FormLabel>
                <Input
                placeholder="Enter username"
                  type="text"
                  borderColor="black"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                <p className="err">{errors.user?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    borderColor="black"
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Password Required",
                      minLength: {
                        value: 8,
                        message: "Minimum 8 characters required",
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password Not Valid (Use Special Characters & Numbers)",
                      },
                    })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <p className="err">{errors.password?.message}</p>
              </FormControl>
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </form>
          </div>
        <Box>
         <Link to={"/patient/signup"}> <Text decoration={"underline"} cursor={"pointer"} align="center">Not registered yet? Sign up</Text></Link>
        </Box>
        </Box>
      </div>
    </div>

  );
}
