import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { FC } from 'react'
import { MdAccountCircle } from 'react-icons/md';
import useUserContext from '../../../provider/user';

interface INavProfileProps {
    signInOpen: () => void;
    signUpOpen: () => void;
}

export const NavProfile: FC<INavProfileProps> = ({signInOpen, signUpOpen}) => {
    const { logOut, isLoggedIn, firstName } = useUserContext();
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
   <Flex position="relative" align="center" gap="8px" onClick={() => isOpen ? onClose() : onOpen()} cursor="pointer">
        {isLoggedIn && <Text fontSize="16px" fontWeight="600">{ firstName }</Text>}
        <MdAccountCircle size="35px" />
        {isOpen && <Flex flexDir="column" position="absolute" top="35px" bgColor="backgroundSecondary" w="80px" borderRadius="20px"
        border="1px solid #696F8C">
        {isLoggedIn ?
            <Flex borderRadius="20px" p="8px" fontWeight="600" cursor="pointer" justify="center" align="center" fontSize="12px" onClick={logOut} _hover={{ bgColor: '#696F8C' }}>Logout</Flex>: <>
            <Flex borderRadius="20px 20px 0 0" p="8px" fontWeight="600" cursor="pointer" justify="center" align="center" fontSize="12px" onClick={() => { signInOpen(); onClose(); }} _hover={{bgColor: '#696F8C'}}>Sign in</Flex>
            <Flex borderRadius="0 0 20px 20px" p="8px" fontWeight="600" cursor="pointer" justify="center" align="center" fontSize="12px" onClick={() => { signUpOpen(); onClose(); }} _hover={{ bgColor: '#696F8C' }}>Sign up</Flex>
        </>}
        </Flex>}
    </Flex>
  )
}
