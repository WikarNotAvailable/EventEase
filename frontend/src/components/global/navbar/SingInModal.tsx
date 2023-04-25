import { Button, Flex, Input, Link, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { FC, useReducer, useState } from 'react'
import useUserContext from '../../../provider/user';
import { GlobalModal } from '../modal/Modal';
import { signInReducer } from './signInReducer';
import { SingUpModal } from './SignUpModal';

interface ISignInModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    isAnotherOpen: boolean;
    onAnotherClose: () => void;
    onAnotherOpen: () => void;
}

export const SingInModal: FC<ISignInModalProps> = ({ isOpen, onClose, onOpen, isAnotherOpen, onAnotherOpen, onAnotherClose}) => {
    const [formState, dispatchForm] = useReducer(signInReducer, {
        isEmailValid: false,
        isPasswordValid: false,
        emailValue: '',
        passwordValue: '',
    })

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const { logIn, email } = useUserContext();

    const handleSubmit = async () => {
        if (!formState.isEmailValid) setErrorMessage('Incorrect email')
        else if (!formState.isPasswordValid) setErrorMessage('Incorrect password. It should be minimum 7 characters long')
        else {
            dispatchForm({type: 'FORM_SUBMIT'})
            setErrorMessage('')
            onClose();
        }
        setIsLoading(true);
          const data = {
              email: formState.emailValue,
              password: formState.passwordValue
          }
          axios.post("http://localhost:8000/api/users/login", data).then((res: any) => {
            console.log(res);
            setIsLoading(false);
            onClose();
            const data = res.data.userData[0];
            logIn(data);
          })
    }

  return (
    <GlobalModal isOpen={isOpen} onClose={onClose} headerText="Sign in">
        <SingUpModal isOpen={isAnotherOpen} onOpen={onAnotherOpen} onClose={onAnotherClose} isAnotherOpen={isOpen} onAnotherClose={onClose} onAnotherOpen={onOpen} />
        <Flex flexDir="column" gap="16px">
        <Flex flexDir="column" gap="8px" w="100%">
          <Text fontSize="16px">Email</Text>
          <Input type="email" border="1px solid #696F8C" focusBorderColor="#696F8C" alignItems="center" _hover={{ border: '1px solid rgba(0, 0, 0, 0.9)' }}
            _placeholder={{ color: 'textPrimary', fontSize: "16px" }} onChange={(e: any) => dispatchForm({type: 'EMAIL_CHANGE', val: e.target.value})} fontSize="16px" borderRadius="20px" />
        </Flex>
        <Flex flexDir="column" gap="8px" w="100%">
          <Text fontSize="16px">Password</Text>
          <Input type="password" border="1px solid #696F8C" focusBorderColor="#696F8C" alignItems="center" _hover={{ border: '1px solid rgba(0, 0, 0, 0.9)' }}
            _placeholder={{ color: 'textPrimary', fontSize: "16px" }} onChange={(e: any) => dispatchForm({type: 'PASSWORD_CHANGE', val: e.target.value})} fontSize="16px" borderRadius="20px" />
        </Flex>
        {errorMessage !== '' && <Text fontSize="12px" color="red">{errorMessage}</Text>}
        <Text fontSize="12px" w="100%" textAlign="center">Don't have an account? <Link color="#696F8C" onClick={() => { onClose(); onAnotherOpen(); }}>Create one</Link></Text>
        <Button isLoading={isLoading} onClick={handleSubmit} mt="16px" borderRadius="20px" color="white" bgColor="primary" _hover={{bgColor: 'primary', opacity: '0.9'}}>Sign in</Button>
      </Flex>
    </GlobalModal>
  )
}
