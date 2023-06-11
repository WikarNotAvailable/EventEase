import { Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { PageContainer } from '../components/shared/containers/PageContainer';
import useUserContext from '../provider/user';

export const MyTransactions = () => {
	const [user, setUser] = useState<any>();
	const [loading, setLoading] = useState(false);

	const { userID } = useUserContext();

	const toast = useToast();

	const getUser = async () => {
		setLoading(true);
		const res = await api.getUserById(userID);
		console.log(userID);

		if (res.status === 200) {
			setUser(res?.data);
			setLoading(false);
			console.log('user', res?.data);
		} else {
			setLoading(false);
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
		if (+userID > 0) {
			getUser();
		}
		//eslint-disable-next-line
	}, [userID]);

	return (
		<PageContainer>
			<Flex minH='80vh' w='100%'>
				{loading ? (
					<Spinner />
				) : (
					<Flex flexDir='column' w='100%' gap='4px'>
						{user?.transactions?.length > 0 ? (
							user?.transactions?.map((transaction: any) => (
								<Link
									to={`/transaction/${transaction?.transaction_id}`}
									key={transaction?.transaction_id}>
									<Flex
										w='100%'
										justify='space-between'
										align='center'
										bgColor='backgroundTernary'
										p='12px'
										borderRadius='8px'>
										<Text fontSize='14px' fontWeight='600'>
											{
												new Date(transaction?.transactiondate)
													.toLocaleString()
													.split(',')[0]
											}
										</Text>
										<Flex gap='8px' align='center'>
											<Text fontSize='12px' fontWeight='600'>
												Price:{' '}
											</Text>
											<Text fontSize='14px' color='primary'>
												{new Intl.NumberFormat('en-US', {
													style: 'currency',
													currency: 'PLN',
												}).format(transaction?.value)}
											</Text>
										</Flex>
									</Flex>
								</Link>
							))
						) : (
							<>No transactions</>
						)}
						{}
					</Flex>
				)}
			</Flex>
		</PageContainer>
	);
};
