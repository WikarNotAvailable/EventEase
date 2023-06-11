import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { FC } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useUserContext from '../../../provider/user';

interface INavProfileProps {
	signInOpen: () => void;
	signUpOpen: () => void;
}

export const NavProfile: FC<INavProfileProps> = ({
	signInOpen,
	signUpOpen,
}) => {
	const { logOut, isLoggedIn, firstName } = useUserContext();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			position='relative'
			align='center'
			gap='8px'
			onClick={() => (isOpen ? onClose() : onOpen())}
			cursor='pointer'>
			{isLoggedIn && (
				<Text fontSize='16px' fontWeight='600'>
					{firstName}
				</Text>
			)}
			<MdAccountCircle size='35px' />
			{isOpen && (
				<Flex
					flexDir='column'
					position='absolute'
					top='45px'
					right='0'
					bgColor='backgroundSecondary'
					w='150px'
					borderRadius='20px'
					border='1px solid #696F8C'
					zIndex='1000'>
					{isLoggedIn ? (
						<>
							<Link to='/me'>
								<Flex
									borderRadius='20px'
									p='8px'
									fontWeight='600'
									cursor='pointer'
									justify='center'
									align='center'
									fontSize='12px'
									_hover={{ bgColor: '#696F8C' }}>
									Profile
								</Flex>
							</Link>
							<Link to='/me/mytransactions'>
								<Flex
									borderRadius='20px'
									p='8px'
									fontWeight='600'
									cursor='pointer'
									justify='center'
									align='center'
									fontSize='12px'
									_hover={{ bgColor: '#696F8C' }}>
									My transactions
								</Flex>
							</Link>
							<Flex
								borderRadius='20px'
								p='8px'
								fontWeight='600'
								cursor='pointer'
								justify='center'
								align='center'
								fontSize='12px'
								onClick={logOut}
								_hover={{ bgColor: '#696F8C' }}>
								Logout
							</Flex>
						</>
					) : (
						<>
							<Flex
								borderRadius='20px 20px 0 0'
								p='8px'
								fontWeight='600'
								cursor='pointer'
								justify='center'
								align='center'
								fontSize='12px'
								onClick={() => {
									signInOpen();
									onClose();
								}}
								_hover={{ bgColor: '#696F8C' }}>
								Sign in
							</Flex>
							<Flex
								borderRadius='0 0 20px 20px'
								p='8px'
								fontWeight='600'
								cursor='pointer'
								justify='center'
								align='center'
								fontSize='12px'
								onClick={() => {
									signUpOpen();
									onClose();
								}}
								_hover={{ bgColor: '#696F8C' }}>
								Sign up
							</Flex>
						</>
					)}
				</Flex>
			)}
		</Flex>
	);
};
