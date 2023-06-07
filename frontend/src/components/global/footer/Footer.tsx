import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { PageContainer } from '../../shared/containers/PageContainer';

export const Footer = () => {
	return (
		<Flex w='100vw' bgColor='blackAlpha.800' color='white' fontSize='12px'>
			<PageContainer>
				<Flex w='100%' justify='space-between'>
					<Text>Copyright © 2023 by TheBois All Rights Reserved.</Text>
					<Text>® EventEase</Text>
				</Flex>
			</PageContainer>
		</Flex>
	);
};
