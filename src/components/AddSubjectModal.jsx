import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Spinner,
    FormControl,
    Input,
    FormLabel,
    Stack,
    useToast,
} from '@chakra-ui/react';
import React, { useState } from "react";
import { create_subject } from '../apis/apiRequests';

const calculateOverallAttendancePercentage = (subjects) => {
    const totalSubjects = subjects.length;
    const { present, total } = subjects.reduce((acc, subject) => (
        { present: acc.present + subject.present, total: acc.total + subject.total }),
        { present: 0, total: 0 }
    );
    const overallAttendance = (present / total) * 100;
    return parseFloat(overallAttendance.toFixed(1));
};

const AddSubjectModal = ({
    subIsOpen,
    subOnClose,
    subOnOpen,
    handleSubClose,
    subjects,
    setSubjects,
    setCurrentAttendance
}) => {
    //hooks
    const toast = useToast();

    //loading variables
    const [loading, setLoading] = useState(false);

    //stateful variables
    const [name, setName] = useState("");
    const [present, setPresent] = useState(0);
    const [total, setTotal] = useState(0);

    //handler functions
    const handleCreateSubject = (e) => {
        e.preventDefault();
        let session = JSON.parse(localStorage.getItem("study_stamp"));

        const payload = {
            user: {
                _id: session._id
            },
            user_id: session._id,
            name,
            present: Number(present),
            total: Number(total),
        }
        console.log(payload);

        setLoading(true);
        create_subject(payload)
        .then(result => {
            if (result.status >= 200 && result.status < 300) {
                const data = result.data;
                console.log('Data:', data);
                setCurrentAttendance(calculateOverallAttendancePercentage([data, ...subjects]))
                setSubjects(prev => [data, ...prev])
                toast({
                    title: (data.type).charAt(0).toUpperCase() + (data.type).slice(1),
                    description: data.message,
                    status: data.type,
                    duration: 9000,
                    isClosable: true,
                })
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
        })
        .finally(() => {
            setLoading(false);
            setName("");
            setPresent(0);
            setTotal(0);
            handleSubClose();
        })
    }
    return (
        <>
            <Modal isOpen={subIsOpen} onClose={handleSubClose} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Subject</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleCreateSubject}>
                        <ModalBody>
                            <Box mb="5">
                                <Stack gap="5">
                                    <FormControl isRequired>
                                        <FormLabel>Subject Name</FormLabel>
                                        <Input type="text" value={name} onChange={e => setName(e.target.value)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Initial Presents</FormLabel>
                                        <Input type="number" value={present} onChange={e => setPresent(e.target.value)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Initial Total Classes</FormLabel>
                                        <Input type="number" value={total} onChange={e => setTotal(e.target.value)} />
                                    </FormControl>
                                </Stack>
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" colorScheme='blue' mr={3}>
                                {loading ? <Spinner /> : "Create Subject"}
                            </Button>
                            <Button variant='ghost' onClick={handleSubClose}>Close</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddSubjectModal;