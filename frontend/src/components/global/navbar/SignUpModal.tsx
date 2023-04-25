import { Button, Flex, Input, Link, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { FC, useReducer, useState } from 'react'
import { GlobalModal } from '../modal/Modal';
import { signUpReducer } from './signUpReducer';
import { SingInModal } from './SingInModal';

interface ISignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    isAnotherOpen: boolean;
    onAnotherClose: () => void;
    onAnotherOpen: () => void;
}

export const SingUpModal: FC<ISignUpModalProps> = ({ isOpen, onClose, onOpen, isAnotherOpen, onAnotherClose, onAnotherOpen }) => {
    const [formState, dispatchForm] = useReducer(signUpReducer, {
        firstNameValue: '',
        surnameValue: '',
        dateOfBirthValue: '',
        phoneNumberValue: '',
        isEmailValid: false,
        isPasswordValid: false,
        isPasswordConfirmationValid: false,
        emailValue: '',
        passwordValue: '',
        passwordConfirmationValue: ''
    })

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!formState.isEmailValid) setErrorMessage('Incorrect email')
        else if (!formState.isPasswordValid) setErrorMessage('Incorrect password. It should be minimum 7 characters long')
        else if (!formState.isPasswordConfirmationValid) setErrorMessage('Passwords do not match')
        else {
            dispatchForm({type: 'FORM_SUBMIT'})
            setErrorMessage('')
            setIsLoading(true);
            const data = {
                userTypeID: 3,
                name: formState.firstNameValue,
                surname: formState.surnameValue,
                email: formState.emailValue,
                phoneNumber: formState.phoneNumberValue,
                birthday: formState.dateOfBirthValue, 
                password: formState.passwordValue
            }
            axios.post("http://localhost:8000/api/users", data).then((res: any) => {
              console.log(res);
              setIsLoading(false);
              onClose();
            })
        }
    }

  return (
      <GlobalModal isOpen={isOpen} onClose={onClose} headerText="Sign up">
        {/* TO REFACTOR */}
        <SingInModal isOpen={isAnotherOpen} onClose={onAnotherClose} onOpen={onAnotherOpen} isAnotherOpen={isOpen} onAnotherClose={onClose} onAnotherOpen={onOpen} />
        <Flex flexDir="column" gap="16px">
        <Flex justify="space-between" w="100%">
          <Flex flexDir="column" gap="8px" w="45%">
            <Text fontSize="16px">First name</Text>
            <Input type="text" border="1px solid #696F8C" focusBorderColor="#696F8C" alignItems="center" _hover={{ border: '1px solid rgba(0, 0, 0, 0.9)' }}
              _placeholder={{ color: 'textPrimary', fontSize: "16px" }} onChange={(e: any) => dispatchForm({ type: 'FIRSTNAME_CHANGE', val: e.target.value })} fontSize="16px" borderRadius="20px" />
          </Flex>
          <Flex flexDir="column" gap="8px" w="45%">
            <Text fontSize="16px">Surname</Text>
            <Input type="text" border="1px solid #696F8C" focusBorderColor="#696F8C" alignItems="center" _hover={{ border: '1px solid rgba(0, 0, 0, 0.9)' }}
              _placeholder={{ color: 'textPrimary', fontSize: "16px" }} onChange={(e: any) => dispatchForm({ type: 'SURNAME_CHANGE', val: e.target.value })} fontSize="16px" borderRadius="20px" />
          </Flex>
        </Flex>
        <Flex justify="space-between" w="100%">
          <Flex flexDir="column" gap="8px" w="45%">
            <Text fontSize="16px">Date of birth</Text>
            <Input type="date" border="1px solid #696F8C" focusBorderColor="#696F8C" alignItems="center" _hover={{ border: '1px solid rgba(0, 0, 0, 0.9)' }}
              _placeholder={{ color: 'textPrimary', fontSize: "16px" }} onChange={(e: any) => dispatchForm({ type: 'BIRTH_DATE_CHANGE', val: e.target.value })} fontSize="16px" borderRadius="20px" />
          </Flex>
          <Flex flexDir="column" gap="8px" w="45%">
            <Text fontSize="16px">Phone number</Text>
            <Input type="tel" border="1px solid #696F8C" focusBorderColor="#696F8C" alignItems="center" _hover={{ border: '1px solid rgba(0, 0, 0, 0.9)' }}
              _placeholder={{ color: 'textPrimary', fontSize: "16px" }} onChange={(e: any) => dispatchForm({ type: 'PHONE_NUMBER_CHANGE', val: e.target.value })} fontSize="16px" borderRadius="20px" />
          </Flex>
        </Flex>
        <Flex flexDir="column" gap="8px" w="100%">
          <Text fontSize="16px">Email</Text>
          <Input type="email" border="1px solid #696F8C" focusBorderColor="#696F8C" alignItems="center" _hover={{ border: '1px solid rgba(0, 0, 0, 0.9)' }}
            _placeholder={{ color: 'textPrimary', fontSize: "16px" }} onChange={(e: any) => dispatchForm({ type: 'EMAIL_CHANGE', val: e.target.value })} fontSize="16px" borderRadius="20px" />
        </Flex>
        <Flex flexDir="column" gap="8px" w="100%">
          <Text fontSize="16px">Password</Text>
          <Input type="password" border="1px solid #696F8C" focusBorderColor="#696F8C" alignItems="center" _hover={{ border: '1px solid rgba(0, 0, 0, 0.9)' }}
            _placeholder={{ color: 'textPrimary', fontSize: "16px" }} onChange={(e: any) => dispatchForm({ type: 'PASSWORD_CHANGE', val: e.target.value })} fontSize="16px" borderRadius="20px" />
        </Flex>
        <Flex flexDir="column" gap="8px" w="100%">
          <Text fontSize="16px">Repeat password</Text>
          <Input type="password" border="1px solid #696F8C" focusBorderColor="#696F8C" alignItems="center" _hover={{ border: '1px solid rgba(0, 0, 0, 0.9)' }}
            _placeholder={{ color: 'textPrimary', fontSize: "16px" }} onChange={(e: any) => dispatchForm({ type: 'PASSWORD_CONFIRMATION_CHANGE', val: e.target.value })} fontSize="16px" borderRadius="20px" />
        </Flex>
        {errorMessage !== '' && <Text fontSize="12px" color="red">{errorMessage}</Text>}
        <Text fontSize="12px" w="100%" textAlign="center">Already have an account? <Link color="#696F8C" onClick={() => { onClose(); onAnotherOpen(); }}>Log in</Link></Text>
        <Button isLoading={isLoading} mt="16px" borderRadius="20px" color="white" bgColor="primary" _hover={{bgColor: 'primary', opacity: '0.9'}} onClick={handleSubmit}>Sign up</Button>
      </Flex>
    </GlobalModal>
  )
}
