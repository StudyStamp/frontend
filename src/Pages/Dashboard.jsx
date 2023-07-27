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
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../redux/store';
import { BsGraphUp } from "react-icons/bs";
import { AiOutlineBook, AiOutlineAlert, AiOutlineFileAdd, AiOutlineEdit } from "react-icons/ai";
import ChangeGoal from '../components/ChangeGoal';
import { get_subjects, low_attendance, user_update } from '../apis/apiRequests';
import AddSubjectModal from '../components/AddSubjectModal';
import SubjectCard from '../components/SubjectCard';
import EditSubModal from '../components/EditSubModal';

let emoji = "🤟";
function getGreetingBasedOnTime() {
    const currentHour = new Date().getHours();
    if (currentHour >= 1 && currentHour < 12) {
        emoji = "🌄"
        return "Morning";
    } else if (currentHour >= 12 && currentHour < 19) {
        return "Afternoon";
    } else if (currentHour >= 19) {
        emoji = "😇"
        return "Evening";
    } else {
        emoji = "🌃"
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

const calculateOverallAttendancePercentage = (subjects) => {
    const totalSubjects = subjects.length;
    const { present, total } = subjects.reduce((acc, subject) => (
        { present: acc.present + subject.present, total: acc.total + subject.total }),
        { present: 0, total: 0 }
    );
    const overallAttendance = (present / total) * 100;
    return parseFloat(overallAttendance.toFixed(1));
};


export default function Dashboard() {
    //variables

    //hooks
    const [isSamllerThan440] = useMediaQuery('(max-width: 440px)');
    const { isOpen: goalIsOpen, onOpen: goalOnOpen, onClose: goalOnClose } = useDisclosure();
    const { isOpen: subIsOpen, onOpen: subOnOpen, onClose: subOnClose } = useDisclosure();
    const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();
    const toast = useToast();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    // console.log(user);

    //loading states
    const [loading, setLoading] = useState(false);
    const [goalLoading, setGoalLoading] = useState(false);
    const [subjectLoading, setSubjectLoading] = useState(false);

    //stateful variables
    const [sliderValue, setSliderValue] = useState(user ? user.attendance_goal : 50);
    const [goal, setGoal] = useState(user ? user.attendance_goal : 0);
    const [subjects, setSubjects] = useState([]);
    const [currentAttendance, setCurrentAttendance] = useState(0);
    const [lowSubjects, setLowSubjects] = useState([]);
    const [toEdit, setToEdit] = useState(null);


    //use effect functions
    useEffect(() => {
        let session = JSON.parse(localStorage.getItem("study_stamp"));
        let payload = {
            "user": {
                "_id": session._id
            }
        }

        setSubjectLoading(true);
        get_subjects(payload)
        .then(result => {
            if (result.status >= 200 && result.status < 300) {
                const data = result.data;
                // console.log('Data:', data);
                setSubjects(data.subjects);
                setCurrentAttendance(calculateOverallAttendancePercentage(data.subjects))
            } else {
                const data = result.response.data;
                console.error('Error:', result.response.data);
            }
        })
        .catch(error => {
            console.error('Error:', error.response);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        })
        .finally(() => {
            setSubjectLoading(false);
        })
    }, [])

    useEffect(() => {
        let session = JSON.parse(localStorage.getItem("study_stamp"));
        let payload = {
            "user": {
                "_id": session._id
            }
        }

        low_attendance(payload)
        .then(result => {
            if (result.status >= 200 && result.status < 300) {
                const data = result.data;
                // console.log('Data:', data);
                setLowSubjects(data.subjects);
            } else {
                const data = result.response.data;
                console.error('Error:', result.response.data);
            }
        })
        .catch(error => {
            console.error('Error:', error.response);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        })
        .finally(() => {
        })
    }, [subjects, goal])

    //handler functions
    const handleGoalClose = () => {
        goalOnClose();
    }

    const handleGoalSave = () => {
        let session = JSON.parse(localStorage.getItem("study_stamp"));
        let payload = {
            user: {
                _id: session._id
            },
            attendance_goal: sliderValue
        }

        setGoalLoading(true);
        user_update(payload)
        .then(result => {
            if (result.status >= 200 && result.status < 300) {
                const data = result.data;
                console.log('Data:', data);
                setGoal(sliderValue);

                toast({
                    title: (data.type).charAt(0).toUpperCase() + (data.type).slice(1),
                    description: "Attendance goal updated successfully.",
                    status: data.type,
                    duration: 9000,
                    isClosable: true,
                })
                dispatch(authActions.updateUser(data.user));
            } else {
                const data = result.response.data;
                console.error('Error:', result.response.data);
                toast({
                    title: (data.type).charAt(0).toUpperCase() + (data.type).slice(1),
                    description: data.message,
                    status: data.type,
                    duration: 9000,
                    isClosable: true,
                })
            }
        })
        .catch(error => {
            console.error('Error:', error.response);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        })
        .finally(() => {
            setGoalLoading(false);
            handleGoalClose();
        })
    }

    const handleSubClose = () => {
        subOnClose();
    }

    const handleToEditOpen = (subject) => {
        console.log(subject);
        setToEdit(subject);
        editOnOpen();
    }

    const handleToEditClose = (subject) => {
        setToEdit(null);
        editOnClose();
    }

    return (
        <Box>
            <Container maxW={"6xl"} padding="5">
                <HStack>
                    <Box>
                        <Text fontWeight="bold" fontSize={isSamllerThan440 ? "xl" : "3xl"}>
                            {getGreetingBasedOnTime()}{", "}{`${user.firstName} ${user.lastName} ${emoji}`}
                            {/* {getGreetingBasedOnTime()}{", "}{`Dheeraj Gogoi 🤟`} */}
                        </Text>
                        <Text color="gray" fontWeight="500">{getCurrentFormattedDate()}</Text>
                    </Box>
                    <Spacer />
                    <Box>
                        <Avatar size="md" />
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
                                    icon={<AiOutlineEdit />}
                                    isRound={true}
                                    fontSize='20px'
                                    colorScheme='blue'
                                    onClick={goalOnOpen}
                                />
                            </HStack>
                            <Text fontWeight="bold" fontSize={isSamllerThan440 ? "2rem" : "4rem"}>{goal} %</Text>
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
                            <Text fontWeight="bold" fontSize={isSamllerThan440 ? "2rem" : "4rem"}>{currentAttendance} %</Text>
                        </Box>
                        <Box p="5" borderRadius="10px" bg="#b3ffb8" boxShadow="lg" border="1px solid #36e041">
                            <HStack>
                                <Text fontWeight="bold">Total Subjects</Text>
                                <Spacer />
                                <IconButton
                                    aria-label='Total Subjects'
                                    icon={<AiOutlineFileAdd />}
                                    isRound={true}
                                    fontSize='20px'
                                    colorScheme='green'
                                    onClick={subOnOpen}
                                />
                            </HStack>
                            <Text fontWeight="bold" fontSize={isSamllerThan440 ? "2rem" : "4rem"}>{subjects.length}</Text>
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
                            <Text fontWeight="bold" fontSize={isSamllerThan440 ? "2rem" : "4rem"}>{lowSubjects.length}</Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box my="10">
                    {subjects.length > 0 ? <>
                        <Box>
                            <Text fontWeight="bold" fontSize="1.6rem">Subjects</Text>
                            <SimpleGrid columns={[1, null, 2, null, 2]} gap="5" mt="5">
                                {
                                    subjects.map((subject, index) => {
                                        return <SubjectCard key={index} subject={subject} handleToEditOpen={handleToEditOpen} goal={goal} />
                                    })
                                }
                            </SimpleGrid>
                        </Box>
                    </>: <Text textAlign="center" color="gray" fontStyle="italic">No subjects added</Text>}
                </Box>
            </Container>

            <ChangeGoal
                goalIsOpen={goalIsOpen}
                goalOnClose={goalOnClose}
                goalOnOpen={goalOnOpen}
                sliderValue={sliderValue}
                setSliderValue={setSliderValue}
                handleGoalClose={handleGoalClose}
                handleGoalSave={handleGoalSave}
                goalLoading={goalLoading}
                setGoalLoading={setGoalLoading}
            />
            <AddSubjectModal
                subIsOpen={subIsOpen}
                subOnOpen={subOnOpen}
                subOnClose={subOnClose}
                handleSubClose={handleSubClose}
                subjects={subjects}
                setSubjects={setSubjects}
                setCurrentAttendance={setCurrentAttendance}
            />
            <EditSubModal
                handleToEditClose={handleToEditClose}
                toEdit={toEdit}
                setToEdit={setToEdit}
                editIsOpen={editIsOpen}
                editOnOpen={editOnOpen}
                editOnClose={editOnClose}
            />
        </Box>
    )
}