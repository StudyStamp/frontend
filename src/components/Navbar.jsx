import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { AiOutlinePoweroff } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const Links = [
    {
        title: "Dashboard",
        link: "/dashboard"
    },
];

const NavLink = ({ link, children }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={link.link}
    >
        {children}
    </Link>
);

export default function Navbar() {
    //hooks
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //handler functions
    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate("/");
    }

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <Text fontWeight="bold">StudyStamp</Text>
                        </Box>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                            mr="5"
                        >
                            {Links.map((link) => (
                                <NavLink key={link.title} link={link}>{link.title}</NavLink>
                            ))}
                        </HStack>
                        <Button bg="#9b76ff" colorScheme='purple' color={"white"} onClick={handleLogout}>Log Out</Button>
                    </Flex>
                </Flex>

                {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as={'nav'} spacing={4}>
                        {Links.map((link) => (
                            <NavLink key={link.title} link={link}>{link.title}</NavLink>
                        ))}
                    </Stack>
                </Box>
                ) : null}
            </Box>
        </>
    );
}