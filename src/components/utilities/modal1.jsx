import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

function LoginModal({ isOpen, onClose, onLogin }) {
  const handleLogin = () => {
    Navigate('/login');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Add your login form or input fields here */}
          {/* For example, username and password input fields */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
