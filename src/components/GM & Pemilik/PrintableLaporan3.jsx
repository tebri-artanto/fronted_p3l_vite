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
  Select,
  Flex,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactToPrint from "react-to-print";

const PrintableLaporan3 = forwardRef(({bulan}, ref) => {
  const [laporan3, setLaporan3] = useState([]);
  const [totalJumlah, setTotalJumlah] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");

  const months = [
    { value: 1, label: "Januari" },
    { value: 2, label: "Februari" },
    { value: 3, label: "Maret" },
    { value: 4, label: "April" },
    { value: 5, label: "Mei" },
    { value: 6, label: "Juni" },
    { value: 7, label: "Juli" },
    { value: 8, label: "Agustus" },
    { value: 9, label: "September" },
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "Desember" },
    { value: "", label: "Semua"},
  ];

  useEffect(() => {
    console.log(currentMonth);
    console.log(bulan);
    const getInvociebyId = async () => {
      const response = await axios.get(
        `http://localhost:8000/laporans/laporan3/${bulan}`
      );
      setLaporan3(response.data);
      console.log(response.data);
    };
    getInvociebyId();
  }, [bulan]);

  useEffect(() => {
    const calculateTotalJumlah = () => {
      let sum = 0;
      laporan3.forEach((item) => {
        sum += item.Total;
      });
      setTotalJumlah(sum);
    };
    calculateTotalJumlah();
  }, [laporan3]);

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

  // useEffect(() => {
  //   const getCurrentMonth = () => {
  //     const options = {
  //       month: "long",
  //       timeZone: "Asia/Jakarta",
  //     };
  //     const month = new Date().toLocaleDateString("id-ID", options);
  //     setCurrentMonth(month);
  //   };
  //   getCurrentMonth();
  // }, []);

  

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
            LAPORAN JUMLAH TAMU				

            </Heading>
          </Center>

          <Divider mb="2" mt={1} />
          <Text mt={5} >
            Tahun : {currentYear}
          </Text>
          <Flex alignItems="center">
            <Text mr={2}>Bulan:</Text>
            <Select border="none" value={bulan} disabled>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </Select>
          </Flex>
          
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th textAlign="center">No</Th>
                <Th textAlign="center">Jenis Kamar</Th>
                <Th textAlign="center">Group</Th>
                <Th textAlign="center">Personal</Th>
                <Th textAlign="center">Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {laporan3.map((item, index) => (
                <Tr key={item.id}>
                  <Td textAlign="center">{index + 1}</Td>
                  <Td textAlign="center">{item.Jenis_kamar}</Td>
                  <Td textAlign="center">{item.Grup}</Td>
                  <Td textAlign="center">{item.Personal}</Td>
                  <Td textAlign="center">{item.Total}</Td>
                </Tr>
              ))}
              <Tr>
                <Td textAlign="center"></Td>
                <Td textAlign="center"></Td>
                <Td textAlign="center"></Td>
                <Td textAlign="center">Total</Td>
                <Td textAlign="center">{totalJumlah}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Text mt={5} mb={5} textAlign="right">
            Dicetak tanggal {formattedDate}
          </Text>
        </Box>
      </Center>
    </Box>
  );
}
);

export default PrintableLaporan3;
