import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

export const ProfileData = () => {
  const user = {
    name: 'Arkadiusz',
    surname: 'Nowak',
    birthDate: '1990-01-01',
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      width="fit-content"
      backgroundColor="primary"
      padding="4"
      borderRadius="10px"
      boxShadow="lg"
      textColor="#101828"
      position="absolute"
      top="300%"
    >
      <Text textAlign="center" fontSize="32" fontWeight="bold" marginBottom="2">
        {`${user.name} ${user.surname}`}
      </Text>

      <Text textAlign="center" fontSize="20">
        Birth Date: {user.birthDate}
      </Text>
    </Flex>
  );
};
