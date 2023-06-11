import { Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import { CarouselPhoto } from './CarouselPhoto';

import 'swiper/css';
import 'swiper/css/navigation';
import { FC, useEffect, useState } from 'react';
import api from '../../../../api/api';
import { Link } from 'react-router-dom';

interface ICategoryCarouselProps {
	typeID: string;
}

export const CategoryCarousel: FC<ICategoryCarouselProps> = ({ typeID }) => {
	const [events, setEvents] = useState<any>();
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const getEvents = async () => {
		const res = await api.getEventsByType(typeID);

		if (res.status === 200) {
			console.log(res.data);
			setEvents(res.data);
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
		getEvents();
	}, []);

	const breakpoints = {
		// when window width is >= 640px
		0: {
			slidesPerView: 1,
			spaceBetween: 2,
		},
		// when window width is >= 768px
		768: {
			slidesPerView: 2,
			spaceBetween: 3,
		},
	};

	return (
		<Flex width='inherit' marginBottom={2} alignItems='center'>
			{loading ? (
				<Spinner />
			) : (
				<Swiper
					navigation
					autoplay={{
						delay: 3500,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					slidesPerView={3}
					spaceBetween={3}
					loop
					breakpoints={breakpoints}
					centeredSlides
					modules={[Navigation, Autoplay]}>
					{events?.map((event: any) => (
						<SwiperSlide key={event?.event_id}>
							<Link to={`/events/${event?.event_id}`}>
								<CarouselPhoto
									image={event?.event_images[0]?.image_url}
									eventName={event?.name}
									eventSpotName={event?.spot?.spot_name}
									eventSpotCity={event?.spot?.address?.city}
									eventDate={
										new Date(event?.begindate).toLocaleString().split(',')[0]
									}
								/>
							</Link>
							<Text cursor={'default'} textColor={'#F9FAFB'}>
								coś się zbugowało i nie renderuje bez tekstu a wcześniej
								działało xd
							</Text>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</Flex>
	);
};
