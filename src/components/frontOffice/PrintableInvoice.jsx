import React, { forwardRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Container,
  Heading,
  Text,
  Image,
  Center,
  Stack,
  SimpleGrid,
  Flex,
  Divider,
  List,
  ListItem,
  chakra,
  HStack,
  FormControl,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactToPrint from "react-to-print";

const PrintableInvoice = forwardRef(({invoices, reservasi, customer,transaksiFasilitas,transaksiKamars, formatDateToDateString },ref) => {
    return (
      <Box ref={ref}>
        <Center>
          <Box w={600} p="2" m={3} border="1px solid black">
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
              <Heading as="h3" size="sm" fontWeight="bold">
                INVOICE
              </Heading>
            </Center>
            <Divider mb="2" mt={1} />
            <Flex>
              <Box pt={3} className=" w-1/2 flex justify-between"></Box>
              <Box pt={3} className=" w-1/2 flex justify-between">
                <Text fontWeight="semibold">Tanggal</Text>
                <Text>{formatDateToDateString(invoices.tgl_invoice)}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box className=" w-1/2 flex justify-between"></Box>
              <Box className=" w-1/2 flex justify-between">
                <Text fontWeight="semibold">Invoice Number</Text>
                <Text>{invoices.no_invoice}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box className=" w-1/2 flex justify-between"></Box>
              <Box className=" w-1/2 flex justify-between">
                <Text fontWeight="semibold">Front Office</Text>
                <Text>{invoices.front_office}</Text>
              </Box>
            </Flex>
            <Flex mt={6}>
              <Box className=" w-2/3 flex justify-between">
                <Flex>
                  <Text fontWeight="semibold">ID Booking</Text>
                  <Box ml={7}>
                    <Text>{reservasi.booking_id}</Text>
                  </Box>
                </Flex>
              </Box>
              <Box className=" w-1/3 flex justify-between"></Box>
            </Flex>
            <Flex>
              <Box className=" w-2/3 flex justify-between">
                <Flex>
                  <Text fontWeight="semibold">Nama</Text>
                  <Box ml={16}>
                    <Text>{customer.nama}</Text>
                  </Box>
                </Flex>
              </Box>
              <Box className=" w-1/3 flex justify-between"></Box>
            </Flex>
            <Flex>
              <Box className=" w-4/5 flex justify-between">
                <Flex>
                  <Text fontWeight="semibold">Alamat</Text>
                  <Box ml={14}>
                    <Text>{customer.alamat}</Text>
                  </Box>
                </Flex>
              </Box>
              <Box className=" w-1/5 flex justify-between"></Box>
            </Flex>
            <Divider mb={1} mt={2} />
            <Center>
              <Heading as="h3" size="sm" fontWeight="bold">
                DETAIL
              </Heading>
            </Center>
            <Divider mb="2" mt={1} />
            <Flex>
              <Box className=" w-2/3 flex justify-between">
                <Flex>
                  <Text fontWeight="semibold">Check In</Text>
                  <Box ml={12}>
                    <Text>
                      {formatDateToDateString(reservasi.tanggal_checkin)}
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box className=" w-1/3 flex justify-between"></Box>
            </Flex>
            <Flex>
              <Box className=" w-2/3 flex justify-between">
                <Flex>
                  <Text fontWeight="semibold">Check Out</Text>
                  <Box ml={8}>
                    <Text>
                      {formatDateToDateString(reservasi.tanggal_checkout)}
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box className=" w-1/3 flex justify-between"></Box>
            </Flex>
            <Flex>
              <Box className=" w-4/5 flex justify-between">
                <Flex>
                  <Text fontWeight="semibold">Dewasa</Text>
                  <Box ml={14}>
                    <Text>{reservasi.jumlah_dewasa}</Text>
                  </Box>
                </Flex>
              </Box>
              <Box className=" w-1/5 flex justify-between"></Box>
            </Flex>
            <Flex>
              <Box className=" w-4/5 flex justify-between">
                <Flex>
                  <Text fontWeight="semibold">Anak-anak</Text>
                  <Box ml={8}>
                    <Text>{reservasi.jumlah_anak}</Text>
                  </Box>
                </Flex>
              </Box>
              <Box className=" w-1/5 flex justify-between"></Box>
            </Flex>
            <Divider mb={1} mt={2} />
            <Center>
              <Heading as="h3" size="sm" fontWeight="bold">
                KAMAR
              </Heading>
            </Center>
            <Divider mb="2" mt={1} />
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Jenis Kamar</Th>
                  <Th>Bed</Th>
                  <Th>Jumlah</Th>
                  <Th>Harga</Th>
                  <Th>Sub Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transaksiKamars.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.tarif.kamar.jenis_kamar}</Td>
                    <Td>{item.tarif.kamar.jenis_bed}</Td>
                    <Td>1</Td>
                    <Td>Rp {item.tarif.besaran_tarif}</Td>
                    <Td>Rp {item.subtotal}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Divider mb={1} mt={2} />
            <Center>
              <Heading as="h3" size="sm" fontWeight="bold">
                LAYANAN
              </Heading>
            </Center>
            <Divider mb="2" mt={1} />
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Layanan</Th>
                  <Th>Tanggal</Th>
                  <Th>Jumlah</Th>
                  <Th>Harga</Th>
                  <Th>Sub Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transaksiFasilitas.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.fasilitas.nama_fasilitas}</Td>
                    <Td>{formatDateToDateString(item.tanggal_pemesanan)}</Td>
                    <Td>{item.jumlah}</Td>
                    <Td>Rp {item.fasilitas.harga}</Td>
                    <Td>Rp {item.subtotal}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Divider my="4" />
            <Flex>
              <Box pt={3} className=" w-1/2 flex justify-between"></Box>
              <Box pt={3} className=" w-1/2 flex justify-between">
                <Text>Tax</Text>
                <Text>Rp {invoices.total_tax}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box className=" w-1/2 flex justify-between"></Box>
              <Box className=" w-1/2 flex justify-between">
                <Text fontWeight="bold">Total Harga</Text>
                <Text fontWeight="bold">Rp {invoices.total_harga}</Text>
              </Box>
            </Flex>
            <Divider></Divider>
            <Flex mt={3}>
              <Box className=" w-1/2 flex justify-between"></Box>
              <Box className=" w-1/2 flex justify-between">
                <Text>Jaminan</Text>
                <Text>Rp {invoices.total_jaminan}</Text>
              </Box>
            </Flex>

            <Flex>
              <Box className=" w-1/2 flex justify-between"></Box>
              <Box className=" w-1/2 flex justify-between">
                <Text>Deposit</Text>
                <Text>Rp {invoices.total_deposit}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box className=" w-1/2 flex justify-between"></Box>
              <Box className=" w-1/2 flex justify-between">
                <Text fontWeight="bold">{invoices.total_pelunasan < 0 ? "Total Sisa/Kelebihan" : "Total Kekurangan"}</Text>
                <Text fontWeight="bold">Rp {invoices.total_pelunasan  < 0 ? -invoices.total_pelunasan  : invoices.total_pelunasan }</Text>
              </Box>
            </Flex>
          </Box>
        </Center>
      </Box>
    );
  }
);

export default PrintableInvoice;
