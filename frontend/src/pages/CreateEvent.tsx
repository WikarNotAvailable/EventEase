import {
	Flex,
	Grid,
	Tab,
	TabIndicator,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateCompany } from '../components/pages/createEvent/tabs/CreateCompany';
import { CreateEvent as CreateEventTab } from '../components/pages/createEvent/tabs/CreateEvent';
import { PageContainer } from '../components/shared/containers/PageContainer';
import useUserContext from '../provider/user';

export const CreateEvent = () => {
	const { userTypeID } = useUserContext();
	const navigate = useNavigate();

	console.log(userTypeID);
	if (userTypeID !== 2) navigate('/');

	return (
		<PageContainer>
			<Tabs w='100%' minH='80vh'>
				<TabList>
					<Tab _selected={{ color: 'primary' }}>Create company</Tab>
					<Tab _selected={{ color: 'primary' }}>Create event</Tab>
				</TabList>
				<TabIndicator
					mt='-1.5px'
					height='2px'
					bg='primary'
					position='absolute'
					borderRadius='1px'
				/>
				<TabPanels>
					<TabPanel>
						<CreateCompany />
					</TabPanel>
					<TabPanel>
						<CreateEventTab />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</PageContainer>
	);
};
