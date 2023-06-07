import {
	Button,
	Flex,
	Grid,
	Link,
	Spinner,
	Text,
	useToast,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../api/api';
import { PageContainer } from '../components/shared/containers/PageContainer';
import useUserContext from '../provider/user';

enum Views {
	MAIN,
	TICKETS,
}

export const EventDetails = () => {
	const [event, setEvent] = useState<any>();
	const [company, setCompany] = useState<any>();

	const [loading, setLoading] = useState(true);
	const [descriptionFull, setDescriptionFull] = useState(false);
	const [view, setView] = useState<Views>(Views.MAIN);
	const [tickets, setTickets] = useState<any>();
	const [buying, setBuying] = useState(-1);

	const toast = useToast();
	const { id } = useParams();
	console.log('id', id);

	const { userID, isLoggedIn } = useUserContext();

	const handleGoToTickets = async () => {
		setView(Views.TICKETS);
		setLoading(true);
		const res = await ApiService.getTicketsForEvent(id!, 300);

		if (res.status === 200) {
			console.log(res.data);
			setTickets(res.data);
			setLoading(false);
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

	const buyTicket = async (
		id: string,
		price: number,
		transactionID: string
	) => {
		const res = await ApiService.updateTicket(id, price, +transactionID);
		return res;
	};

	const handleBuy = async (id: string, price: number) => {
		if (isLoggedIn) {
			setBuying(+id);

			const res = await ApiService.postTransaction(userID, price);

			if (res.status === 201) {
				console.log(res.data);
				const res2 = await buyTicket(
					id,
					res.data.value,
					res.data.transaction_id
				);
				console.log(res2);
				if (res2.status === 200) {
					await handleGoToTickets();
					setBuying(-1);
				} else {
					setBuying(-1);
					toast({
						title: 'Something went wrong...',
						status: 'error',
						duration: 9000,
						isClosable: true,
						position: 'top',
					});
				}
			} else {
				setBuying(-1);
				toast({
					title: 'Something went wrong...',
					status: 'error',
					duration: 9000,
					isClosable: true,
					position: 'top',
				});
			}
		} else {
			toast({
				title: 'You must be logged in...',
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top',
			});
		}
	};

	const getEvent = async () => {
		setLoading(true);
		const res = await ApiService.getEventById(id!);

		if (res.status === 200) {
			console.log(res.data);
			setEvent(res.data);
			const res2 = await getCompany(res.data?.company_id);
			if (res2.status === 200) {
				console.log(res2.data);
				setCompany(res2.data);
				setLoading(false);
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
			setLoading(false);
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

	const getCompany = async (id: string) => {
		const res = await ApiService.getCompanyById(id!);
		return res;
	};

	useEffect(() => {
		getEvent();
		// eslint-disable-next-line
	}, []);

	return (
		<PageContainer>
			<Flex minH='100vh' w='100%'>
				{loading && <Spinner />}
				{view === Views.MAIN && !loading && (
					<Grid templateColumns='3fr 1fr' w='100%' gridGap='64px'>
						<Flex flexDir='column' gap='16px'>
							<Flex justify='space-between' align='center' w='100%'>
								<Flex flexDir='column'>
									<Text fontSize='24px' fontWeight='600'>
										{event?.name}
									</Text>
									<Flex fontSize='14px' fontWeight='600' gap='4px'>
										<Text>Organizer: </Text>
										<RouterLink
											to={`/companies/${event?.company_id}`}
											color='primary'>
											<Text color='primary'>{company?.name}</Text>
										</RouterLink>
									</Flex>
									<Text fontSize='14px' fontWeight='500'>
										{new Date(event?.begindate).toLocaleString().split(',')[0]}
										{new Date(event?.enddate).toLocaleString().split(',')[0] !==
										new Date(event?.begindate).toLocaleString().split(',')[0]
											? ' - ' +
											  new Date(event?.enddate).toLocaleString().split(',')[0]
											: ''}
									</Text>
									<Flex gap='8px' mt='8px'>
										{event?.performers.map((performer: any) => (
											<RouterLink
												to={`/artist/${performer?.name}`}
												key={performer?.performer_id}>
												<Text fontSize='16px' fontWeight='700' color='primary'>
													{performer?.name}
												</Text>
											</RouterLink>
										))}
									</Flex>
								</Flex>
								<Flex flexDir='column' gap='8px'>
									<Text fontSize='14px' fontWeight='600'>
										Available tickets:{' '}
										<Link
											color='primary'
											_hover={{ textDecoration: 'none' }}
											cursor='default'>
											{event?.availabletickets}
										</Link>
										&nbsp;/&nbsp;
										{event?.availabletickets + event?.currentlytakentickets}
									</Text>
									<Button
										borderRadius='20px'
										color='white'
										bgColor='primary'
										_hover={{ bgColor: 'primary', opacity: '0.9' }}
										onClick={handleGoToTickets}>
										Buy
									</Button>
								</Flex>
							</Flex>
							<Flex position='relative' mt='50px'>
								<Flex
									bgImage='https://goingapp.pl/more/wp-content/uploads/2023/02/Metallica-1600x996.jpeg'
									w='100%'
									h='40vh'
									backgroundPosition='center'
									bgSize='cover'
									zIndex='1'
									borderRadius='16px'
								/>
								<Flex
									bgImage='https://goingapp.pl/more/wp-content/uploads/2023/02/Metallica-1600x996.jpeg'
									h='40vh'
									w='100%'
									backgroundPosition='center'
									bgSize='cover'
									filter='blur(100px)'
									position='absolute'
									top='0'
									left='0'
									zIndex='0'
								/>
							</Flex>
							{event?.description?.length > 100 ? (
								<Text fontSize='16px'>
									{descriptionFull
										? event?.description
										: event?.description?.slice(0, 100)}
									<Link
										color='primary'
										onClick={() => setDescriptionFull((prev) => !prev)}>
										{descriptionFull ? '...Show less' : '...Show more'}
									</Link>
								</Text>
							) : (
								<Text fontSize='16px'>{event?.description}</Text>
							)}
						</Flex>
						<Flex flexDir='column' gap='8px'>
							<Text mb='8px' fontSize='24px' fontWeight='600'>
								Venue Info
							</Text>
							<RouterLink to={`/spot/${event?.spot?.spot_name}`}>
								<Text color='primary' fontSize='24px' fontWeight='700'>
									{event?.spot?.spot_name}
								</Text>
							</RouterLink>
							<Text fontSize='14px' fontWeight='700'>
								{event?.spot?.address?.street}&nbsp;
								{event?.spot?.address?.number}
								,&nbsp;{event?.spot?.address?.city},&nbsp;
								{event?.spot?.address?.country}
							</Text>
							<Flex
								bgImage='https://pliki.spodekkatowice.pl/i/09/09/22/qnm76xry41pr8dv5_r2_940.jpg'
								w='100%'
								h='20vh'
								backgroundPosition='center'
								bgSize='cover'
								zIndex='1'
								borderRadius='16px'></Flex>
						</Flex>
						<Flex flexDir='column' gap='16px'>
							<Text fontSize='24px' fontWeight='600'>
								Discussion
							</Text>
						</Flex>
					</Grid>
				)}
				{view === Views.TICKETS && !loading && (
					<Flex flexDir='column' gap='8px' w='100%'>
						<Flex gap='16px' align='center'>
							<Button
								borderRadius='20px'
								color='white'
								bgColor='primary'
								_hover={{ bgColor: 'primary', opacity: '0.9' }}
								onClick={() => setView(Views.MAIN)}>
								Go back
							</Button>
							<Text fontSize='24px' fontWeight='600'>
								Available tickets
							</Text>
						</Flex>
						<Flex
							maxH='80vh'
							overflowY='auto'
							flexDir='column'
							gap='4px'
							w='100%'>
							{tickets !== undefined &&
								tickets.map((ticket: any) => {
									if (ticket.isavailable === true) {
										return (
											<Flex
												key={ticket?.ticket_id}
												w='100%'
												p='12px 16px'
												bgColor='backgroundTernary'
												justify='space-between'
												align='center'
												borderRadius='8px'>
												<Text fontSize='14px' fontWeight='600'>
													Place: {ticket?.ticket_place}
												</Text>
												<Flex gap='8px' align='center'>
													<Text fontSize='18px' fontWeight='700'>
														{new Intl.NumberFormat('en-US', {
															style: 'currency',
															currency: 'PLN',
														}).format(ticket?.price)}
													</Text>
													<Button
														borderRadius='20px'
														color='white'
														bgColor='primary'
														_hover={{ bgColor: 'primary', opacity: '0.9' }}
														onClick={() =>
															handleBuy(ticket?.ticket_id, ticket?.price)
														}
														isLoading={buying === ticket?.ticket_id}>
														Buy
													</Button>
												</Flex>
											</Flex>
										);
									} else return <></>;
								})}
						</Flex>
					</Flex>
				)}
			</Flex>
		</PageContainer>
	);
};
