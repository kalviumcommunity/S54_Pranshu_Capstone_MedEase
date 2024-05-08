import {
  Box,
  HStack,
  IconButton,
  Image,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
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
import { AppContext } from "./Context";
import { loginCheck, typeCheck } from "../utils/loginCheck";
import { FaCameraRetro } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

export default function PatientLogin() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { setLogin, setUserType } = useContext(AppContext);
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
        .post("http://localhost:6969/patients/signup", data)
        .then((res) => {
          setCookie("type", "Patient", 10);
          setCookie("auth-token", res.data, 10);
          setCookie("username", data.username, 10);
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
            if (err.response.status == 400) {
              toast.update(toastIdRef.current, {
                title: `Username Exists`,
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
    // <div className="patient-login-container">
    //   <TopNavbar />
    //   <div className="patient-login-body">
    //     <SideNavbar />
    //     <Box flex={1} gap={"5vmax"}>
    //       <div className="form-parent">
    //         <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
    //           <Text as="b" fontSize="2.3vmax">
    //             Welcome
    //           </Text>
    //           <Text as="i" fontSize="1vmax">
    //             Enter the following details!
    //           </Text>
    //           <FormControl>
    //             <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
    //               Name
    //             </FormLabel>
    //             <Input
    //             placeholder="Enter your full name"
    //               type="text"
    //               borderColor="black"
    //               {...register("name", {
    //                 required: "name is required",
    //               })}
    //             />
    //             <p className="err">{errors.name?.message}</p>
    //           </FormControl>
    //           <FormControl>
    //             <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
    //               Username
    //             </FormLabel>
    //             <Input
    //               placeholder="Enter username"
    //               type="text"
    //               borderColor="black"
    //               {...register("username", {
    //                 required: "Username is required",
    //               })}
    //             />
    //             <p className="err">{errors.user?.message}</p>
    //           </FormControl>
    //           <FormControl>
    //             <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
    //               Password
    //             </FormLabel>
    //             <InputGroup>
    //               <Input
    //                 type={show ? "text" : "password"}
    //                 borderColor="black"
    //                 placeholder="Enter password"
    //                 {...register("password", {
    //                   required: "Password Required",
    //                   minLength: {
    //                     value: 8,
    //                     message: "Minimum 8 characters required",
    //                   },
    //                   pattern: {
    //                     value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
    //                     message:
    //                       "Password Not Valid (Use Special Characters & Numbers)",
    //                   },
    //                 })}
    //               />
    //               <InputRightElement width="4.5rem">
    //                 <Button h="1.75rem" size="sm" onClick={handleClick}>
    //                   {show ? "Hide" : "Show"}
    //                 </Button>
    //               </InputRightElement>
    //             </InputGroup>
    //             <p className="err">{errors.password?.message}</p>
    //           </FormControl>

    //           <HStack width={"100%"} gap={"1.5vmin"}>
    //             <FormControl>
    //               <FormLabel fontSize="1vmax" as="i" fontWeight="550">
    //                 Phone no.
    //               </FormLabel>
    //               <Input
    //                 placeholder="Enter phone no."
    //                 type="number"
    //                 borderColor="black"
    //                 {...register("contact.phone", {
    //                   required: "Phone no is required",
    //                   minLength: {
    //                     value: 10,
    //                     message: "Minimum 10 digits required",
    //                   },
    //                   maxLength: {
    //                     value: 10,
    //                     message: "Maximum 10 digits allowed",
    //                   },
    //                 })}
    //               />
    //               <p className="err">{errors.contact?.phone?.message}</p>
    //             </FormControl>
    //             <FormControl>
    //               <FormLabel fontSize="1vmax" as="i" fontWeight="550">
    //                 Email
    //               </FormLabel>
    //               <Input
    //                 placeholder="Enter email"
    //                 type="email"
    //                 borderColor="black"
    //                 {...register("contact.email", {
    //                   required: "Email is required",
    //                 })}
    //               />
    //               <p className="err">{errors.contact?.email?.message}</p>
    //             </FormControl>
    //           </HStack>
    //           <Button type="submit" colorScheme="blue">
    //             Submit
    //           </Button>
    //         </form>
    //       </div>
    //       <Box>
    //         <Link to={"/patient/login"}>
    //           {" "}
    //           <Text decoration={"underline"} cursor={"pointer"} align="center">
    //             Already a user
    //           </Text>
    //         </Link>
    //       </Box>
    //     </Box>
    //   </div>
    // </div>

    <div className="patient-login-container">
      <TopNavbar />
      <div className="patient-login-body">
        <SideNavbar />
        <Box flex={1}  padding={"5vmax"}>
          <div className="form-parent">
            <div className="doc-form-container">
              {/* <div className="curvy-box"></div> */}
              <div className="curvy">
                <div className="get-started">Get Started</div>
                <div className="doc-signup">Patient SignUp</div>
              </div>
              <form className="doc-form-login" onSubmit={handleSubmit(FormSubmitHandler)}>
                <HStack gap={"2vmax"}>
                  <FormControl>
                    <FormLabel
                      fontFamily={"Franklin Gothic Medium"}
                      color={"#7F7F7F"}
                      fontSize="1vmax"
                      fontWeight="400"
                    >
                      Name
                    </FormLabel>
                    <Input
                      placeholder="Enter your full name"
                      type="text"
                      borderColor="black"
                      {...register("name", {
                        required: "Name is required",
                      })}
                    />
                    <p className="err">{errors.name?.message}</p>
                  </FormControl>
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
                      placeholder="Enter email"
                      type="email"
                      borderColor="black"
                      {...register("contact.email", {
                        required: "Email is required",
                      })}
                    />
                    <p className="err">{errors.contact?.email?.message}</p>
                  </FormControl>
                </HStack>
                <HStack gap={"2vmax"}>
                <FormControl>
                  <FormLabel
                    fontFamily={"Franklin Gothic Medium"}
                    color={"#7F7F7F"}
                    fontSize="1vmax"
                    fontWeight="400"
                  >
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
                  <p className="err">{errors.username?.message}</p>
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
                          {/* {show ? "Hide" : "Show"} */}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <p className="err">{errors.password?.message}</p>
                  </FormControl>
                 
                </HStack>
                <FormControl>
                    <FormLabel
                      fontFamily={"Franklin Gothic Medium"}
                      color={"#7F7F7F"}
                      fontSize="1vmax"
                      fontWeight="400"
                    >
                      Phone no.
                    </FormLabel>
                    <Input
                      placeholder="Enter phone no."
                      type="number"
                      borderColor="black"
                      {...register("contact.phone", {
                        required: "Phone no is required",
                        minLength: {
                          value: 10,
                          message: "Minimum 10 digits required",
                        },
                        maxLength: {
                          value: 10,
                          message: "Maximum 10 digits allowed",
                        },
                      })}
                    />
                    <p className="err">{errors.contact?.phone?.message}</p>
                  </FormControl>



                <HStack
                  justifyContent={"space-between"}
                  alignItems={"flex-end"}
                >
                  <HStack>
                    <FormControl>
                      <FormLabel
                        fontFamily={"Franklin Gothic Medium"}
                        color={"#7F7F7F"}
                        fontSize="1vmax"
                        fontWeight="400"
                      >
                        Profile photo
                      </FormLabel>
                      {/* <Input
                  placeholder="Enter your profle photo"
                  type="text"
                  borderColor="black"
                  {...register("image", {
                    required: "Photo is required",
                  })}
                  />
                <p className="err">{errors.image?.message}</p> */}
                      <Button
                        leftIcon={<FaCameraRetro />}
                        variant="outline"
                        colorScheme="blue"
                      >
                        Upload
                      </Button>
                    </FormControl>
                  </HStack>
                  <HStack gap={"3vmax"}>
                    <Link to={"/patient/login"}>
                      <Button variant="link" colorScheme="blue">
                        Already Registered?
                      </Button>
                    </Link>
                    <Button type="submit" colorScheme="blue">
                      Submit
                    </Button>
                  </HStack>
                </HStack>
              </form>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
