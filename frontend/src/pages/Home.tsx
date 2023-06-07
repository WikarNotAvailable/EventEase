import { CategoryCarousel } from '../components/pages/home/carousel/CategoryCarousel';

import 'swiper/css';
import { CategoryName } from '../components/pages/home/carousel/CategoryName';
import { PageContainer } from '../components/shared/containers/PageContainer';
import { Flex, Spinner, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import api from '../api/api';

export const Home = () => {
	const [eventTypes, setEventTypes] = useState<any>();
	const [loading, setLoading] = useState(true);

	const toast = useToast();

	const getEventTypes = async () => {
		const res = await api.getEventTypes();

		if (res.status === 200) {
			console.log(res.data);
			setEventTypes(res.data);
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
		getEventTypes();
		//eslint-disable-next-line
	}, []);

	return (
		<PageContainer isCentered>
			<Flex flexDir='column' w='100%' align='center' minH='80vh'>
				{loading ? (
					<Spinner />
				) : (
					eventTypes.map((eventType: any) => (
						<Flex
							key={eventType?.eventtype_id}
							flexDir='column'
							w='100%'
							align='center'>
							<CategoryName text={eventType?.name}></CategoryName>
							<CategoryCarousel typeID={eventType?.eventtype_id} />
						</Flex>
					))
				)}
			</Flex>
		</PageContainer>
	);
};
