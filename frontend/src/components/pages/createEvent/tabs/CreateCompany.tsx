import { Button, Flex, Input, Textarea, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import api from '../../../../api/api';

export const CreateCompany = () => {
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const [submitting, setSubmitting] = useState(false);

	const toast = useToast();

	const handleSubmit = async () => {
		setSubmitting(true);
		console.log({ name: name, description: description });
		const res = await api.createCompany({
			name: name,
			description: description,
		});

		if (res.status < 300) {
			console.log(res);
			setSubmitting(false);
			toast({
				title: 'Successfully created company...',
				status: 'success',
				duration: 9000,
				isClosable: true,
				position: 'top',
			});
		} else {
			setSubmitting(false);
			toast({
				title: 'Something went wrong...',
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top',
			});
		}
	};

	return (
		<Flex flexDir='column' gap='8px' w='100%'>
			<Input
				placeholder='Company name'
				value={name}
				onChange={(e: any) => setName(e.target.value)}
			/>
			<Textarea
				placeholder='Company description'
				value={description}
				onChange={(e: any) => setDescription(e.target.value)}
			/>
			<Button
				isLoading={submitting}
				bgColor='primary'
				_hover={{ bgColor: 'primary', opacity: '0.9' }}
				color='white'
				w='100%'
				onClick={handleSubmit}>
				Create
			</Button>
		</Flex>
	);
};
