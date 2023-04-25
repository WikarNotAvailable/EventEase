import React, { FC } from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'

interface IGlobalModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    headerText: string;
}

export const GlobalModal: FC<IGlobalModalProps> = ({isOpen, onClose, children, headerText}) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom' size="xl">
        <ModalOverlay bg='blackAlpha.300'
            backdropFilter='blur(10px)'/>
        <ModalContent bgColor="backgroundPrimary">
          <ModalHeader color="secondary" fontWeight="700">{headerText}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mt="32px" p="24px">
            {children}
          </ModalBody>
        </ModalContent>
    </Modal>
  )
}
