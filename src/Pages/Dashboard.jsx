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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';

export default function Dashboard() {
    //variables
    //let local_session = JSON.parse(localStorage.getItem("ghl-keap"));

    //hooks

    return (
        <Box>
            <Container maxW='1200' padding="5">
                <HStack>
                    <Box>
                        <Text fontWeight="bold" fontSize="4xl">Dashboard</Text>
                    </Box>
                </HStack>
            </Container>
        </Box>
    )
}