import { Box, Grid, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';

interface ICarouselProps {
	image: string;
	eventName: string;
	eventSpotName: string;
	eventSpotCity: string;
	eventDate: string;
}

export const CarouselPhoto: FC<ICarouselProps> = ({
	image,
	eventName,
	eventSpotName,
	eventSpotCity,
	eventDate,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Box
			backgroundImage={image}
			backgroundSize='cover'
			backgroundPosition='center'
			height='300px'
			width='100%'
			position='relative'
			cursor={'pointer'}
			borderRadius={10}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<Grid
				borderRadius={10}
				padding={1.5}
				top='82%'
				position={'absolute'}
				width={'100%'}
				backgroundColor={isHovered ? 'whiteAlpha.600' : 'whiteAlpha.400'}>
				<Text textColor={'white'} fontSize={15} fontWeight={'light'}>
					{eventName} - {eventDate}
				</Text>
			</Grid>
		</Box>
	);
};
