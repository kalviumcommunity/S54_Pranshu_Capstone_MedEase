import React, { useEffect, useState } from "react";
import TopNavbar from "./TopNavbar";
import { SideNavbar } from "./SideNavbar";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FaUserDoctor } from "react-icons/fa6";
import { CiBookmarkPlus } from "react-icons/ci";

import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";

const AllDoc = () => {
  const [doctor,setDoctor] = useState([])
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

  return (
    <div className="all-doc-container">
      <TopNavbar />
      <div className="all-doc-body">
        <SideNavbar />
        <Box flex={1} width={"100%"} padding={"2vmax 7vmax 0 7vmax"}>
          <HStack justifyContent={"space-between"} padding={"0 2vmax"}>
            <div className="all-doctors-text">
              <FaUserDoctor />
              All Doctors
            </div>
            <Box>
              <InputGroup
                borderRadius={"13px"}
                backgroundColor={"#F3F3F3"}
                width={"30vmax"}
              >
                <InputLeftElement pointerEvents="none">
                  <IoSearchOutline color="#7F7F7F" />
                </InputLeftElement>
                <Input
                  borderRadius={"13px"}
                  type="tel"
                  placeholder="Search for Doctors"
                />
              </InputGroup>
            </Box>
          </HStack>
          <Box>
            <SimpleGrid columns={["1","2"]} spacing={10} padding={"3vmax 0 0 0"}>
            {doctor.map((e) => {
                return (
                  <div key={e._id} className="all-2-doctors">
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
            </SimpleGrid>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AllDoc;
