import {
	Button,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import api from '../../../api/api';

export const NavSearch = () => {
	const [events, setEvents] = useState<any>();
	const [filteredEvents, setFilteredEvents] = useState<any>([]);
	const [search, setSearch] = useState<string>('');

	const handleSearch = (e: any) => {
		setSearch(e.target.value);
		setFilteredEvents(
			events?.filter((event: any) =>
				event?.name?.toLowerCase().includes(e.target.value?.toLowerCase())
			)
		);
		console.log(filteredEvents);
	};

	const getEvents = async () => {
		const res = await api.getEvents();

		if (res.status === 200) {
			console.log(res.data);
			setEvents(res.data);
		} else {
			alert('Cannot get events:(');
		}
	};

	useEffect(() => {
		getEvents();
		//eslint-disable-next-line
	}, []);

	return (
		<InputGroup ml='16px' position='relative'>
			<Input
				border='1px solid #696F8C'
				focusBorderColor='#696F8C'
				placeholder='Search for events'
				alignItems='center'
				_hover={{ border: '1px solid rgba(0, 0, 0, 0.9)' }}
				textColor='textPrimary'
				_placeholder={{ color: 'textPrimary', fontSize: '12px' }}
				fontSize='12px'
				minWidth='280px'
				borderRadius='20px'
				value={search}
				onChange={handleSearch}
			/>
			<InputRightElement w='12%'>
				<Button
					display='flex'
					alignItems='center'
					justifyContent='center'
					variant='unstyled'
					borderRadius='50%'
					bgColor='primary'>
					<AiOutlineSearch color='white' />
				</Button>
			</InputRightElement>
			{search.length > 1 && (
				<Flex
					position='absolute'
					borderRadius='16px'
					bgColor='white'
					top='40px'
					left='0'
					h=''
					maxH='20vh'
					w='100%'
					flexDir='column'
					boxShadow='0px 12px 40px rgba(16, 24, 64, 0.24)'>
					{filteredEvents.map((event: any) => (
						<Link
							to={`/events/${event?.event_id}`}
							key={event?.event_id}
							onClick={() => setSearch('')}>
							<Flex
								_hover={{ bg: 'rgba(0, 0, 0, 0.05)' }}
								w='100%'
								borderRadius='16px'
								p='8px 16px'
								fontSize='14px'>
								{event?.name}
							</Flex>
						</Link>
					))}
				</Flex>
			)}
		</InputGroup>
	);
};
