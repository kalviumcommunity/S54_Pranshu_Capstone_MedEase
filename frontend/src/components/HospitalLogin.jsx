import {
  Box,
  HStack,
  IconButton,
  Image,
  InputGroup,
  InputRightElement,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import patientlogin from "../assets/images/patient-login.jpg";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SideNavbar } from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import { loginCheck, typeCheck } from "../utils/loginCheck";
import { setCookie } from "../utils/cookie";
import { AppContext } from "./Context";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

export default function HospitalLogin() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { setLogin, setUserType } = useContext(AppContext);
  const navigate = useNavigate();
  const [hospital, seHospitals] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // console.log(watch())

  useEffect(() => {
    axios
      .get("https://medease-ez-backend.vercel.app/hospitals")
      .then((res) => {
        seHospitals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
        .post("https://medease-ez-backend.vercel.app/hospitals/signin", data)
        .then((res) => {
          setCookie("type", "Hospital", 10);
          setCookie("auth-token", res.data, 10);
          setCookie("email", data.email, 10);
          setLogin(loginCheck());
          setUserType(typeCheck());
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
                title: `Email not found`,
                status: "error",
                isClosable: false,
              });
            } else if (err.response.status == 401) {
              toast.update(toastIdRef.current, {
                title: `Wrong Password`,
                status: "error",
                isClosable: false,
              });
            } else {
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
        <Box flex={1}  width={"100%"} padding={["2vmax","5vmax 8vmax","5vmax 10vmax", "5vmax"]}>
          <div className="form-parent">
            <div className="doc-form-container">
              <div className="curvy">
                <div className="get-started">Welcome back</div>
                <div className="doc-signup">Hospital Login</div>
              </div>
              <form
                className="doc-form-login"
                onSubmit={handleSubmit(FormSubmitHandler)}
              >
                <FormControl>
                  <FormLabel
                    fontFamily={"Franklin Gothic Medium"}
                    color={"#7F7F7F"}
                    fontSize="1vmax"
                    fontWeight="400"
                  >
                    Email
                  </FormLabel>
                  <Input
                    size={["sm", "sm", "md"]}
                    placeholder="Enter email"
                    type="email"
                    borderColor="black"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  <p className="err">{errors.email?.message}</p>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontFamily={"Franklin Gothic Medium"}
                    color={"#7F7F7F"}
                    fontSize="1vmax"
                    fontWeight="400"
                  >
                    Password
                  </FormLabel>
                  <InputGroup size={["sm", "sm", "md"]}>
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
                          value:
                            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "Password Not Valid (Use Special Characters & Numbers)",
                        },
                      })}
                    />
                    <InputRightElement width="3rem">
                      <Button
                        background={"transparent"}
                        as={IconButton}
                        icon={show ? <FaRegEye /> : <FaEyeSlash />}
                        size="sm"
                        onClick={handleClick}
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <p className="err">{errors.password?.message}</p>
                </FormControl>
                <HStack>
                  <Button
                    size={["sm", "sm", "md"]}
                    variant={"link"}
                    colorScheme="blue"
                  >
                    Forgot Your Password?
                  </Button>
                </HStack>
                <HStack justifyContent={"center"} gap={"3vmax"}>
                  <Button
                    type="submit"
                    size={["sm", "sm", "md"]}
                    colorScheme="blue"
                  >
                    Submit
                  </Button>
                  <Link to={"/hospital/signup"}>
                    <Button
                      size={["sm", "sm", "md"]}
                      variant={"outline"}
                      colorScheme="blue"
                    >
                      New Here?
                    </Button>
                  </Link>
                </HStack>
              </form>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
