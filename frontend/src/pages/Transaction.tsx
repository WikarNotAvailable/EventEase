import { Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { PageContainer } from '../components/shared/containers/PageContainer';

export const Transaction = () => {
	const [tickets, setTickets] = useState<any>();
	const [loading, setLoading] = useState(false);

	const { id } = useParams();

	const toast = useToast();

	const getTransaction = async () => {
		setLoading(true);

		const res = await api.getTransactionById(id!);

		if (res.status === 200) {
			setTickets(res.data);
			setLoading(false);
			console.log(res.data);
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
		getTransaction();
		//eslint-disable-next-line
	}, []);

	return (
		<PageContainer>
			<Flex minH='80vh' w='100%'>
				{loading ? (
					<Spinner />
				) : (
					<Flex flexDir='column' w='100%' gap='4px'>
						{new Date(tickets?.transactiondate).toLocaleString().split(',')[0]}
						{tickets?.tickets?.map((ticket: any) => (
							<Flex
								w='100%'
								justify='space-between'
								align='center'
								bgColor='backgroundTernary'
								p='12px'
								borderRadius='8px'>
								<Flex flexDir='column'>
									<Text fontSize='12px'>Place: {ticket?.ticket_place}</Text>
									<Text fontSize='12px'>Type: {ticket?.type}</Text>
								</Flex>

								{new Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: 'PLN',
								}).format(ticket?.price)}
							</Flex>
						))}
					</Flex>
				)}
			</Flex>
		</PageContainer>
	);
};
