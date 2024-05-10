import {
  Box,
  HStack,
  IconButton,
  Image,
  InputGroup,
  InputRightElement,
  useToast,
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
import { setCookie } from "../utils/cookie";
import { AppContext } from "./Context";
import { loginCheck, typeCheck } from "../utils/loginCheck";
import { FaCameraRetro } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import app from "../firebase";

export default function PatientLogin() {
  const inputRef = useRef(null);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { setLogin, setUserType } = useContext(AppContext);
  const navigate = useNavigate();
  const [img, setImg] = useState(undefined);
  const [imgPer, setImgPer] = useState(0);
  const [input, setInput] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  // console.log(watch())

  const handleClickUpload = () => {
    // Trigger click event on hidden file input
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    // Set selected image file
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
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPer(Math.round(progress));
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          // setInput((prev) => {
          //   return {
          //     ...prev,
          //     [fileType]: downloadURL,
          //   };
          // });
          setValue("image", downloadURL);
        });
      }
    );
  };

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
    <div className="patient-login-container">
      <TopNavbar />
      <div className="patient-login-body">
        <SideNavbar />
        <Box flex={1} padding={"5vmax"}>
          <div className="form-parent">
            <div className="doc-form-container">
              <div className="curvy">
                <div className="get-started">Get Started</div>
                <div className="doc-signup">Patient SignUp</div>
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
                      <HStack>
                        <Button
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
                          <span className="uploading">
                            Uploading:{imgPer} %
                          </span>
                        )}
                      </HStack>
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
