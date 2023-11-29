import React, { forwardRef, useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
  Text,
  Image,
  Center,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactToPrint from "react-to-print";

const PrintableLaporan4 = forwardRef(({}, ref) => {
  const [laporan4, setLaporan4] = useState([]);
  const [totalJumlah, setTotalJumlah] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const getInvociebyId = async () => {
      const response = await axios.get(
        "http://localhost:8000/laporans/laporan4"
      );
      setLaporan4(response.data.data);
      console.log(response.data.data);
    };
    getInvociebyId();
  }, []);

  useEffect(() => {
    const calculateTotalJumlah = () => {
      let sum = 0;
      laporan4.forEach((item) => {
        sum += item.Total;
      });
      setTotalJumlah(sum);
    };
    calculateTotalJumlah();
  }, [laporan4]);

  const formatFloat = (value) => {
    return parseFloat(value).toLocaleString();
  };

  useEffect(() => {
    const getCurrentYear = () => {
      const year = new Date().getFullYear();
      setCurrentYear(year);
    };
    getCurrentYear();
  }, []);

  useEffect(() => {
    const getFormattedDate = () => {
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      };
      const date = new Date().toLocaleDateString("id-ID", options);
      setFormattedDate(date);
    };
    getFormattedDate();
  }, []);

  return (
    <Box ref={ref}>
      <Center>
        <Box w={500} p="2" m={3} border="1px solid black">
          {/* Add border style here */}
          <Center>
            <VStack spacing="-1">
              <Image
                width={65}
                src="https://storage.googleapis.com/image-storage-p3l/logo-kecik.png"
                alt="NextUI Album Cover"
                classNames="m-5"
              />
              <Heading as="h2" size="md" fontWeight="bold" color="inherit">
                Grand Atma Hotel
              </Heading>
              <Text fontSize="sm" color="gray.500" mt="2">
                Jl. P. Mangkubumi No.18, Yogyakarta 55233
              </Text>
              <Text fontSize="sm" color="gray.500">
                Telp. (0274) 487711
              </Text>
            </VStack>
          </Center>
          <Divider mb={1} mt={2} />
          <Center>
            <Heading as="h2" size="md" fontWeight="bold">
              LAPORAN 5 CUSTOMER RESERVASI TERBANYAK
            </Heading>
          </Center>

          <Divider mb="2" mt={1} />
          <Text mt={5} mb={5}>
            Tahun : {currentYear}
          </Text>
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th textAlign="center">No</Th>
                <Th textAlign="center">Nama Customer</Th>
                <Th textAlign="center">Jumlah Reservasi</Th>
                <Th textAlign="center">Total Pembayaran</Th>
              </Tr>
            </Thead>
            <Tbody>
              {laporan4.map((item, index) => (
                <Tr key={item.id}>
                  <Td textAlign="center">{index + 1}</Td>
                  <Td textAlign="center">{item.nama}</Td>
                  <Td textAlign="center">{item.jumlahReservasi}</Td>
                  <Td textAlign="center">
                    Rp {formatFloat(item.totalPembayaran)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Text mt={5} mb={5} textAlign="right">
            Dicetak tanggal {formattedDate}
          </Text>
        </Box>
      </Center>
    </Box>
  );
});

export default PrintableLaporan4;
