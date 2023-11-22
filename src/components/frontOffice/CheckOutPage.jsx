import { useEffect, useState } from "react";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
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
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CheckOutPage = () => {
  console.log("test");
  const [fasilitas_tambahan, setFasilitasTambahan] = useState([
    { id: "", nama_fasilitas: "", harga: "", stock: "  " },
  ]);
  const [customer, setCustomer] = useState([]);
  const [no_kamar, setNoKamar] = useState("");
  const [kapasitas, setHarga] = useState("");
  const [jenis_kamar, setJenis] = useState("");
  const [jenis_bed, setBed] = useState("");
  const [luas_kamar, setLuas] = useState("");
  const [fasilitas, setFasilitas] = useState("");
  const [status_ketersediaan, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [transaksiFasilitas, setTransaksiFasilitas] = useState([]);
  const [transaksiKamars, setTransaksiKamars] = useState([]);
  const [reservasi, setReservasi] = useState([id]);
  const [user, setUser] = useState([{ id: "", username: "" }]);
  const [pegawai, setPegawai] = useState([]);
  const [inputValue, setInputValue] = useState("");
  

  useEffect(() => {
    const token = Cookies.get("authToken");
    console.log(token);
    // Check if the user is authenticated
    if (!token) {
      // Redirect to the login page if no token is found
      history.push("/login");
    }

    // Make an authenticated API request to fetch user data
    const fetchUserData = async (token) => {
      try {
        const response = await axios.get("http://localhost:8000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

        setUser(response.data.data);
        fetchCustomerData(response.data.data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    const fetchCustomerData = async (user) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/pegawais/akun/${user.id}`
        );
        console.log(response);

        setPegawai(response.data.data);
      } catch (error) {
        console.error("Customer fetch error:", error);
      }
    };

    fetchUserData(token);
  }, [history]);

  // const fetchUserData = async (token) => {
  //   // Send the token with the request to authenticate
  //   try {
  //     const response = await axios.get('http://localhost:8000/auth/profile', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(response);

  //     setUser(response.data.data);

  //   } catch (error) {
  //     console.error('Profile fetch error:', error);
  //   }
  // };

  // const fetchCustomerData = async (user) => {
  //   try {
  //     const response = await axios.get(`http://localhost:8000/customers/akun/${user.id}`);
  //     console.log(response);

  //     setCustomer(response.data.data);
  //   } catch (error) {
  //     console.error('Profile fetch error:', error);
  //   }
  // }

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

  useEffect(() => {
    const getCustomerByReservasiId = async () => {
      const response = await axios.get(
        `http://localhost:8000/reservasis/${id}`
      );
      setCustomer(response.data.data["customer"]);
      console.log(response.data.data["customer"]);
    };
    getCustomerByReservasiId();
  }, [id]);

  useEffect(() => {
    const getFasilitasById = async () => {
      const response = await axios.get(
        `http://localhost:8000/transaksiFasilitas/${id}`
      );
      setTransaksiFasilitas(response.data.data);
      console.log(response.data.data);
    };
    getFasilitasById();
  }, [id]);

  useEffect(() => {
    const getKamarsById = async () => {
      const response = await axios.get(
        `http://localhost:8000/transaksiKamars/all/${id}`
      );
      setTransaksiKamars(response.data.data);
      console.log(response.data.data);
    };
    getKamarsById();
  }, [id]);

  console.log("transaksiFasilitas", transaksiFasilitas);

  // useEffect(() => {
  //   const getKamarById = async () => {
  //     const response = await axios.get(`http://localhost:8000/kamars/${id}`);
  //     setNoKamar(response.data.data.no_kamar);
  //     setJenis(response.data.data.jenis_kamar);
  //     setHarga(response.data.data.kapasitas);
  //     setBed(response.data.data.jenis_bed);
  //     setLuas(response.data.data.luas_kamar);
  //     setFasilitas(response.data.data.fasilitas);
  //   };
  //   getKamarById();
  // }, [id]);

  const handleConfirm = () => {
    // Logic to be executed when confirmed
    saveReservasi();
    console.log("Confirmed!");
  };

  const handleCancel = () => {
    // Logic to be executed when canceled
    console.log("Canceled!");
  };

  const hitungLamaNginap = async (startDate, endDate) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/perhitungans/calculateDays",
        {
          tanggalCekin: startDate,
          tanggalCheckout: endDate,
        }
      );
      console.log(response.data.data);
      const lama_nginap = response.data.data;
      console.log(lama_nginap);
      // Do something with lama_nginap
    } catch (error) {
      console.error(error);
    }
  };

  function formatDateToDateString(dateString) {
    const date = new Date(dateString);

    if (dateString === "1970-01-01T00:00:00.000Z") {
      return "-";
    }

    const options = { day: "2-digit", month: "2-digit", year: "numeric" };

    return date.toLocaleDateString("en-GB", options);
  }
  const checkoutReservasi = async () => {
    const response = await axios.put(
      `http://localhost:8000/reservasis/update/${reservasi.id}`,
      {
        status_reservasi: "Sudah Checkout",
        tanggal_pembayaran: reservasi.tanggal_pembayaran,
      }
    );
    console.log(response.data);
  };

  const calculateTotalSubtotal = () => {
    let totalSubtotal = 0;

    // Iterate through each item in transaksiKamars and sum the subtotals
    transaksiKamars.forEach((item) => {
      totalSubtotal += item.subtotal;
    });

    return totalSubtotal;
  };

  const calculateTotalFasilitasSubtotal = () => {
    let totalSubtotal = 0;

    // Iterate through each item in transaksiKamars and sum the subtotals
    transaksiFasilitas.forEach((item) => {
      totalSubtotal += item.subtotal;
    });

    return totalSubtotal;
  };

  const calculateTax = () => {
    const totalFasilitasSubtotal = calculateTotalFasilitasSubtotal();
    const taxRate = 0.1; // Assuming tax rate is 10%
    const tax = totalFasilitasSubtotal * taxRate;
    return tax;
  };

  const calculateTotal = () => {
    const totalFasilitasSubtotal = calculateTotalFasilitasSubtotal();
    const tax = calculateTax();
    const totalBayarReservasi = reservasi.total_bayarReservasi;
    return totalFasilitasSubtotal + tax + totalBayarReservasi;
  };

  const calculateRemainingBalance = () => {
    const total = calculateTotal();
    const totalBayarReservasi = reservasi.total_bayarReservasi;
    const remainingBalance = total - totalBayarReservasi - 300000;
    return remainingBalance;
  };
  const remainingBalance = calculateRemainingBalance();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const isInputValid = inputValue === remainingBalance;
  const isInputLessThanBalance = inputValue < remainingBalance;

  const handleCheckout = async () => {
    try {
      let response;
      const bookingId = reservasi.booking_id;
      console.log(bookingId);
      console.log(calculateTotal());
      console.log(calculateRemainingBalance());
      const checkoutData = {
        front_office: pegawai.nama_pegawai,
        total_tax: parseInt(calculateTax()),
        total_harga: parseInt(calculateTotal()),
        total_jaminan: reservasi.total_bayarReservasi,
        total_deposit: 300000,
        total_pelunasan: parseInt(calculateRemainingBalance()),
        id_reservasi: reservasi.id,
      };

      if (bookingId.startsWith("P")) {
        checkoutReservasi();
        response = await axios.post(
          "http://localhost:8000/invoices/personal",
          checkoutData
        );
      } else if (bookingId.startsWith("G")) {
        checkoutReservasi();
        response = await axios.post(
          "http://localhost:8000/invoices/group",
          checkoutData
        );
      }

      console.log(response.data);
      navigate("/homeFO");
    } catch (error) {
      console.error(error);
      // Show an error message to the user
      // You can use a toast or a modal to display the error message
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
            <NavbarItem className="hidden lg:flex"></NavbarItem>
          </NavbarContent>
        </Navbar>
      </Box>
      <Box>
        <div className="w-full pr-20 pl-20 pb-20 pt-10 bg-white">
          <div className="flex justify-around pr-10 pl-10">
            <VStack className="w-full" spacing={4} align="stretch">
              <Box>
                <Heading textAlign="left">Check Out</Heading>
              </Box>
              <Box>
                Make sure all the details on this page are correct before
                proceeding to check out.
              </Box>
              <Box>
                {/* <HStack spacing={4}
              align='flex-start' className='w-full'>
                  <Box>asd</Box>
                  <Box>asd</Box>
                </HStack> */}
                <div className="flex justify-between w-full ">
                  <Box p={4} className="w-2/3 bg-white">
                    <Box
                      p={4}
                      className="w-full bg-white"
                      borderRadius="lg"
                      borderWidth="1px"
                      shadow="md"
                    >
                      <Heading as="h2" size="md" mb={4}>
                        Guest Information
                      </Heading>
                      <Divider></Divider>
                      <Box className="w-full bg-white flex" pt={2}>
                        <Box className="w-1/2 bg-white">
                          <Box>
                            <Text fontWeight="bold">Name:</Text>
                            <Text>{customer.nama}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Email:</Text>
                            <Text>{customer.email}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Phone:</Text>
                            <Text>{customer.no_telp}</Text>
                          </Box>
                        </Box>
                        <Box className="w-1/2 bg-white">
                          <Box>
                            <Text fontWeight="bold">No Identitas(KTP):</Text>
                            <Text>{customer.no_identitas}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Alamat:</Text>
                            <Text>{customer.alamat}</Text>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      p={4}
                      mt={5}
                      className="w-full bg-white"
                      borderRadius="lg"
                      borderWidth="1px"
                      shadow="md"
                    >
                      <Heading as="h2" size="md" mb={4}>
                        Rincian Kamar
                      </Heading>
                      <Divider></Divider>
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
                          <Tr>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td>Total</Td>
                            <Td>Rp {calculateTotalSubtotal()}</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </Box>
                    <Box
                      p={4}
                      mt={5}
                      className="w-full bg-white"
                      borderRadius="lg"
                      borderWidth="1px"
                      shadow="md"
                    >
                      <Heading as="h2" size="md" mb={4}>
                        Rincian Fasilitas Tambahan
                      </Heading>
                      <Divider></Divider>
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
                              <Td>
                                {formatDateToDateString(item.tanggal_pemesanan)}
                              </Td>
                              <Td>{item.jumlah}</Td>
                              <Td>Rp {item.fasilitas.harga}</Td>
                              <Td>Rp {item.subtotal}</Td>
                            </Tr>
                          ))}

                          {calculateTotalFasilitasSubtotal() > 0 && (
                            <Tr>
                              <Td></Td>
                              <Td></Td>
                              <Td></Td>
                              <Td>Total</Td>
                              <Td>Rp {calculateTotalFasilitasSubtotal()}</Td>
                            </Tr>
                          )}
                        </Tbody>
                      </Table>
                    </Box>
                  </Box>

                  <Box className="w-1/3 bg-white">
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
                            {/* <Box>
                              <Text fontWeight="bold">Jumlah Kamar:</Text>
                              <Text>{jmlhKamar}</Text>
                            </Box> */}
                          </Box>
                          <Box className="w-1/2 bg-white">
                            <Box>
                              <Text fontWeight="bold">Booking ID</Text>
                              <Text>{reservasi.booking_id}</Text>
                            </Box>
                            <Box>
                              <Text fontWeight="bold">Tanggal Cek-in</Text>
                              <Text>
                                {formatDateToDateString(
                                  reservasi.tanggal_checkin
                                )}
                              </Text>
                              (Check-in 14.00 WIB)
                            </Box>
                            <Box>
                              <Text fontWeight="bold">Tanggal Check-out</Text>
                              <Text>
                                {formatDateToDateString(
                                  reservasi.tanggal_checkout
                                )}
                              </Text>
                              (Check-out 12.00 WIB)
                            </Box>
                          </Box>
                        </Box>

                        <Accordion
                          className="w-full"
                          defaultIndex={[0]}
                          allowMultiple
                        >
                          <AccordionItem>
                            <h2>
                              <AccordionButton>
                                <Box
                                  as="span"
                                  flex="1"
                                  textAlign="left"
                                  fontWeight="bold"
                                >
                                  Rincian harga
                                </Box>

                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              <Box className=" w-full flex justify-between">
                                <Text>Tax Fasilitas</Text>
                                <Text>Rp {calculateTax()}</Text>
                              </Box>
                              <Box className=" w-full flex justify-between">
                                <Text fontWeight="semibold">Total Harga</Text>
                                <Text fontWeight="semibold">
                                  Rp {calculateTotal()}
                                </Text>
                              </Box>
                              {/* <Divider></Divider> */}
                              <Box
                                mt={4}
                                className=" w-full flex justify-between"
                              >
                                <Text>Jaminan</Text>
                                <Text>Rp {reservasi.total_bayarReservasi}</Text>
                              </Box>
                              <Box className=" w-full flex justify-between">
                                <Text>Deposit</Text>
                                <Text>Rp 300000</Text>
                              </Box>
                              <Divider mt={2}></Divider>
                              <Box className=" w-full flex justify-between">
                                <Text fontWeight="semibold">
                                  {calculateRemainingBalance() < 0
                                    ? "Total Sisa/Kelebihan"
                                    : "Total Kekurangan"}
                                </Text>
                                <Text fontWeight="semibold">
                                  Rp{" "}
                                  {calculateRemainingBalance() < 0
                                    ? -calculateRemainingBalance()
                                    : calculateRemainingBalance()}
                                </Text>
                              </Box>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                        <Button
                          colorScheme="blue"
                          mt={4}
                          onClick={() => setIsModalOpen(true)}
                        >
                          Check Out
                        </Button>

                        <Modal
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Confirmation Check Out</ModalHeader>
                            <ModalBody>
                              {calculateRemainingBalance() < 0 && (
                                <p>
                                  Total Sisa Uang Deposit adalah Rp{" "}
                                  {Math.abs(calculateRemainingBalance())}
                                </p>
                              )}
                              {calculateRemainingBalance() > 0 && (
                                <p>
                                  Jumlah Yang harus dibayar adalah Rp{" "}
                                  {calculateRemainingBalance()}
                                </p>
                              )}
                              {calculateRemainingBalance() > 0 && (
                                <Input
                                type="number"
                                placeholder="Enter amount"
                                value={inputValue}
                                onChange={handleInputChange}
                              />
                              )}
                              {isInputValid && (
                                  <p>The money is sesuai</p>
                                )}

                                {isInputLessThanBalance && (
                                  <p>The money is kurang</p>
                                )}

                                {!isInputValid && !isInputLessThanBalance && (
                                  <p>
                                    Remaining balance after deducting the input value:{" "}
                                    {remainingBalance - inputValue}
                                  </p>
                                )}
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                colorScheme="gray"
                                ml={3}
                                onClick={() => setIsModalOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                  colorScheme="blue"
                                  onClick={handleCheckout}
                                  disabled={!isInputValid && !isInputLessThanBalance}
                                >
                                  Confirm
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

export default CheckOutPage;

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
