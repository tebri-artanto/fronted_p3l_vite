import React from "react";
import {
  Box,
  Text,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const ModalExecutiveDeluxe = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  description,
  price,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <img src={imageSrc} className="w-full h-auto" />
        <Box p={4} borderWidth="1px" borderRadius="md">
      {/* Room Title */}
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        KAMAR EXECUTIVE DELUXE
      </Text>
      {/* Capacity and Bed Options */}
      <Text fontSize="sm" mb={2}>
        Kapasitas: 2 orang | Pilihan tempat tidur: 1 king
      </Text>
      <Divider my={2} />
      {/* Room Features */}
      <Text fontSize="sm" fontWeight="bold" mb={2}>
        Fasilitas Utama:
      </Text>
      <Box>
        <Text fontSize="sm">- Internet: WiFi Gratis</Text>
        <Text fontSize="sm">- Hiburan: Televisi LCD dengan channel TV premium channels</Text>
        <Text fontSize="sm">- Makan Minum: Pembuat kopi/teh, minibar, layanan kamar 24-jam</Text>
        {/* Add more features as needed */}
      </Box>
      <Divider my={2} />
      {/* Additional Comforts */}
      <Text fontSize="sm" fontWeight="bold" mb={2}>
        Kenyamanan Tambahan:
      </Text>
      <Box>
        <Text fontSize="sm">- AC dan layanan pembenahan kamar harian</Text>
        <Text fontSize="sm">- Tempat tidur premium dan seprai kualitas premium</Text>
        {/* Add more comforts as needed */}
      </Box>
      <Divider my={2} />
      {/* Room Details */}
      <Text fontSize="sm" fontWeight="bold" mb={2}>
        Rincian Kamar:
      </Text>
      <Box>
        <Text fontSize="sm">- AC</Text>
        <Text fontSize="sm">- Air minum kemasan gratis</Text>
        <Text fontSize="sm">- Brankas dalam kamar (ukuran laptop)</Text>
        {/* Add more details as needed */}
      </Box>
    </Box>
          

        </ModalBody>
        <ModalFooter>
          {/* Add any additional footer content here */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalExecutiveDeluxe;
