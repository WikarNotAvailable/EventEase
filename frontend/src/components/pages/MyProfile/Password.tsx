import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Stack, useToast } from '@chakra-ui/react';
import useUserContext from '../../../provider/user';
import api from '../../../api/api';

export const Password = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { password, update, userID } = useUserContext();
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const toast = useToast();

	const handleChangePassword = async () => {
		const isCurrentPasswordCorrect = verifyCurrentPassword();

		if (!isCurrentPasswordCorrect) {
			setErrorMessage('Incorrect current password');
			return;
		}

		if (newPassword !== confirmPassword) {
			setErrorMessage('New password and confirm password do not match');
			return;
		}

		const res = await api.updateUser({ password: newPassword }, userID);

		if (res.status < 300) {
			setCurrentPassword('');
			setNewPassword('');
			setConfirmPassword('');
			setErrorMessage('');
			setIsOpen(false);
			update(res.data);
		} else {
			toast({
				title: 'Something went wrong...',
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top',
			});
		}
	};

	const verifyCurrentPassword = () => {
		const correctPassword = password;
		return currentPassword === correctPassword;
	};

	const handleCancel = () => {
		window.history.back();
	};

	useEffect(() => {
		setCurrentPassword('');
	}, [password]);

	return (
		<Box top='auto'>
			<Stack spacing={4}>
				<Input
					type='password'
					placeholder='Current Password'
					defaultValue={password}
					value={currentPassword}
					onChange={(event) => setCurrentPassword(event.target.value)}
				/>
				<Input
					type='password'
					placeholder='New Password'
					value={newPassword}
					onChange={(event) => setNewPassword(event.target.value)}
				/>
				<Input
					type='password'
					placeholder='Confirm Password'
					value={confirmPassword}
					onChange={(event) => setConfirmPassword(event.target.value)}
				/>
				<Button colorScheme='blue' onClick={handleChangePassword}>
					Change Password
				</Button>
				<Button colorScheme='red' onClick={handleCancel}>
					Back
				</Button>
				{errorMessage && <Box color='red'>{errorMessage}</Box>}
			</Stack>
		</Box>
	);
};
