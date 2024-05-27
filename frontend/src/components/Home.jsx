import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Hide,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import doc1 from "../assets/images/doc1.png";
import token from "../assets/images/token.png";
import doc2 from "../assets/images/doc2.png";
import { CiBookmarkPlus } from "react-icons/ci";
import { SideNavbar } from "./SideNavbar";
import { Link, useNavigate } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import axios from "axios";
import { MdOutlineCategory } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";

const Home = () => {
  const [doctor, setDoctor] = useState([]);
  const [hospital, setHospital] = useState([]);
  const [speciality, setSpeciality] = useState([]);

  useEffect(() => {
    axios
      .get("https://medease-ez-backend.vercel.app/hospitals")
      .then((res) => {
        setHospital(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://medease-ez-backend.vercel.app/doctors")
      .then((res) => {
        setDoctor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const uniqueSpecialities = [];
    doctor.forEach((e) => {
      if (!uniqueSpecialities.includes(e.speciality)) {
        uniqueSpecialities.push(e.speciality);
      }
    });
    setSpeciality(uniqueSpecialities);
    console.log(uniqueSpecialities);
  }, [doctor]);
  console.log("speciality", speciality);
  console.log(hospital);
  const navigate = useNavigate();
  return (
    <div className="container">
      <TopNavbar />
      <div className="body">
        <SideNavbar />
        <div className="content">
          <HStack
            gap={["3vmax", "3vmax", "5vmax"]}
            justifyContent={{ base: "center", md: "initial" }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              padding={"0 3.5vmin"}
              width={"54.264vmax"}
              height={"18vmax"}
              borderRadius={"17px"}
              background={"linear-gradient(270deg, #80B5FB 0%, #1479FF 100%)"}
            >
              <div className="showImg-text">
                <span>Book Your Health</span> <span>Hassle Free</span>
              </div>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"flex-end"}
              >
                <Image height={"16.2vmax"} src={doc1} alt="Doctor" />
              </Box>
            </Box>
            <Hide below="sm">
              <Box>
                <div className="token-img">
                  <Image
                    width={"17.708vmax"}
                    height={"17.708vmax"}
                    src={token}
                  />
                  <div className="token-abs">
                    <div className="your">Your Token No.</div>
                    <div className="token-no">24</div>
                  </div>
                </div>
              </Box>
            </Hide>
          </HStack>
          <Stack width={["100%", "100%", "100%", "82vw"]} display={"flex"}>
            <HStack width={"100%"} gap={"12vmax"}>
              <Box>
                <div className="doctors">Doctors</div>
                <div className="nearest-doc">Nearest Doctors</div>
              </Box>
              <Box>
                {/* <div className="view-all-doc">View All Doctors</div> */}
                <Button
                  borderRadius={"20px"}
                  size={["xs", "xs", "sm"]}
                  // width={"10vmax"}
                  color={"#1479ff"}
                  fontSize={"0.972vmax"}
                >
                  View All Doctors
                </Button>
              </Box>
            </HStack>
            <div className="all-top-docs">
              {doctor.map((e) => {
                return (
                  <div key={e._id} className="all-doctors">
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      padding={"2vmax 0 0 2vmax"}
                    >
                      <Image
                        src={e.image}
                        width={"12vmax"}
                        height={"12vmax"}
                        borderRadius={"50%"}
                      />
                    </Box>

                    <Box
                      display={"flex"}
                      flex={"1"}
                      flexDirection={"column"}
                      gap={"2vmax"}
                      padding={"1.5vmax 2vmax 1vmax 2vmax"}
                    >
                      <div className="doc-details">
                        <div className="doc-name">Dr. {e.name}</div>
                        <div className="doc-category">
                          {e.speciality}, {e.hospital.name} -{" "}
                          {e.hospital.location}
                        </div>
                      </div>
                      <div className="doc-description">
                        {/* Lorem ipsum dolor sit amet consectetur. Vel turpis morbi
                    aliquet aliquet pellentesque at. Neque consequat auctor
                    dictumst */}

                        {e.bio.length > 123
                          ? e.bio.substr(0, 123) + "..."
                          : e.bio}
                      </div>

                      <HStack
                        gap={"2vmax"}
                        flex={1}
                        alignItems={"flex-end"}
                        className="doc-book"
                      >
                        <Button
                          colorScheme="blue"
                          borderRadius={"33px"}
                          size={["xs", "xs", "xs", "sm"]}
                          width={"12vmax"}
                        >
                          Book Now
                        </Button>
                        <Button
                          as={IconButton}
                          size={["xs", "xs", "xs", "sm"]}
                          borderRadius={"33px"}
                          icon={
                            <CiBookmarkPlus
                              color="#1479FF"
                              width={"1.7vmax"}
                              height={"1.7vmax"}
                              size={"1.3vmax"}
                            />
                          }
                        ></Button>
                      </HStack>
                    </Box>
                  </div>
                );
              })}
            </div>
          </Stack>

          <Stack width={["100%", "100%", "100%", "82vw"]} display={"flex"}>
            <HStack width={"100%"} gap={"9vmax"}>
              <Box>
                <div className="doctors">Categories</div>
                <div className="nearest-doc">Doctors</div>
              </Box>
              <Box>
                {/* <div className="view-all-doc">View All Doctors</div> */}
                <Button
                  borderRadius={"20px"}
                  size={["xs", "xs", "sm"]}
                  // width={"10vmax"}
                  color={"#1479ff"}
                  fontSize={"0.972vmax"}
                >
                  View All categories
                </Button>
              </Box>
            </HStack>
            <div className="all-top-docs">
              {speciality.map((e, i) => {
                return (
                  <div key={i} className="all-categories">
                    <Button
                      leftIcon={<FaUserDoctor />}
                      borderRadius={"20px"}
                      size={"md"}
                      // width={"10vmax"}
                      colorScheme="white"
                      color={"#3182CE"}
                    >
                      {e}
                    </Button>
                  </div>
                );
              })}
            </div>
          </Stack>

          <Stack width={["100%", "100%", "100%", "82vw"]} display={"flex"}>
            <HStack width={"100%"} gap={"10vmax"}>
              <Box>
                <div className="doctors">Hospitals</div>
                <div className="nearest-doc">Nearest Hospitals</div>
              </Box>
              <Box>
                {/* <div className="view-all-doc">View All Doctors</div> */}
                <Button
                  borderRadius={"20px"}
                  size={["xs", "xs", "sm"]}
                  // width={"10vmax"}
                  color={"#1479ff"}
                  fontSize={"0.972vmax"}
                >
                  View All Hospitals
                </Button>
              </Box>
            </HStack>
            <div className="all-top-docs">
              {hospital.map((e) => {
                return (
                  <div key={e._id} className="all-hospitals">
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      flexShrink={0}
                      padding={"1vmax 0 1vmax 1vmax"}
                    >
                      <Image
                        borderRadius={"7px"}
                        src={e.image}
                        width={"12vmax"}
                        height={"100%"}
                      />
                    </Box>

                    <Box
                      display={"flex"}
                      flex={"1"}
                      flexDirection={"column"}
                      gap={"1.5vmax"}
                      padding={"1.5vmax 2vmax 1vmax 2vmax"}
                    >
                      <Stack spacing={4}>
                        <div className="doc-details">
                          <div className="doc-name">{e.name}</div>
                          <div className="doc-category">{e.location}</div>
                        </div>

                        <HStack
                          spacing={2}
                          flexWrap={"wrap"}
                          height={{ base: "5vmax", md: "4vmax" }}

                          alignItems={"flex-start"}
                          overflowY={"scroll"}
                        >
                          {e.specialization.map((s, i) => {
                            return (
                              <Tag
                                size="sm"
                                key={i}
                                backgroundColor={"#EBF4FF"}
                                color={"#3182CE"}
                              >
                                {s}
                              </Tag>
                            );
                          })}
                        </HStack>
                      </Stack>

                      <HStack
                        gap={"2vmax"}
                        flex={1}
                        alignItems={"flex-end"}
                        className="doc-book"
                      >
                        <Button
                          colorScheme="blue"
                          borderRadius={"33px"}
                          size={["xs", "xs", "xs", "sm"]}
                          width={"12vmax"}
                        >
                          View Details
                        </Button>
                        <Button
                          as={IconButton}
                          size={["xs", "xs", "xs", "sm"]}
                          borderRadius={"33px"}
                          icon={
                            <CiBookmarkPlus
                              color="#1479FF"
                              width={"1.7vmax"}
                              height={"1.7vmax"}
                              size={"1.3vmax"}
                            />
                          }
                        ></Button>
                      </HStack>
                    </Box>
                  </div>
                );
              })}
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Home;
