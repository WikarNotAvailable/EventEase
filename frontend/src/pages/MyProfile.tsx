import React from 'react';
import { PageContainer } from '../components/shared/containers/PageContainer';
import { ProfilePhoto } from '../components/pages/MyProfile/ProfilePhoto';
import { ProfileData } from '../components/pages/MyProfile/ProfileData';
import { Link } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';

export const MyProfile = () => {
	return (
		<PageContainer>
			<Flex flexDir='column' minH='80vh'>
				<ProfileData />
				<Flex>
					<Link to='/me/changepassword'>
						<Button marginTop='2' variant='outline' alignItems='center'>
							Change password
						</Button>
					</Link>
				</Flex>
			</Flex>
		</PageContainer>
	);
};
