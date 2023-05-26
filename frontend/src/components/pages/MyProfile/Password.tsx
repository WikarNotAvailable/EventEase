import React, { useState } from 'react';
import { Box, Button, Input, Stack } from '@chakra-ui/react';

export const Password = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = () => {
    const isCurrentPasswordCorrect = verifyCurrentPassword();

    if (!isCurrentPasswordCorrect) {
      setErrorMessage('Incorrect current password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match');
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setIsOpen(false); 
  };

  const verifyCurrentPassword = () => {
    const correctPassword = 'haslo123';
    return currentPassword === correctPassword;
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <Box position="absolute" top="auto">
      <Stack spacing={4}>
        <Input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <Button colorScheme="blue" onClick={handleChangePassword}>
          Change Password
        </Button>
        <Button colorScheme="red" onClick={handleCancel}>
          Back
        </Button>
        {errorMessage && <Box color="red">{errorMessage}</Box>}
      </Stack>
    </Box>
  );
};
