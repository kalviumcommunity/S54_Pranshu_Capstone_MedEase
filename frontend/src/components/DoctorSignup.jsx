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
import { AppContext } from "./Context";
import { setCookie } from "../utils/cookie";
import { loginCheck, typeCheck } from "../utils/loginCheck";
import { FaCameraRetro } from "react-icons/fa";
import { LuCamera } from "react-icons/lu";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import app from "../firebase";

export default function DoctorSignup() {
  const inputRef = useRef(null);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const [hospital, seHospitals] = useState([]);
  const [img, setImg] = useState(undefined);
  const [imgPer, setImgPer] = useState(0);
  const [input, setInput] = useState({});
  const [imageError, setImageError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  // console.log(watch())
  const { setLogin, setUserType } = useContext(AppContext);

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
          setImageError("");
        });
      }
    );
  };
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
    // data.image = input.imgUrl;
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
        .post("https://medease-ez-backend.vercel.app/doctors/signup", data)
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
        <Box flex={1} width={"100%"} padding={["2vmax", "5vmax", "5vmax", "0"]}>
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
                      size={["sm", "sm", "md"]}
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
                      <InputRightElement size={["sm", "sm", "md"]} width="3rem">
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
                      size={["sm", "sm", "md"]}
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
                      size={["sm", "sm", "md"]}
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
                    size={["sm", "sm", "md"]}
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
                    size={["sm", "sm", "md"]}
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
                      <HStack>
                        <Button
                      size={["xs", "xs","sm" ,"md"]}


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
                            {imgPer} %
                          </span>
                        )}
                      </HStack>
                      {imageError && <p className="err">{imageError}</p>}
                    </FormControl>
                  </HStack>
                  <HStack gap={"3vmax"}>
                    <Link to={"/doctor/login"}>
                      <Button
                      size={["xs", "xs","sm" ,"md"]}


                        variant="link"
                        colorScheme="blue"
                      >
                        Already Registered?
                      </Button>
                    </Link>
                    <Button
                      size={["xs", "xs","sm" ,"md"]}

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
