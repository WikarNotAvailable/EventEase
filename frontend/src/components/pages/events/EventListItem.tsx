import { Flex, Image, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';

interface IEventListItemProps {
	event: any;
}

export const EventListItem: FC<IEventListItemProps> = ({ event }) => {
	return (
		<Flex
			w='100%'
			p='12px 16px'
			bgColor='backgroundTernary'
			borderRadius='15px'
			align='center'
			justify='space-between'
			gap='8px'
			_hover={{ opacity: '0.9' }}>
			<Flex gap='16px' align='center'>
				<Image
					src={event?.event_images[0]?.image_url}
					// h='100%'
					w='250px'
					h='150px'
					borderRadius='12px'
				/>
				<Flex flexDir='column' gap='8px'>
					<Text fontSize='24px' fontWeight='700'>
						{event?.name}
					</Text>
					<Text>{new Date(event?.begindate).toLocaleDateString()}</Text>
					<Text fontSize='14px' fontWeight='600'>
						{event?.spot?.spot_name}
					</Text>
				</Flex>
			</Flex>
			<ChevronRightIcon boxSize='35px' />
		</Flex>
	);
};
