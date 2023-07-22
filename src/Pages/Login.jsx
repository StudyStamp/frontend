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
    useMediaQuery,
    Spinner
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../redux/store';
import { useDispatch } from 'react-redux';
import { user_login } from "../apis/apiRequests"

export default function Login(){
    //hooks
    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch();
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const [isSamllerThan440] = useMediaQuery('(max-width: 440px)')

    //value states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [check, setCheck] = useState(false);

    //loading states
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        let payload = {
            email,
            password
        }

        setLoading(true);
        user_login(payload)
        .then(result => {
            if (result.status >= 200 && result.status < 300) {
                const data = result.data;
                delete data.user.password
                console.log('Data:', data);

                dispatch(authActions.login(data.user));
                navigate("/dashboard");
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
        })
    }

    return (
        <Flex
            minH={isSamllerThan440 ? "90vh" : '100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={isSamllerThan440 ? "2xl" : '4xl'}>Sign in to your account</Heading>
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
                                    {loading ? <Spinner /> : "Sign in"}
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};