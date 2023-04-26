import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { NavSearch } from './NavSearch'
import { SingUpModal } from './modals/SignUpModal'
import { SingInModal } from './modals/SingInModal'
import { NavLink } from './NavLink'
import { NavProfile } from './NavProfile'

export const Navbar = () => {
  const { isOpen: isSignInOpen, onOpen: onSingInOpen, onClose: onSignInClose } = useDisclosure();
  const { isOpen: isSignUpOpen, onOpen: onSingUpOpen, onClose: onSignUpClose } = useDisclosure();



  return (
    <Flex p={{base: '20px 16px', md: '20px 42px', xl: '20px 156px'}} bgColor="backgroundPrimary" align="center"
        boxShadow="0px 1px 10px -2px rgba(154, 154, 154, 1)" w="100vw" maxW="100vw" justify="space-between">
        <SingUpModal isOpen={isSignUpOpen} onOpen={onSingUpOpen} onClose={onSignUpClose} isAnotherOpen={isSignInOpen} onAnotherClose={onSignInClose} onAnotherOpen={onSingInOpen}/>
        <SingInModal isOpen={isSignInOpen} onOpen={onSingInOpen} onClose={onSignInClose} isAnotherOpen={isSignUpOpen} onAnotherClose={onSignUpClose} onAnotherOpen={onSingUpOpen} />
        <Text fontSize="24px" fontWeight="600" color="primary">EventEase</Text>
        <Flex align="center" gap="16px">
            <NavLink text="Events" />
            <NavLink text="Artists" />
            <NavLink text="Places" />
            <NavSearch />
            {/* <Flex position="relative" align="center" gap="8px" onClick={() => isOpen ? onClose() : onOpen()} cursor="pointer">
              {isLoggedIn && <Text fontSize="16px" fontWeight="600">{ firstName }</Text>}
              <MdAccountCircle size="35px" />
              {isOpen && <Flex flexDir="column" position="absolute" top="35px" bgColor="backgroundSecondary" w="80px" borderRadius="20px"
                border="1px solid #696F8C">
              {isLoggedIn ?
                <Flex borderRadius="20px" p="8px" fontWeight="600" cursor="pointer" justify="center" align="center" fontSize="12px" onClick={logOut} _hover={{ bgColor: '#696F8C' }}>Logout</Flex>: <>
                <Flex borderRadius="20px 20px 0 0" p="8px" fontWeight="600" cursor="pointer" justify="center" align="center" fontSize="12px" onClick={() => { onSingInOpen(); onClose(); }} _hover={{bgColor: '#696F8C'}}>Sign in</Flex>
                <Flex borderRadius="0 0 20px 20px" p="8px" fontWeight="600" cursor="pointer" justify="center" align="center" fontSize="12px" onClick={() => { onSingUpOpen(); onClose(); }} _hover={{ bgColor: '#696F8C' }}>Sign up</Flex>
                </>}
              </Flex>}
            </Flex> */}
            <NavProfile signInOpen={onSingInOpen} signUpOpen={onSingUpOpen} />
        </Flex>
    </Flex>
  )
}
