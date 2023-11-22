import { useEffect, useState } from "react";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
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
  Link,
  Divider,
  List,
  ListItem,
  chakra,
  HStack,
  FormControl,
  Select,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import styled from "@emotion/styled";
import useProfileData from "../utilities/fetchUserData";
import { useLocation, useParams } from "react-router-dom";
import ModalConfirmation from "../utilities/modal2";
import { useNavigate } from "react-router-dom";

// Your React component code...

const PaymentPage = () => {
  const { user, customer } = useProfileData();
  const [nama, setNama] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [tanggal_reservasi, setTanggalReservasi] = useState("");
  const [waktu_reservasi, setWaktuReservasi] = useState("");
  const [fasilitas_tambahan, setFasilitasTambahan] = useState([
    { id: "", nama_fasilitas: "", harga: "", stock: "  " },
  ]);
  const location = useLocation();
  const {
    reservasis,
    tarifs,
    besaranTarifs,
    fasilitasIdsArray,
    quantitiesArray,
    selectedKamarId,
    jmlhKamar,
    jmlhDewasa,
    jmlhAnak,
    startDate,
    endDate,
    kamars,
    Tarif,
    lama_nginap,
  } = location.state || {};
  const [no_kamar, setNoKamar] = useState("");
  const [kapasitas, setHarga] = useState("");
  const [jenis_kamar, setJenis] = useState("");
  const [jenis_bed, setBed] = useState("");
  const [luas_kamar, setLuas] = useState("");
  const [fasilitas, setFasilitas] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservasi, setReservasi] = useState([]);
  const [TransaksiKamar, setTransaksiKamar] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const steps = [
    { title: "First", description: "Book Your Room" },
    { title: "Second", description: "Resume Pembayaran" },
    { title: "Third", description: "Payment" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 3,
    count: steps.length,
  });

  useEffect(() => {
    const getFasilitasById = async () => {
      const response = await axios.get(
        `http://localhost:8000/transaksiKamars/${id}`
      );
      setTransaksiKamar(response.data["tarif"]);
      console.log(response.data["tarif"]);
    };
    getFasilitasById();
  }, [id]);
  console.log(TransaksiKamar);
  useEffect(() => {
    const getReservasiById = async () => {
      const response = await axios.get(
        `http://localhost:8000/reservasis/${id}`
      );
      setReservasi(response.data.data);
      console.log(response.data.data);
    };
    getReservasiById();
  }, [id]);

  const handleContinue = () => {
    setIsModalOpen(true);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  const confirmPayment = () => {
    if (selectedFile === null) {
      alert("Please upload your payment proof");
    } else {
      
      paymentDone();
    }
  };
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return new Date(`${year}-${month}-${day}`);
  }

  const paymentDone = async () => {
    const response = await axios.put(
      `http://localhost:8000/reservasis/update/${id}`,
      {
        status_reservasi: "Lunas",
        tanggal_pembayaran: getTodayDate(),
      }
    );
    console.log(response.data);
    if(reservasi.id_pegawai === 1){
    navigate("/riwayatTransaksiCust");
    }else{
      navigate("/riwayatTransaksi");
    }
  };

  return (
    <Box>
      <Box>
        <Navbar className="flex ">
          <NavbarBrand>
            <Image
              width={65}
              src="https://storage.googleapis.com/image-storage-p3l/logo-kecik.png"
              alt="NextUI Album Cover"
              classNames="m-5"
            />
            <p className="font-bold text-inherit">Grand Atma Hotel</p>
          </NavbarBrand>
          <NavbarContent
            className="hidden sm:flex gap-4"
            justify="center"
          ></NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Stepper size="lg" index={activeStep}>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </Box>
      <Box>
        <div className="w-full pr-20 pl-20 pb-20 pt-10 bg-white">
          <div className="flex justify-around pr-10 pl-10">
            <VStack className="w-full" spacing={4} align="stretch">
              <Box>
                <Heading textAlign="left">Payment Page</Heading>
              </Box>
              <Box>
                {/* <HStack spacing={4}
              align='flex-start' className='w-full'>
                  <Box>asd</Box>
                  <Box>asd</Box>
                </HStack> */}
                <div className="flex justify-between w-full ">
                  <Box p={4} className="w-1/2 bg-white">
                    <Box
                      p={4}
                      mt={5}
                      className="w-full bg-white"
                      borderRadius="lg"
                      borderWidth="1px"
                      shadow="md"
                    >
                      <Heading as="h2" size="md" mb={4}>
                        Pembayaran
                      </Heading>
                      <Divider></Divider>
                      <Text fontWeight="bold">Please Transfer to</Text>
                      <Box
                        className="w-full bg-white flex justify-center"
                        pb={3}
                        borderRadius="lg"
                        borderWidth="1px"
                        shadow="md"
                        pt={2}
                        mt={2}
                      >
                        <Box className="w-1/2 bg-white">
                          <Box pt={2}>
                            <Text fontWeight="sm">Account Number : </Text>
                          </Box>
                          <Box pt={2}>
                            <Text fontWeight="sm">Account Holder Name:</Text>
                          </Box>
                          <Box pt={2}>
                            <Text fontWeight="sm">Transfer Ammount:</Text>
                          </Box>
                        </Box>
                        <Box className="w-1/3 bg-white">
                          <Box pt={2}>
                            <Text fontWeight="bold">770011770022 Bank Diamond </Text>
                            <Text></Text>
                          </Box>
                          <Box pt={2}>
                            <Text fontWeight="bold">Bank Diamond</Text>
                          </Box>
                          <Box pt={2}>
                            <Text fontWeight="bold">{reservasis}</Text>
                          </Box>
                        </Box>
                      </Box>

                      <div className="col-span-full pt-4">
                        <label
                          htmlFor="cover-photo"
                          className="block text-sm font-bold leading-6 text-gray-900"
                        >
                          Upload Bukti Pembayaran
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={handleFileChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>

                        {selectedFile && (
                          <div className="mt-4">
                            <p className="text-sm font-medium leading-5 text-gray-900">
                              Selected File:
                            </p>
                            <p className="text-sm leading-5 text-gray-600">
                              {selectedFile.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </Box>
                  </Box>

                  <Box className="w-1/2 bg-white">
                    <Box
                      className="w-full bg-white"
                      borderRadius="lg"
                      borderWidth="1px"
                      shadow="md"
                      p={4}
                      mt={4}
                    >
                      <VStack align="flex-start" spacing={4}>
                        <Box>
                          <Text fontWeight="bold">Detail Pemesanan</Text>
                        </Box>
                        <Box className="w-full bg-white flex" pt={2}>
                          <Box className="w-1/2 bg-white">
                            <Box>
                              <Text fontWeight="bold">Jumlah Dewasa:</Text>
                              <Text>{reservasi.jumlah_dewasa}</Text>
                            </Box>
                            <Box>
                              <Text fontWeight="bold">Jumlah Anak-anak:</Text>
                              <Text>{reservasi.jumlah_anak}</Text>
                            </Box>
                          </Box>
                          <Box className="w-1/2 bg-white">
                            <Box>
                              <Text fontWeight="bold">Booking ID</Text>
                              <Text>{reservasi.booking_id}</Text>
                            </Box>
                            <Box>
                              <Text fontWeight="bold">Tanggal Cek-in</Text>
                              <Text>
                                {reservasi.tanggal_checkin} (Check-in 14.00 WIB)
                              </Text>
                            </Box>
                            <Box>
                              <Text fontWeight="bold">Tanggal Check-out</Text>
                              <Text>
                                {reservasi.tanggal_checkout} (Check-out 12.00
                                WIB)
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                        <Divider></Divider>
                        <Box className=" w-full flex justify-between">
                          <Text fontWeight="semibold">Total Harga</Text>
                          <Text fontWeight="semibold">
                            Rp {reservasi.total_bayarReservasi}
                          </Text>
                        </Box>
                        <Button
                          colorScheme="blue"
                          mt={4}
                          onClick={() => handleContinue()}
                        >
                          Confirm Payment
                        </Button>

                        <Modal
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Confirmation </ModalHeader>
                            <ModalBody>
                              <p>Confirm your payment?</p>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                onClick={confirmPayment}
                              >
                                Confirm
                              </Button>
                              <Button
                                colorScheme="gray"
                                ml={3}
                                onClick={() => setIsModalOpen(false)}
                              >
                                Cancel
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </VStack>
                    </Box>
                  </Box>
                </div>
              </Box>
            </VStack>
          </div>
        </div>
      </Box>

      <Footer />
    </Box>
  );
};

export default PaymentPage;

function Footer() {
  return (
    <Box
      as="footer"
      bg="teal.500"
      color="white"
      py={4}
      px={2}
      borderTop="1px solid"
      borderColor="teal.600"
    >
      <Container maxW="container.xl">
        <SimpleGrid columns={[1, 3]} spacing={8}>
          <chakra.div>
            <Heading as="h3" size="md" mb={2}>
              Quick Links
            </Heading>
            <List>
              <ListItem>
                <Link href="/rooms">
                  Rooms
                  {/* <ChevronRightIcon ml={1} /> */}
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/about">
                  About Us
                  {/* <ChevronRightIcon ml={1} /> */}
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/contact">
                  Contact Us
                  {/* <ChevronRightIcon ml={1} /> */}
                </Link>
              </ListItem>
            </List>
          </chakra.div>
          <chakra.div>
            <Heading as="h3" size="md" mb={2}>
              Contact Info
            </Heading>
            <Text>
              Jl. P. Mangkubumi No.18, Yogyakarta 55233
              <br />
              Indonesia
              <br />
              Email: info@grandatma.com
              <br />
              Telp. (0274) 487711
            </Text>
          </chakra.div>
          <chakra.div>
            <Heading as="h3" size="md" mb={2}>
              Follow Us
            </Heading>
            <Text>
              Stay connected with us on social media for updates and offers.
            </Text>
          </chakra.div>
        </SimpleGrid>
        <Divider mt={6} borderColor="teal.600" />
        <Text mt={4}>&copy; 2023 Grand Atma Hotel. All rights reserved.</Text>
      </Container>
    </Box>
  );
}
