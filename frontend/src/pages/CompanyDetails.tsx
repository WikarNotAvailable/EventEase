import {
	Button,
	Flex,
	Grid,
	Image,
	Input,
	Link,
	Spinner,
	Text,
	useToast,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { PageContainer } from '../components/shared/containers/PageContainer';
import useUserContext from '../provider/user';

export const CompanyDetails = () => {
	const [company, setCompany] = useState<any>();
	const [discussion, setDiscussion] = useState<any>();
	const [events, setEvents] = useState<any>();
	const [commentInput, setCommentInput] = useState<string>('');
	const [loading, setLoading] = useState(true);
	const [descriptionFull, setDescriptionFull] = useState(false);

	const { id } = useParams();
	const toast = useToast();

	const { userID, isLoggedIn } = useUserContext();

	const handleCommentInput = (e: any) => {
		setCommentInput(e.target.value);
	};

	const postComment = async () => {
		if (isLoggedIn) {
			setCommentInput('');
			setLoading(true);
			const res = await api.postCommentToDiscussion(
				discussion?.discussion_id,
				commentInput,
				new Date().toLocaleString(),
				userID
			);
			if (res.status === 201) {
				console.log(res.data);
				await getCompany();
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

	const getCompany = async () => {
		const res = await api.getCompanyById(id!);

		if (res.status === 200) {
			console.log(res.data);
			setCompany(res.data);
			setLoading(false);
			const res2 = await getDiscussion(res.data?.discussion?.discussion_id);
			if (res2.status === 200) {
				console.log(res2.data);
				setDiscussion(res2.data);
				const res3 = await getEvents(res.data?.company_id);
				if (res3.status === 200) {
					console.log('events', res3.data);
					setEvents(res3.data?.slice(0, 5));
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

	const getDiscussion = async (id: string) => {
		const res = await api.getDiscussionById(id!);
		return res;
	};

	const getEvents = async (id: string) => {
		const res = await api.getEventsByCompany(id!);
		return res;
	};

	useEffect(() => {
		getCompany();
		// eslint-disable-next-line
	}, []);

	return (
		<PageContainer>
			<Flex minH='80vh' w='100%'>
				{loading && <Spinner />}
				{!loading && (
					<Grid templateColumns='3fr 1fr' gridGap='64px' w='100%'>
						<Flex flexDir='column' gap='16px'>
							<Text fontSize='24px' fontWeight='600'>
								{company?.name}
							</Text>
							<Text fontSize='16px'>
								{company?.description?.length > 100 ? (
									<Text fontSize='16px'>
										{descriptionFull
											? company?.description
											: company?.description?.slice(0, 100)}
										<Link
											color='primary'
											onClick={() => setDescriptionFull((prev) => !prev)}>
											{descriptionFull ? '...Show less' : '...Show more'}
										</Link>
									</Text>
								) : (
									<Text fontSize='16px'>{company?.description}</Text>
								)}
							</Text>
							<Text fontSize='24px' fontWeight='600' mt='128px'>
								Discussion
							</Text>
							<Flex align='center' gap='8px' w='100%'>
								<Input
									placeholder='Post your opinion...'
									value={commentInput}
									onChange={handleCommentInput}
									onKeyDown={(e: any) => {
										if (e.key === 'Enter') postComment();
									}}
								/>
								<Button
									bgColor='primary'
									_hover={{ bgColor: 'primary', opacity: '0.9' }}
									color='white'
									onClick={() => postComment()}>
									Post
								</Button>
							</Flex>
							<Flex flexDir='column' gap='4px' maxH='70vh' overflow='auto'>
								{discussion?.comment !== undefined &&
									Array.from(discussion?.comment)
										?.reverse()
										?.map((comment: any) => (
											<Flex
												justify='space-between'
												align='center'
												bgColor='backgroundTernary'
												p='12px 16px'
												borderRadius='8px'
												key={comment?.comment_id}>
												<Flex gap='32px'>
													<Flex
														justify='center'
														align='center'
														fontSize='12px'
														fontWeight='300'
														borderRadius='50%'
														boxSize='40px'
														bgColor='secondary'
														color='white'>
														{'A'}
													</Flex>
													<Text fontSize='12px' fontWeight='600' maxW='75%'>
														{comment?.content}
													</Text>
												</Flex>
												<Text>
													{
														new Date(comment?.post_date)
															.toLocaleString()
															.split(',')[0]
													}
												</Text>
											</Flex>
										))}
							</Flex>
						</Flex>
						<Flex flexDir='column' gap='16px'>
							<Text fontSize='24px' fontWeight='600'>
								Company events
							</Text>
							{events?.map((event: any) => (
								<RouterLink
									to={`/events/${event?.event_id}`}
									key={event?.event_id}>
									<Flex
										p='6px 8px'
										borderRadius='8px'
										w='100%'
										flexDir='column'
										gap='8px'
										bgColor='backgroundTernary'>
										<Image
											src='https://goingapp.pl/more/wp-content/uploads/2023/02/Metallica-1600x996.jpeg'
											w='100%'
											borderRadius='4px'
										/>
										<Flex flexDir='column'>
											<Text fontSize='14px' color='primary' fontWeight='700'>
												{event?.name}
											</Text>
											<Text fontSize='12px'>
												{
													new Date(event?.begindate)
														.toLocaleString()
														.split(',')[0]
												}
											</Text>
											<Text fontSize='12px' fontWeight='700'>
												{event?.spot?.spot_name} - {event?.spot?.address?.city}
											</Text>
										</Flex>
									</Flex>
								</RouterLink>
							))}
						</Flex>
					</Grid>
				)}
			</Flex>
		</PageContainer>
	);
};
