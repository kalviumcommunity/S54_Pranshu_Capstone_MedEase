import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import doc1 from "../assets/images/doc1.png";
import token from "../assets/images/token.png";
import doc2 from "../assets/images/doc2.png";
import { CiBookmarkPlus } from "react-icons/ci";
import { SideNavbar } from "./SideNavbar";
import { Link, useNavigate } from "react-router-dom";
import TopNavbar from "./TopNavbar";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <TopNavbar/>
      <div className="body">
        <SideNavbar />
        <div className="content">
          <HStack gap={"5vmax"}>
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
            <Box>
              <div className="token-img">
                <Image width={"17.708vmax"} height={"17.708vmax"} src={token} />
                <div className="token-abs">
                  <div className="your">Your Token No.</div>
                  <div className="token-no">24</div>
                </div>
              </div>
            </Box>
          </HStack>
          <Stack width={"82vmax"} display={"flex"}>
            <HStack gap={"12vmax"}>
              <Box>
                <div className="doctors">Doctors</div>
                <div className="nearest-doc">Nearest Doctors</div>
              </Box>
              <Box>
                {/* <div className="view-all-doc">View All Doctors</div> */}
                <Button
                  borderRadius={"20px"}
                  size={"sm"}
                  width={"10vmax"}
                  color={"#1479ff"}
                  fontSize={"0.972vmax"}
                >
                  View All Doctors
                </Button>
              </Box>
            </HStack>
            <div className="all-top-docs">
              <div className="all-doctors">
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"centre"}
                  padding={"2vmax 0 0 2vmax"}
                >
                  <Image
                    src="https://imagesx.practo.com/providers/dr-baswaraj-biradar-implantologist-bangalore-80eb5bcb-3960-4f8f-83b3-cb17cc4ea51e.jpg?i_type=t_70x70-2x-webp"
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
                  padding={"1.5vmax 2vmax 2vmax 2vmax"}
                >
                  <div className="doc-details">
                    <div className="doc-name">Dr. AK Singh</div>
                    <div className="doc-category">
                      ophthalmologist, AIIMS Delhi
                    </div>
                  </div>
                  <div className="doc-description">
                    Lorem ipsum dolor sit amet consectetur. Vel turpis morbi
                    aliquet aliquet pellentesque at. Neque consequat auctor
                    dictumst
                  </div>

                  <HStack gap={"2vmax"} className="doc-book">
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

              <div className="all-doctors">
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"centre"}
                  padding={"2vmax 0 0 2vmax"}
                >
                  <Image
                    src="https://imagesx.practo.com/providers/dr-yatin-kukreja-general-physician-delhi-b56d6a5a-73d2-4384-b955-8d84b25bb6fb.jpg?i_type=t_70x70-2x-webp"
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
                  padding={"1.5vmax 2vmax 2vmax 2vmax"}
                >
                  <div className="doc-details">
                    <div className="doc-name">Dr. Yatin Kukreja</div>
                    <div className="doc-category">
                      ophthalmologist, AIIMS Delhi
                    </div>
                  </div>
                  <div className="doc-description">
                    Lorem ipsum dolor sit amet consectetur. Vel turpis morbi
                    aliquet aliquet pellentesque at. Neque consequat auctor
                    dictumst
                  </div>

                  <HStack gap={"2vmax"} className="doc-book">
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

              <div className="all-doctors">
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"centre"}
                  padding={"2vmax 0 0 2vmax"}
                >
                  <Image
                    src="https://imagesx.practo.com/providers/dr-bimal-kumar-dubey-general-physician-delhi-a05e848e-1fc1-465a-8c64-c74926cf037a.jpg?i_type=t_70x70-2x-webp"
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
                  padding={"1.5vmax 2vmax 2vmax 2vmax"}
                >
                  <div className="doc-details">
                    <div className="doc-name">Dr. Bimal Kumar</div>
                    <div className="doc-category">
                      ophthalmologist, AIIMS Delhi
                    </div>
                  </div>
                  <div className="doc-description">
                    Lorem ipsum dolor sit amet consectetur. Vel turpis morbi
                    aliquet aliquet pellentesque at. Neque consequat auctor
                    dictumst
                  </div>

                  <HStack gap={"2vmax"} className="doc-book">
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
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Home;
