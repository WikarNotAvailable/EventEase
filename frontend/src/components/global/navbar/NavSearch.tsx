import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export const NavSearch = () => {
  return (
    <InputGroup ml="16px">
        <Input border="1px solid #696F8C" focusBorderColor="#696F8C" placeholder="Search for events, artists or places" alignItems="center" _hover={{ border: '1px solid rgba(0, 0, 0, 0.9)' }}
            textColor="textPrimary" _placeholder={{ color: 'textPrimary', fontSize: "12px" }} fontSize="12px" minWidth="280px" borderRadius="20px"/>
        <InputRightElement w="12%">
            <Button display="flex" alignItems="center" justifyContent="center" variant="unstyled" borderRadius="50%" bgColor="primary">
                <AiOutlineSearch color="white"/>
            </Button>
        </InputRightElement>
  </InputGroup>
    )
}
