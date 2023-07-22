import {
    Box,
    SimpleGrid,
    Text,
    Container,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Button,
    Textarea,
    HStack,
    Spinner,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    useDisclosure,
    Spacer,
    useToast,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Avatar,
    AvatarBadge,
    AvatarGroup,
    useMediaQuery,
    IconButton
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import { BsGraphUp } from "react-icons/bs";
import { AiOutlineBook, AiOutlineAlert, AiOutlineHistory } from "react-icons/ai";

function getGreetingBasedOnTime() {
    const currentHour = new Date().getHours();
    if (currentHour >= 1 && currentHour < 12) {
        return "Morning";
    } else if (currentHour >= 12 && currentHour < 19) {
        return "Afternoon";
    } else if (currentHour >= 19) {
        return "Evening";
    } else {
        return "Night";
    }
}

function getCurrentFormattedDate() {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();
  
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    return formattedDate;
}
  
  

export default function Dashboard() {
    //variables
    let session = JSON.parse(localStorage.getItem("study_stamp"));

    //hooks
    const [isSamllerThan440] = useMediaQuery('(max-width: 440px)');

    //loading states
    const [loading, setLoading] = useState(false);

    return (
        <Box>
            <Container maxW={"6xl"} padding="5">
                <HStack>
                    <Box>
                        <Text fontWeight="bold" fontSize={isSamllerThan440 ? "xl" : "3xl"}>
                            {getGreetingBasedOnTime()}{", "}{`${session.firstName} ${session.lastName} 🤟`}
                            {/* {getGreetingBasedOnTime()}{", "}{`Dheeraj Gogoi 🤟`} */}
                        </Text>
                        <Text color="gray" fontWeight="500">{getCurrentFormattedDate()}</Text>
                    </Box>
                    <Spacer />
                    <Box>
                        <Avatar size="lg" />
                    </Box>
                </HStack>

                <Box mt="10">
                    <SimpleGrid gap="5" columns={[2, null, 3, null, 4]}>
                        <Box p="5" borderRadius="10px" bg="#b8e2ff" boxShadow="lg" border="1px solid #66c1ff">
                            <HStack>
                                <Text fontWeight="bold">My Goal</Text>
                                <Spacer />
                                <IconButton
                                    aria-label='Goal'
                                    icon={<AiOutlineHistory />}
                                    isRound={true}
                                    fontSize='20px'
                                    colorScheme='blue'
                                />
                            </HStack>
                            <Text fontWeight="bold" fontSize={isSamllerThan440 ? "3rem" : "4rem"}>{"75"} %</Text>
                        </Box>
                        <Box p="5" borderRadius="10px" bg="#fffc99" boxShadow="lg" border="1px solid #ebe426">
                            <HStack>
                                <Text fontWeight="bold">Current</Text>
                                <Spacer />
                                <IconButton
                                    aria-label='Current Attendance'
                                    icon={<BsGraphUp />}
                                    isRound={true}
                                    fontSize='20px'
                                    colorScheme='yellow'
                                />
                            </HStack>
                            <Text fontWeight="bold" fontSize={isSamllerThan440 ? "3rem" : "4rem"}>{"95"} %</Text>
                        </Box>
                        <Box p="5" borderRadius="10px" bg="#b3ffb8" boxShadow="lg" border="1px solid #36e041">
                            <HStack>
                                <Text fontWeight="bold">Total Subjects</Text>
                                <Spacer />
                                <IconButton
                                    aria-label='Total Subjects'
                                    icon={<AiOutlineBook />}
                                    isRound={true}
                                    fontSize='20px'
                                    colorScheme='green'
                                />
                            </HStack>
                            <Text fontWeight="bold" fontSize={isSamllerThan440 ? "3rem" : "4rem"}>{"5"}</Text>
                        </Box>
                        <Box p="5" borderRadius="10px" bg="#ffb3b3" boxShadow="lg" border="1px solid #ff3333">
                            <HStack>
                                <Text fontWeight="bold">Low</Text>
                                <Spacer />
                                <IconButton
                                    aria-label='Low attendance'
                                    icon={<AiOutlineAlert />}
                                    isRound={true}
                                    fontSize='20px'
                                    colorScheme='red'
                                />
                            </HStack>
                            <Text fontWeight="bold" fontSize={isSamllerThan440 ? "3rem" : "4rem"}>{"0"}</Text>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Container>
        </Box>
    )
}