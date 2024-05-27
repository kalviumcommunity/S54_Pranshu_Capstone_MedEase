import {
  Box,
  HStack,
  IconButton,
  Image,
  InputGroup,
  InputRightElement,
  Select,
  useToast,
  Tag,
  TagLabel,
  TagCloseButton,
  VStack,
  Stack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import { loginCheck, typeCheck } from "../utils/loginCheck";
import { AppContext } from "./Context";
import { setCookie } from "../utils/cookie";
import { FaCameraRetro } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import app from "../firebase";

export default function HospitalSignup() {
  const inputRef = useRef(null);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { setLogin, setUserType } = useContext(AppContext);
  const navigate = useNavigate();
  const [hospital, seHospitals] = useState([]);
  const [img, setImg] = useState(undefined);
  const [imgPer, setImgPer] = useState(0);
  const [input, setInput] = useState({});
  const [imageError, setImageError] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleClickUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPer(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValue("image", downloadURL);
          setImageError("");
        });
      }
    );
  };

  const toast = useToast();
  const toastIdRef = React.useRef();
  const FormSubmitHandler = (data) => {
    if (!data.image) {
      setImageError("Image is required");
      return;
    }

    toastIdRef.current = toast({
      title: `Signing Up`,
      status: "loading",
      isClosable: false,
    });
    setTimeout(() => {
      axios
        .post("https://medease-ez-backend.vercel.app/hospitals/signup", data)
        .then((res) => {
          setCookie("type", "Hospital", 10);
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
          if (err.response) {
            if (err.response.status === 400) {
              toast.update(toastIdRef.current, {
                title: `Hospital with this email Exists`,
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

  const handleSpecializationChange = (e) => {
    const value = e.target.value;
    const specializationsArray = value.split(/[\s,]+/).filter(Boolean);
    setSpecializations(specializationsArray);
  };
  console.log(specializations);
  return (
    <div className="patient-login-container">
      <TopNavbar />
      <div className="patient-login-body">
        <SideNavbar />
        <Box flex={1} width={"100%"} padding={["2vmax", "5vmax", "5vmax", "0"]}>
          <div className="form-parent">
            <div className="doc-form-container">
              <div className="curvy">
                <div className="get-started">Get Started</div>
                <div className="doc-signup">Hospital SignUp</div>
              </div>
              <form
                className="doc-form-login"
                onSubmit={handleSubmit(FormSubmitHandler)}
              >
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
                      size={["sm", "sm", "md"]}
                      placeholder="Enter hospital's name"
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
                      size={["sm", "sm", "md"]}
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
                      <InputRightElement
                        size={["xs", "sm", "md"]}
                        width={"3rem"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        // height={{ base: "4vmax", md: "3vmax" }}
                      >
                        <Button
                          background={"transparent"}
                          as={IconButton}
                          icon={show ? <FaRegEye /> : <FaEyeSlash />}
                          size={["xs", "xs", "md"]}
                          onClick={handleClick}
                        />
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
                      size={["sm", "sm", "md"]}
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
                <FormControl>
                  <FormLabel
                    fontFamily={"Franklin Gothic Medium"}
                    color={"#7F7F7F"}
                    fontSize="1vmax"
                    fontWeight="400"
                  >
                    Location
                  </FormLabel>
                  <Input
                    size={["sm", "sm", "md"]}
                    placeholder="for ex:- Ansari Nagar - New Delhi"
                    type="text"
                    borderColor="black"
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                  <p className="err">{errors.location?.message}</p>
                </FormControl>
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel
                      fontFamily={"Franklin Gothic Medium"}
                      color={"#7F7F7F"}
                      fontSize="1vmax"
                      fontWeight="400"
                    >
                      Specializations
                    </FormLabel>
                    <Input
                      size={["sm", "sm", "md"]}
                      placeholder="for ex:- Dermatology , Ophthalmology , Cardiology"
                      type="text"
                      borderColor="black"
                      {...register("specialization", {
                        required: "Specialization is required",
                        onChange: handleSpecializationChange,
                      })}
                    />
                    <p className="err">{errors.specialization?.message}</p>
                  </FormControl>
                  <HStack>
                    {specializations.map((size, index) => (
                      <Tag
                        size="md"
                        key={index}
                        borderRadius="full"
                        variant="solid"
                        colorScheme="blue"
                      >
                        <TagLabel>{size}</TagLabel>
                        <TagCloseButton
                          onClick={() => {
                            const updatedSpecializations =
                              specializations.filter((item, i) => i !== index);
                            setSpecializations(updatedSpecializations);
                          }}
                        />
                      </Tag>
                    ))}
                  </HStack>
                </Stack>

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
                        Hospital image
                      </FormLabel>
                      <HStack>
                        <Button
                          size={["xs", "xs", "sm", "md"]}
                          leftIcon={<FaCameraRetro />}
                          variant="outline"
                          colorScheme="blue"
                          onClick={handleClickUpload}
                        >
                          Upload
                        </Button>
                        <Input
                          ref={inputRef}
                          type="file"
                          accept="image/*"
                          id="img"
                          onChange={handleFileChange}
                        />
                        {imgPer > 0 && (
                          <span className="uploading">{imgPer} %</span>
                        )}
                      </HStack>
                      {imageError && <p className="err">{imageError}</p>}
                    </FormControl>
                  </HStack>
                  <HStack gap={["1vmax", "3vmax"]}>
                    <Link to={"/hospital/login"}>
                      <Button
                        size={["xs", "xs", "sm", "md"]}
                        variant="link"
                        colorScheme="blue"
                      >
                        Already Registered?
                      </Button>
                    </Link>
                    <Button
                      size={["xs", "xs", "sm", "md"]}
                      type="submit"
                      colorScheme="blue"
                    >
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
