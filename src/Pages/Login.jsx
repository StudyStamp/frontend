import React, { useState } from 'react';
import {
    Flex,
    Switch,
    useColorMode,
    useToast,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../redux/store';
import { useDispatch } from 'react-redux';

export default function Login(){
    //hooks
    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch();
    const formBackground = useColorModeValue('gray.100', 'gray.700');

    //value states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [check, setCheck] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        let payload = {
            email,
            password
        }
        
        dispatch(authActions.login(payload));
        navigate("/dashboard");
        toast({
            title: 'Success!',
            description: "You've logged in successfully. Now connect your GoHighLevel and Keap account.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of the <Link color={'blue.400'}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <form onSubmit={handleLogin}>
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input type={check ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}
                                >
                                    <Checkbox onChange={() => setCheck((check) => !check)}>Show Password</Checkbox>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type="submit"
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};