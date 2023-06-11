import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NavSearch } from './NavSearch';
import { SingUpModal } from './modals/SignUpModal';
import { SingInModal } from './modals/SingInModal';
import { NavLink } from './NavLink';
import { NavProfile } from './NavProfile';
import { Link } from 'react-router-dom';
import useUserContext from '../../../provider/user';
import api from '../../../api/api';

export const Navbar = () => {
	const {
		isOpen: isSignInOpen,
		onOpen: onSingInOpen,
		onClose: onSignInClose,
	} = useDisclosure();
	const {
		isOpen: isSignUpOpen,
		onOpen: onSingUpOpen,
		onClose: onSignUpClose,
	} = useDisclosure();

	const { userTypeID } = useUserContext();

	return (
		<Flex
			p={{ base: '20px 16px', md: '20px 42px', xl: '20px 156px' }}
			bgColor='backgroundPrimary'
			align='center'
			boxShadow='0px 1px 10px -2px rgba(154, 154, 154, 1)'
			w='100vw'
			maxW='100vw'
			justify='space-between'>
			<SingUpModal
				isOpen={isSignUpOpen}
				onOpen={onSingUpOpen}
				onClose={onSignUpClose}
				isAnotherOpen={isSignInOpen}
				onAnotherClose={onSignInClose}
				onAnotherOpen={onSingInOpen}
			/>
			<SingInModal
				isOpen={isSignInOpen}
				onOpen={onSingInOpen}
				onClose={onSignInClose}
				isAnotherOpen={isSignUpOpen}
				onAnotherClose={onSignUpClose}
				onAnotherOpen={onSingUpOpen}
			/>
			<Link to='/'>
				<Text fontSize='24px' fontWeight='600' color='primary'>
					EventEase
				</Text>
			</Link>
			<Flex align='center' gap='16px'>
				{(userTypeID === 2 || userTypeID === 3) && (
					<NavLink text='Create&nbsp;event' location='createEvent' />
				)}
				{userTypeID === 3 && (
					<NavLink text='Admin' location='admin' />
				)}

				<NavLink text='Events' location='events' />

				<NavLink text='Artists' location='artists/all' />

				<NavLink text='Places' location='spots/all' />
				
				<NavSearch />
				<NavProfile signInOpen={onSingInOpen} signUpOpen={onSingUpOpen} />
			</Flex>
		</Flex>
	);
};
