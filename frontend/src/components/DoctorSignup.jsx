import {
  Box,
  HStack,
  IconButton,
  Image,
  InputGroup,
  InputRightElement,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import patientlogin from "../assets/images/patient-login.jpg";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SideNavbar } from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import { AppContext } from "./Context";
import { setCookie } from "../utils/cookie";
import { loginCheck, typeCheck } from "../utils/loginCheck";
import { FaCameraRetro } from "react-icons/fa";
import { LuCamera } from "react-icons/lu";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

export default function DoctorSignup() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
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
  const { setLogin, setUserType } = useContext(AppContext);

  useEffect(() => {
    axios
      .get("http://localhost:6969/hospitals")
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
        .post("http://localhost:6969/doctors/signup", data)
        .then((res) => {
          setCookie("type", "Doctor", 10);
          setCookie("auth-token", res.data, 10);
          setCookie("email", data.contact.email, 10);
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
                title: `Email Exists`,
                status: "error",
                isClosable: false,
              });
            } else if (err.response.status == 404) {
              toast.update(toastIdRef.current, {
                title: `Hospital not found`,
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
        <Box flex={1}>
          <div className="form-parent">
            <div className="doc-form-container">
              {/* <div className="curvy-box"></div> */}
              <div className="curvy">
                <div className="get-started">Get Started</div>
                <div className="doc-signup">Doctor SignUp</div>
              </div>
              <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
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
                </HStack>
                <HStack gap={"2vmax"}>
                  <FormControl>
                    <FormLabel
                      fontFamily={"Franklin Gothic Medium"}
                      color={"#7F7F7F"}
                      fontSize="1vmax"
                      fontWeight="400"
                    >
                      Qualifications
                    </FormLabel>
                    <Input
                      placeholder="for ex:- MBBS"
                      type="text"
                      borderColor="black"
                      {...register("degree", {
                        required: "Qualification is required",
                      })}
                    />
                    <p className="err">{errors.degree?.message}</p>
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      fontFamily={"Franklin Gothic Medium"}
                      color={"#7F7F7F"}
                      fontSize="1vmax"
                      fontWeight="400"
                    >
                      Hospital
                    </FormLabel>

                    <Select
                      placeholder="Select Hospital"
                      borderColor={"black"}
                      {...register("hospital", {
                        required: "Hospital is required",
                      })}
                    >
                      {hospital.map((e, i) => {
                        return (
                          <option
                            style={{ color: "black" }}
                            key={i}
                            value={e.name}
                          >
                            {e.name}
                          </option>
                        );
                      })}
                    </Select>
                    <p className="err">{errors.hospital?.message}</p>
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel
                    fontFamily={"Franklin Gothic Medium"}
                    color={"#7F7F7F"}
                    fontSize="1vmax"
                    fontWeight="400"
                  >
                    Speciality
                  </FormLabel>
                  <Input
                    placeholder="for ex:- surgeon"
                    type="text"
                    borderColor="black"
                    {...register("speciality", {
                      required: "Speciality is required",
                    })}
                  />
                  <p className="err">{errors.speciality?.message}</p>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontFamily={"Franklin Gothic Medium"}
                    color={"#7F7F7F"}
                    fontSize="1vmax"
                    fontWeight="400"
                  >
                    Bio
                  </FormLabel>
                  <Textarea
                    placeholder="Brief description of yourself"
                    type="text"
                    borderColor="black"
                    {...register("bio", {
                      required: "Bio is required",
                    })}
                  />
                  <p className="err">{errors.bio?.message}</p>
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
                    type=""
                    borderColor="black"
                    {...register("image", {
                      required: "Photo is required",
                    })}
                    /> */}
                      {/* <p className="err">{errors.image?.message}</p> */}
                      <Button
                        leftIcon={<FaCameraRetro />}
                        variant="outline"
                        colorScheme="blue"
                      >
                        Upload

                      </Button>
                      {/* <Input
                        type="file"
                        accept="image/*"
                        id="img"
                        onChange={(e) => {
                          setImg((prev) => e.target.files[0]);
                          console.log(img);
                        }}
                      /> */}
                    </FormControl>
                  </HStack>
                  <HStack gap={"3vmax"}>
                    <Link to={"/doctor/login"}>
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
