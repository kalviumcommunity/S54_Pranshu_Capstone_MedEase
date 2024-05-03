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

export default function HospitalLogin() {
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
      .post("http://localhost:6969/hospitals/signin", data)
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
                  <FormLabel fontSize="1vmax" as="i" fontWeight="550">
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    borderColor="black"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  <p className="err">{errors.email?.message}</p>
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
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </form>
          </div>
          <Box>
            <Link to={"/hospital/signup"}>
              {" "}
              <Text decoration={"underline"} cursor={"pointer"} align="center">
                Not registered
              </Text>
            </Link>
          </Box>
        </Box>
      </div>
    </div>
  );
}
