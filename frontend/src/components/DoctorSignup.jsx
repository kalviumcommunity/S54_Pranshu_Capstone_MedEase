import { Box, HStack, Image, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import patientlogin from "../assets/images/patient-login.jpg";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SideNavbar } from "./SideNavbar";
import TopNavbar from "./TopNavbar";

export default function DoctorSignup() {
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
      .get("http://localhost:6969/hospitals")
      .then((res) => {
        seHospitals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const FormSubmitHandler = (data) => {
    axios
      .post("http://localhost:6969/doctors/signup", data)
      .then((res) => {
        console.log(res.data);
        console.log("ADDED");
        navigate("");
      })
      .catch((err) => {
        console.log(err);
      });
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
                  Name
                </FormLabel>
                <Input
                  type="text"
                  borderColor="black"
                  {...register("name", {
                    required: "name is required",
                  })}
                />
                <p className="err">{errors.name?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Username
                </FormLabel>
                <Input
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
                <Input
                  type="password"
                  borderColor="black"
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
                <p className="err">{errors.password?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Qualifications
                </FormLabel>
                <Input
                  type="text"
                  borderColor="black"
                  {...register("degree", {
                    required: "Qualification is required",
                  })}
                />
                <p className="err">{errors.degree?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  speciality
                </FormLabel>
                <Input
                  type="text"
                  borderColor="black"
                  {...register("speciality", {
                    required: "speciality is required",
                  })}
                />
                <p className="err">{errors.speciality?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
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
                      <option style={{ color: "black" }} key={i} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </Select>
                <p className="err">{errors.hospital?.message}</p>
              </FormControl>
              <HStack width={"100%"} gap={"1.5vmin"}>
                <FormControl>
                  <FormLabel fontSize="1vmax" as="i" fontWeight="550">
                    Phone no.
                  </FormLabel>
                  <Input
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
                <FormControl>
                  <FormLabel fontSize="1vmax" as="i" fontWeight="550">
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    borderColor="black"
                    {...register("contact.email", {
                      required: "Email is required",
                    })}
                  />
                  <p className="err">{errors.contact?.email?.message}</p>
                </FormControl>
              </HStack>
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </form>
          </div>
          <Box>
            <Link to={"/doctor/login"}>
              {" "}
              <Text decoration={"underline"} cursor={"pointer"} align="center">
                Already registered
              </Text>
            </Link>
          </Box>
        </Box>
      </div>
    </div>
  );
}
