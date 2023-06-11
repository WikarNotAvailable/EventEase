import React, { useEffect, useState } from 'react';
import { Flex, Text, Button, Input, useToast } from '@chakra-ui/react';
import useUserContext from '../../../provider/user/index';
import api from '../../../api/api';
import { isString } from 'formik';

export const ProfileData = () => {
	const {
		firstName,
		surname,
		email,
		dateOfBirth,
		phoneNumber,
		userID,
		update,
	} = useUserContext();
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(firstName);
	const [sname, setSurname] = useState(surname);
	const [birthDate, setBirthDate] = useState(
		new Date(dateOfBirth).toLocaleString().split(',')[0]
	);
	const [phone, setPhone] = useState(phoneNumber);
	const [mail, setMail] = useState(email);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const toast = useToast();

	const handleSave = async () => {
		const data = {
			name: name,
			surname: sname,
			email: mail,
			phoneNumber: phone,
			birthday: birthDate,
		};
		const res = await api.updateUser(data, userID);

		if (res.status < 300) {
			console.log(res.data);
			update(res.data);
			setIsEditing(false);
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

	useEffect(() => {
		if (dateOfBirth) {
			setName(firstName);
			setSurname(surname);
			console.log(new Date(dateOfBirth).toLocaleString().split(',')[0]);
			setBirthDate(new Date(dateOfBirth).toLocaleString().split(',')[0]);
			setPhone(phoneNumber);
			setMail(email);
		}
	}, [firstName, surname, dateOfBirth, phoneNumber, email]);

	return (
		<Flex
			flexDirection='column'
			alignItems='center'
			width='fit-content'
			backgroundColor='primary'
			padding='4'
			borderRadius='10px'
			boxShadow='lg'
			textColor='#101828'>
			<Text textAlign='center' fontSize='32' fontWeight='bold' marginBottom='2'>
				{isEditing ? (
					<>
						<Input
							defaultValue={firstName}
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder='Enter name'
							marginBottom='2'
						/>
						<Input
							defaultValue={surname}
							value={sname}
							onChange={(e) => setSurname(e.target.value)}
							placeholder='Enter surname'
							marginBottom='2'
						/>
					</>
				) : (
					`${firstName} ${surname}`
				)}
			</Text>

			<Text textAlign='center' fontSize='20'>
				Birth date:{' '}
				{isEditing ? (
					<Input
						defaultValue={dateOfBirth}
						value={birthDate}
						onChange={(e) => setBirthDate(e.target.value)}
						placeholder='Enter birth date'
						marginBottom='2'
						type='date'
					/>
				) : (
					new Date(dateOfBirth).toLocaleString().split(',')[0]
				)}
			</Text>

			<Text textAlign='center' fontSize='20'>
				Phone number:{' '}
				{isEditing ? (
					<Input
						defaultValue={phoneNumber}
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder='Enter phone number'
						marginBottom='2'
					/>
				) : (
					phoneNumber
				)}
			</Text>

			<Text textAlign='center' fontSize='20'>
				Email: {email}
			</Text>

			{isEditing ? (
				<Button onClick={handleSave} marginTop='2'>
					Save
				</Button>
			) : (
				<Button onClick={handleEdit} marginTop='2'>
					Edit
				</Button>
			)}
		</Flex>
	);
};
