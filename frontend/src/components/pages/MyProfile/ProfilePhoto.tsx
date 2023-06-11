import React, { useState } from 'react';
import { Image, Box, Button } from '@chakra-ui/react';

export const ProfilePhoto = () => {
	const [photo, setPhoto] = useState('/assets/photos/user.jpg');

	const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target && typeof e.target.result === 'string') {
					setPhoto(e.target.result);
				}
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	};

	return (
		<Box width='250px' height='250px'>
			<Image
				src={photo}
				alt={''}
				borderRadius='50%'
				border='4px solid #fff'
				boxShadow='2xl'
				objectFit='cover'
				width='100%'
				height='100%'
			/>
			<Button
				as='label'
				htmlFor='photo-upload'
				marginTop='2'
				variant='outline'
				display='flex'
				alignItems='center'>
				Change photo
				<input
					id='photo-upload'
					type='file'
					accept='image/*'
					onChange={handlePhotoChange}
					style={{ display: 'none' }}
				/>
			</Button>
		</Box>
	);
};
