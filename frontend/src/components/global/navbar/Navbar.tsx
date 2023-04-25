import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { NavSearch } from './NavSearch'
import { MdAccountCircle } from "react-icons/md"

export const Navbar = () => {
  return (
    <Flex p={{base: '20px 16px', md: '20px 42px', xl: '20px 156px'}} bgColor="backgroundPrimary" align="center"
        boxShadow="0px 1px 10px -2px rgba(154, 154, 154, 1)" w="100vw" maxW="100vw" justify="space-between">
        <Text fontSize="24px" fontWeight="600" color="primary">EventEase</Text>
        <Flex align="center" gap="16px">
            <Text color="textPrimary" fontSize="16px" _hover={{opacity: '0.7'}}>Events</Text>
            <Text color="textPrimary" fontSize="16px" _hover={{opacity: '0.7'}}>Artists</Text>
            <Text color="textPrimary" fontSize="16px" _hover={{opacity: '0.7'}}>Places</Text>
            <NavSearch />
            <MdAccountCircle size="50px"/>
        </Flex>
    </Flex>
  )
}
