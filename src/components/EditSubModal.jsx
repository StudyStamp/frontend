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

const EditSubModal = ({
    handleToEditClose,
    toEdit,
    setToEdit,
    editIsOpen,
    editOnOpen,
    editOnClose,
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
    const handleUpdateSubject = (e) => {
        e.preventDefault();
        let session = JSON.parse(localStorage.getItem("study_stamp"));

        const payload = {
            user: {
                _id: session._id
            },
            ...toEdit
        }
        console.log(payload);

        // setLoading(true);

        // .then(result => {
        //     if (result.status >= 200 && result.status < 300) {
        //         const data = result.data;
        //         console.log('Data:', data);
        //         setSubjects(prev => [data, ...prev])
        //         toast({
        //             title: (data.type).charAt(0).toUpperCase() + (data.type).slice(1),
        //             description: data.message,
        //             status: data.type,
        //             duration: 9000,
        //             isClosable: true,
        //         })
        //     } else {
        //         const data = result.response.data;
        //         console.error('Error:', result.response.data);
        //         toast({
        //             title: (data.type).charAt(0).toUpperCase() + (data.type).slice(1),
        //             description: data.message,
        //             status: data.type,
        //             duration: 9000,
        //             isClosable: true,
        //         })
        //     }
        // })
        // .catch(error => {
        //     console.error('Error:', error.response);
        // })
        // .finally(() => {
        //     setLoading(false);
        //     handleToEditClose();
        // })
    }
    return (
        <>
            <Modal isOpen={editIsOpen} onClose={handleToEditClose} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Subject</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleUpdateSubject}>
                        {toEdit && <ModalBody>
                            <Box mb="5">
                                <Stack gap="5">
                                    <FormControl isRequired>
                                        <FormLabel>Subject Name</FormLabel>
                                        <Input type="text" value={toEdit.name} onChange={e => {}} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Initial Presents</FormLabel>
                                        <Input type="number" value={toEdit.present} onChange={e => {}} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Initial Total Classes</FormLabel>
                                        <Input type="number" value={toEdit.total} onChange={e => {}} />
                                    </FormControl>
                                </Stack>
                            </Box>
                        </ModalBody>}
                        <ModalFooter>
                            <Button type="submit" colorScheme='blue' mr={3}>
                                {loading ? <Spinner /> : "Save Updates"}
                            </Button>
                            <Button variant='ghost' onClick={handleToEditClose}>Close</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditSubModal;