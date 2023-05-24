import React, { useState } from 'react';
import { Flex, Text, Button, Input } from '@chakra-ui/react';

export const ProfileData = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Arkadiusz');
  const [surname, setSurname] = useState('Nowak');
  const [birthDate, setBirthDate] = useState('1990-01-01');
  const [phoneNumber, setPhoneNumber] = useState('123-123-321');
  const [email] = useState('arkadiusz.nowak@gmail.com');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
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
        {isEditing ? (
          <>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              marginBottom="2"
            />
            <Input
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Enter surname"
              marginBottom="2"
            />
          </>
        ) : (
          `${name} ${surname}`
        )}
      </Text>

      <Text textAlign="center" fontSize="20">
        {isEditing ? (
          <Input
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="Enter birth date"
            marginBottom="2"
          />
        ) : (
          birthDate
        )}
      </Text>

      <Text textAlign="center" fontSize="20">
        {isEditing ? (
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            marginBottom="2"
          />
        ) : (
          phoneNumber
        )}
      </Text>

      <Text textAlign="center" fontSize="20">
        Email: {email}
      </Text>

      {isEditing ? (
        <Button onClick={handleSave} marginTop="2">
          Save
        </Button>
      ) : (
        <Button onClick={handleEdit} marginTop="2">
          Edit
        </Button>
      )}
    </Flex>
  );
};
