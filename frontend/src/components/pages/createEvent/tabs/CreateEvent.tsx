import {
	Button,
	Flex,
	Input,
	Select,
	Spinner,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import api from '../../../../api/api';

export const CreateEvent = () => {
	const [name, setName] = useState<string>('');
	const [typeID, setTypeID] = useState<number>(0);
	const [artistID, setArtistID] = useState<number>(0);
	const [organizerID, setOrganizerID] = useState<number>(0);
	const [venueID, setVenueID] = useState<number>(0);
	const [ticketsAmount, setTicketsAmount] = useState<number>(0);
	const [ticketPrice, setTicketPrice] = useState<number>(0);
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const [artists, setArtists] = useState<any>();
	const [venues, setVenues] = useState<any>();
	const [organizers, setOrganizers] = useState<any>();
	const [eventTypes, setEventTypes] = useState<any>();

	const [loading, setLoading] = useState<boolean>(false);
	const [submitting, setSubmitting] = useState<boolean>(false);

	const toast = useToast();

	const handleSubmit = async () => {
		console.log({
			name: name,
			typeID: typeID,
			artistID: artistID,
			organizerID: organizerID,
			venueID: venueID,
			ticketsAmount: ticketsAmount,
			ticketPrice: ticketPrice,
			startDate: startDate,
			endDate: endDate,
			image: image,
			description: description,
		});
		const eventData = {
			name: name,
			description: description,
			begindate: startDate,
			enddate: endDate,
			availabletickets: ticketsAmount,
			currentlytakentickets: 0,
			spot_id: venueID,
			eventtype_id: typeID,
			company_id: organizerID,
		};

		setSubmitting(true);
		const res = await api.addEvent(eventData);
		console.log('res', res);

		if (res.status < 300) {
			console.log(res);
			const imageData = { url: image, event_id: res.data.event_id };
			const ticketsData = {
				ticketTypeID: 1,
				eventID: res.data.event_id,
				price: ticketPrice,
				withPlaces: true,
			};
			const res2 = await api.addEventImage(imageData);
			if (res2.status < 300) {
				console.log(res2);
			} else {
				setSubmitting(false);
				errorToast();
			}
			const res3 = await api.addTickets(ticketsData, ticketsAmount);
			if (res3.status < 300) {
				console.log(res3);
			} else {
				setSubmitting(false);
				errorToast();
			}
			const res4 = await api.asignArtistToEvent({
				event_id: res.data.event_id,
				performer_id: artistID,
			});
			if (res4.status < 300) {
				console.log(res4);
				setSubmitting(false);
				toast({
					title: 'Successfully created event...',
					status: 'success',
					duration: 9000,
					isClosable: true,
					position: 'top',
				});
			} else {
				setSubmitting(false);
				errorToast();
			}
		} else {
			setSubmitting(false);
			errorToast();
		}
	};

	const errorToast = () => {
		toast({
			title: 'Something went wrong...',
			status: 'error',
			duration: 9000,
			isClosable: true,
			position: 'top',
		});
	};

	const getArtists = async () => {
		setLoading(true);
		const res = await api.getArtists();

		if (res.status < 300) {
			console.log(res);
			setArtists(res.data);
			setLoading(false);
		} else {
			setLoading(false);
			errorToast();
		}
	};
	const getVenues = async () => {
		setLoading(true);
		const res = await api.getSpots();
		console.log(res);
		if (res.status < 300) {
			console.log(res);
			setVenues(res.data);
			setLoading(false);
		} else {
			setLoading(false);
			errorToast();
		}
	};
	const getOrganizers = async () => {
		setLoading(true);
		const res = await api.getCompanies();

		if (res.status < 300) {
			console.log(res.data);
			setOrganizers(res.data);
			setLoading(false);
		} else {
			setLoading(false);
			errorToast();
		}
	};
	const getEventTypes = async () => {
		setLoading(true);
		const res = await api.getEventTypes();

		if (res.status === 200) {
			console.log(res.data);
			setEventTypes(res.data);
			setLoading(false);
		} else {
			setLoading(false);
			errorToast();
		}
	};

	const getData = () => {
		getArtists();
		getVenues();
		getOrganizers();
		getEventTypes();
	};

	useEffect(() => {
		getData();
		//eslint-disable-next-line
	}, []);

	if (loading) return <Spinner />;
	else
		return (
			<Flex flexDir='column' gap='8px' w='100%'>
				<Flex gap='8px'>
					<Input
						placeholder='Event name'
						value={name}
						onChange={(e: any) => setName(e.target.value)}
					/>
					<Select
						placeholder='Event type'
						value={typeID}
						onChange={(e: any) => {
							console.log(e);
							setTypeID(+e.target.value);
						}}>
						{eventTypes?.map((eventType: any) => (
							<option value={eventType?.eventtype_id}>{eventType?.name}</option>
						))}
					</Select>
				</Flex>
				<Textarea
					placeholder='Event description'
					value={description}
					onChange={(e: any) => setDescription(e.target.value)}
				/>
				<Flex gap='8px'>
					<Input
						placeholder='Start date'
						type='date'
						value={startDate}
						onChange={(e: any) => setStartDate(e.target.value)}
					/>
					<Input
						placeholder='End date'
						type='date'
						value={endDate}
						onChange={(e: any) => setEndDate(e.target.value)}
					/>
				</Flex>
				<Flex gap='8px'>
					<Input
						placeholder='Image url'
						value={image}
						onChange={(e: any) => setImage(e.target.value)}
					/>
					<Select
						placeholder='Artist'
						value={artistID}
						onChange={(e: any) => setArtistID(+e.target.value)}>
						{artists?.map((artist: any) => (
							<option value={artist?.performer_id}>{artist?.name}</option>
						))}
					</Select>
				</Flex>
				<Flex gap='8px'>
					<Select
						placeholder='Organizer'
						value={organizerID}
						onChange={(e: any) => setOrganizerID(+e.target.value)}>
						{organizers?.map((organizer: any) => (
							<option value={organizer?.company_id}>{organizer?.name}</option>
						))}
					</Select>
					<Select
						placeholder='Venue'
						value={venueID}
						onChange={(e: any) => setVenueID(+e.target.value)}>
						{venues?.map((venue: any) => (
							<option value={venue?.spot_id}>{venue?.name}</option>
						))}
					</Select>
				</Flex>
				<Flex gap='8px'>
					<Input
						placeholder='Amount of tickets'
						type='number'
						value={ticketsAmount}
						onChange={(e: any) => setTicketsAmount(+e.target.value)}
					/>
					<Input
						placeholder='Ticket price'
						type='number'
						value={ticketPrice}
						onChange={(e: any) => setTicketPrice(+e.target.value)}
					/>
				</Flex>
				<Button
					isLoading={submitting}
					bgColor='primary'
					_hover={{ bgColor: 'primary', opacity: '0.9' }}
					color='white'
					w='100%'
					onClick={handleSubmit}>
					Create
				</Button>
			</Flex>
		);
};
