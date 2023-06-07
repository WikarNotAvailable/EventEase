import { Button, Flex, Link, Text, useToast } from '@chakra-ui/react';
import React, { FC, useReducer, useState } from 'react';
import api from '../../../../api/api';
import useUserContext from '../../../../provider/user';
import { Input } from '../../../shared/Input';
import { GlobalModal } from '../../modal/Modal';
import { signInReducer } from '../reducers/signInReducer';
import { SingUpModal } from './SignUpModal';

interface ISignInModalProps {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	isAnotherOpen: boolean;
	onAnotherClose: () => void;
	onAnotherOpen: () => void;
}

export const SingInModal: FC<ISignInModalProps> = ({
	isOpen,
	onClose,
	onOpen,
	isAnotherOpen,
	onAnotherOpen,
	onAnotherClose,
}) => {
	const [formState, dispatchForm] = useReducer(signInReducer, {
		isEmailValid: false,
		isPasswordValid: false,
		emailValue: '',
		passwordValue: '',
	});

	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { logIn } = useUserContext();
	const toast = useToast();

	const handleSubmit = async () => {
		if (!formState.isEmailValid) setErrorMessage('Incorrect email');
		else if (!formState.isPasswordValid)
			setErrorMessage(
				'Incorrect password. It should be minimum 7 characters long'
			);
		else {
			dispatchForm({ type: 'FORM_SUBMIT' });
			setErrorMessage('');
			setIsLoading(true);
			const data = {
				email: formState.emailValue,
				password: formState.passwordValue,
			};
			api
				.login(data)
				.then((res: any) => {
					console.log(res);
					setIsLoading(false);
					onClose();
					const data = res.userData[0];
					logIn(data);
				})
				.catch((err: any) => {
					console.log(err);
					setIsLoading(false);
					toast({
						title: 'Something went wrong...',
						status: 'error',
						duration: 9000,
						isClosable: true,
						position: 'top',
					});
				});
		}
		onClose();
	};

	return (
		<GlobalModal isOpen={isOpen} onClose={onClose} headerText='Sign in'>
			<SingUpModal
				isOpen={isAnotherOpen}
				onOpen={onAnotherOpen}
				onClose={onAnotherClose}
				isAnotherOpen={isOpen}
				onAnotherClose={onClose}
				onAnotherOpen={onOpen}
			/>
			<Flex flexDir='column' gap='16px'>
				<Input
					width='100%'
					heading='Email'
					type='email'
					onChange={(e: any) =>
						dispatchForm({ type: 'EMAIL_CHANGE', val: e.target.value })
					}
				/>
				<Input
					width='100%'
					heading='Password'
					type='password'
					onChange={(e: any) =>
						dispatchForm({ type: 'PASSWORD_CHANGE', val: e.target.value })
					}
				/>
				{errorMessage !== '' && (
					<Text fontSize='12px' color='red'>
						{errorMessage}
					</Text>
				)}
				<Text fontSize='12px' w='100%' textAlign='center'>
					Don't have an account?{' '}
					<Link
						color='#696F8C'
						onClick={() => {
							onClose();
							onAnotherOpen();
						}}>
						Create one
					</Link>
				</Text>
				<Button
					isLoading={isLoading}
					onClick={handleSubmit}
					mt='16px'
					borderRadius='20px'
					color='white'
					bgColor='primary'
					_hover={{ bgColor: 'primary', opacity: '0.9' }}>
					Sign in
				</Button>
			</Flex>
		</GlobalModal>
	);
};
