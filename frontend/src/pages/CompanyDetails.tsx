import { Flex, Grid, Link, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { PageContainer } from '../components/shared/containers/PageContainer';

export const CompanyDetails = () => {
	const [company, setCompany] = useState<any>();
	const [loading, setLoading] = useState(true);
	const [descriptionFull, setDescriptionFull] = useState(false);

	const { id } = useParams();
	const toast = useToast();

	const getCompany = async () => {
		const res = await api.getCompanyById(id!);

		if (res.status === 200) {
			console.log(res.data);
			setCompany(res.data);
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
						</Flex>
						<Flex flexDir='column' gap='16px'>
							<Text fontSize='24px' fontWeight='600'>
								Company events
							</Text>
						</Flex>
					</Grid>
				)}
			</Flex>
		</PageContainer>
	);
};
