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
import { useLocation } from "react-router-dom";
import ModalConfirmation from "../utilities/modal2";
import { useNavigate } from "react-router-dom";
import usePegawaiData from "../utilities/fetchPegawaiData";

const AddReservasiGroup = () => {
    const { user, pegawai } = usePegawaiData();
  const [nama, setNama] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [tanggal_reservasi, setTanggalReservasi] = useState("");
  const [waktu_reservasi, setWaktuReservasi] = useState("");
  const [fasilitas_tambahan, setFasilitasTambahan] = useState([
    { id: "", nama_fasilitas: "", harga: "", stock: "  " },
  ]);
  const location = useLocation();
  const {
    startDate,
    endDate,
    tarifs,
    kamars,
    selectedKamarId,
    Tarif,
    lama_nginap,
    idCustomer,
  } = location.state || {};
  const [no_kamar, setNoKamar] = useState("");
  const [kapasitas, setHarga] = useState("");
  const [jenis_kamar, setJenis] = useState("");
  const [jenis_bed, setBed] = useState("");
  const [luas_kamar, setLuas] = useState("");
  const [fasilitas, setFasilitas] = useState("");
  const [status_ketersediaan, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers,setCustomers] = useState([]);
  const navigate = useNavigate();

  console.log("selectedKamarId", selectedKamarId);
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  console.log("tarifs", tarifs);
  console.log("kamars", kamars);
  console.log("Tarif", Tarif);
  console.log("lama_nginap", lama_nginap);

 

  const steps = [
    { title: "First", description: "Book Your Room" },
    { title: "Second", description: "Date & Time" },
    { title: "Third", description: "Select Rooms" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  useEffect(() => {
    const fetcher = async () => {
      const response = await axios.get(
        `http://localhost:8000/customers/${idCustomer}`
      );
      setCustomers(response.data.data);
      console.log(response.data.data);
    };
    fetcher();
  }, [idCustomer]);

  useEffect(() => {
    const fetcher = async () => {
      const response = await axios.get(
        "http://localhost:8000/fasilitasTambahans"
      );
      setFasilitasTambahan(response.data.data);
    };
    fetcher();
  }, []);

  const fasilitasGambar = [
    {
      imageSrc:
        "https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png",
    },
    {
      imageSrc:
        "https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png",
    },
    {
      imageSrc:
        "https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png",
    },
    {
      imageSrc:
        "https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png",
    },
    {
      imageSrc:
        "https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png",
    },
    {
      imageSrc:
        "https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png",
    },
  ];

  const [jmlhDewasa, setJmlhDewasa] = useState(1);
  const [jmlhAnak, setJmlhAnak] = useState(0);
  const [jmlhKamar, setJmlhKamar] = useState(1);

  const tambahDewasa = () => {
    setJmlhDewasa(jmlhDewasa + 1);
  };

  const kurangDewasa = () => {
    if (jmlhDewasa === 1) {
      return;
    } else {
      setJmlhDewasa(jmlhDewasa - 1);
    }
  };

  const tambahAnak = () => {
    setJmlhAnak(jmlhAnak + 1);
  };

  const kurangAnak = () => {
    if (jmlhAnak === 0) {
      return;
    } else {
      setJmlhAnak(jmlhAnak - 1);
    }
  };

  // useEffect(() => {
  //   const getMaxJumlahKamar = async () => {
  //     const response = await axios.get(`http://localhost:8000/kamars?jenis_kamar=${jenis}&jenis_bed=${bed}`);
  //     setMaxJumlahKamar(response.data.data.length);
  //   };
  //   getMaxJumlahKamar();
  // }, [jenis, bed]);

  // useEffect(() => {
  //   const getMaxJumlahKamar = async () => {
  //     if(jenis_kamar === kamars.jenis_kamar && jenis_bed === kamars.jenis_bed){

  //   };
  //   getMaxJumlahKamar();
  // }, [jenis, bed]);
  const [matchCount, setMatchCount] = useState(0);

  const attributesToMatch = { jenis_bed: jenis_bed, jenis_kamar: jenis_kamar };

  console.log("attributesToMatch", attributesToMatch);

  // Function to handle the matching logic
  useEffect(() => {
    const handleMatchCount = () => {
      // Use filter to get an array of objects that match the attribute and value
      const matchingObjects = kamars.filter((item) => {
        // Check each attribute for a match
        return Object.entries(attributesToMatch).every(
          ([attribute, value]) => item[attribute] === value
        );
      });
      // Set the matchCount state to the length of the matchingObjects array
      setMatchCount(matchingObjects.length);
    };
    handleMatchCount();
  }, [attributesToMatch, kamars]);
  console.log("matchCount", matchCount);

  const tambahKamar = () => {
    if (jmlhKamar === matchCount) {
      return jmlhKamar;
    } else {
      setJmlhKamar(jmlhKamar + 1);
    }
  };

  const kurangKamar = () => {
    if (jmlhKamar === 1) {
      return;
    } else {
      setJmlhKamar(jmlhKamar - 1);
    }
  };
  const id = selectedKamarId;
  useEffect(() => {
    const getKamarById = async () => {
      const response = await axios.get(`http://localhost:8000/kamars/${id}`);
      setNoKamar(response.data.data.no_kamar);
      setJenis(response.data.data.jenis_kamar);
      setHarga(response.data.data.kapasitas);
      setBed(response.data.data.jenis_bed);
      setLuas(response.data.data.luas_kamar);
      setFasilitas(response.data.data.fasilitas);
    };
    getKamarById();
  }, [id]);

  const handleConfirm = () => {
    // Logic to be executed when confirmed
    saveReservasi();
    console.log("Confirmed!");
  };

  const handleCancel = () => {
    // Logic to be executed when canceled
    console.log("Canceled!");
  };

  const [selectedTarifs, setSelectedTarifs] = useState([]);
  const [besaranTarifs, setBesaranTarifs] = useState([]);

  useEffect(() => {
    const getTarif = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/reservasis/tarifs",
          {
            jenis_kamar: jenis_kamar,
            jumlah: jmlhKamar,
          }
        );
        setSelectedTarifs(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTarif();
  }, [jenis_kamar, jmlhKamar]);

  useEffect(() => {
    const getBesaranTarif = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/reservasis/besarans",
          {
            jenis_kamar: jenis_kamar,
            jumlah: jmlhKamar,
          }
        );
        setBesaranTarifs(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getBesaranTarif();
  }, [jenis_kamar, jmlhKamar]);

  const totalharga = Tarif * lama_nginap * jmlhKamar;
  const   saveReservasi = async (e) => {
    e.preventDefault();
    console.log(pegawai)


    const response = await axios.post(
      "http://localhost:8000/reservasis/group",
      {
        jumlah_anak: jmlhAnak,
        jumlah_dewasa: jmlhDewasa,
        tanggal_checkin: startDate,
        tanggal_checkout: endDate,
        total_bayarReservasi: totalharga,
        id_customer: customers.id,
        id_pegawai: pegawai.id,
        create_by: pegawai.nama_pegawai,
        tarif_ids: selectedTarifs,
        besaran_tarifs: besaranTarifs,
        fasilitas_ids: fasilitasIdsArray,
        jumlah_fasilitas: quantitiesArray,
        
      }
    );
    console.log(response.data);

    navigate("/resumePage", {
      state: {
        reservasis: response.data.data,
        tarifs: selectedTarifs,
        besaranTarifs: besaranTarifs,
        fasilitasIdsArray: fasilitasIdsArray,
        quantitiesArray: quantitiesArray,
        selectedKamarId: selectedKamarId,
        jmlhKamar,
        jmlhDewasa,
        jmlhAnak,  
        startDate,
        endDate,
        kamars,
        Tarif,
        lama_nginap,
      },
    });
  };

  const handleContinue = () => {
    setIsModalOpen(true);
  };


  const [quantity, setQuantity] = useState({});

  const handleQuantityChange = (fasilitasId, newQuantity) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [fasilitasId]: newQuantity,
    }));
  };
  console.log("quantity", quantity);
  const quantitiesArray = Object.entries(quantity)
    .filter(([_, jumlah]) => jumlah !== 0)
    .map(([_, jumlah]) => jumlah);

  console.log("quantitiesArray", quantitiesArray);
  const fasilitasIdsArray = Object.keys(quantity)
    .filter((fasilitasId) => quantity[fasilitasId] > 0)
    .map((fasilitasId) => parseInt(fasilitasId, 10));
  console.log("fasilitasIdsArray", fasilitasIdsArray);

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
                <Heading textAlign="left">Hotel Booking</Heading>
              </Box>
              <Box>
                Make sure all the details on this page are correct before
                proceeding to payment.
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
                      className="w-full bg-white"
                      borderRadius="lg"
                      borderWidth="1px"
                      shadow="md"
                    >
                      <Heading as="h2" size="md" mb={4}>
                        Profile Information
                      </Heading>
                      <Divider></Divider>
                      <Box className="w-full bg-white flex" pt={2}>
                        <Box className="w-1/2 bg-white">
                          <Box>
                            <Text fontWeight="bold">Name:</Text>
                            <Text>{customers.nama}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Email:</Text>
                            <Text>{customers.email}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Phone:</Text>
                            <Text>{customers.no_telp}</Text>
                          </Box>
                        </Box>
                        <Box className="w-1/2 bg-white">
                          <Box>
                            <Text fontWeight="bold">No Identitas(KTP):</Text>
                            <Text>{customers.no_identitas}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Alamat:</Text>
                            <Text>{customers.alamat}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Nama Institusi:</Text>
                            <Text>{customers.nama_institusi}</Text>
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
                        Rincian Reservasi
                      </Heading>
                      <Divider></Divider>
                      <Box pt={3} className="flex justify-between">
                        <Text fontWeight="semibold">Jumlah Dewasa</Text>
                        <Box
                          borderWidth="1px"
                          borderRadius="base"
                          overflow="hidden"
                          shadow="md"
                          className="bg-white"
                        >
                          <Center>
                            <Button
                              onClick={kurangDewasa}
                              mr={5}
                              bgColor={"white"}
                              borderRadius="base"
                            >
                              -
                            </Button>
                            <Text> {jmlhDewasa} </Text>

                            <Button
                              onClick={tambahDewasa}
                              ml={5}
                              bgColor={"white"}
                              borderRadius="base"
                            >
                              +
                            </Button>
                          </Center>
                        </Box>
                      </Box>
                      <Box pt={3} className="flex justify-between">
                        <Text fontWeight="semibold">Jumlah Anak</Text>
                        <Box
                          borderWidth="1px"
                          borderRadius="base"
                          overflow="hidden"
                          shadow="md"
                          className="bg-white"
                        >
                          <Center>
                            <Button
                              onClick={kurangAnak}
                              mr={5}
                              bgColor={"white"}
                              borderRadius="base"
                            >
                              -
                            </Button>
                            <Text> {jmlhAnak} </Text>

                            <Button
                              onClick={tambahAnak}
                              ml={5}
                              bgColor={"white"}
                              borderRadius="base"
                            >
                              +
                            </Button>
                          </Center>
                        </Box>
                      </Box>
                      <Box pt={3} className="flex justify-between">
                        <Text fontWeight="semibold">Jumlah Kamar</Text>
                        <Box
                          borderWidth="1px"
                          borderRadius="base"
                          overflow="hidden"
                          shadow="md"
                          className="bg-white"
                        >
                          <Center>
                            <Button
                              onClick={kurangKamar}
                              mr={5}
                              bgColor={"white"}
                              borderRadius="base"
                            >
                              -
                            </Button>
                            <Text> {jmlhKamar} </Text>

                            <Button
                              onClick={tambahKamar}
                              ml={5}
                              bgColor={"white"}
                              borderRadius="base"
                            >
                              +
                            </Button>
                          </Center>
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
                        Fasilitas Tambahan
                      </Heading>
                      <Divider></Divider>
                      <SimpleGrid columns={[1]} spacing={6}>
                        {fasilitas_tambahan.map((item) => (
                          <HorizontalFasilitasCard
                            key={item.id}
                            imageSrc={
                              "https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png"
                            }
                            title={item.nama_fasilitas}
        s                    description={item.jenis_bed}
                            price={item.harga}
                            ukuran_kamar={item.luas_kamar}
                            fasilitasId={item.id}
                            handleQuantityChange={handleQuantityChange}
                            quantity={quantity[item.id] || 0}
                          />
                        ))}
                      </SimpleGrid>
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
                          <Text fontWeight="bold">Detail Menginap</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Tanggal Cek-in</Text>
                          <Text>{startDate} (Check-in 14.00 WIB)</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Tanggal Check-out</Text>
                          <Text>{endDate} (Check-out 12.00 WIB)</Text>
                        </Box>
                        <Divider></Divider>

                        <Text fontWeight="bold">Detail Kamar</Text>
                        <Box className="w-full bg-white flex">
                          <Box className="w-1/2 bg-white">
                            <Text>{jenis_kamar}</Text>
                            <Text>Jenis Bed: {jenis_bed}</Text>
                            <Text>Kapasitas: {kapasitas} Orang</Text>
                          </Box>
                          <Box className="w-1/2 bg-white">
                            <Text>Fasilitas</Text>
                            <Text>{fasilitas}</Text>
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
                                <Text fontWeight="semibold">
                                  Harga /Kamar/Malam
                                </Text>
                                <Text fontWeight="semibold">Rp {Tarif}</Text>
                              </Box>
                              <Box className=" w-full flex justify-between">
                                <Text fontWeight="semibold">Lama Menginap</Text>
                                <Text fontWeight="semibold">
                                  {lama_nginap} Hari
                                </Text>
                              </Box>

                              <Box className=" w-full flex justify-between">
                                <Text fontWeight="semibold">
                                  Taxes and fees
                                </Text>
                                <Text fontWeight="semibold">0</Text>
                              </Box>
                              <Divider></Divider>
                              <Box className=" w-full flex justify-between">
                                <Text fontWeight="semibold">Total Harga</Text>
                                <Text fontWeight="semibold">
                                  Rp {totalharga}
                                </Text>
                              </Box>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                        <Button
                          colorScheme="blue"
                          mt={4}
                          onClick={() => handleContinue()}
                        >
                          Continue Transaction
                        </Button>

                        <Modal
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Confirmation Title</ModalHeader>
                            <ModalBody>
                              <p>
                                Are you sure you want to perform this action?
                              </p>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                onClick={saveReservasi}
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

export default AddReservasiGroup;

function HorizontalFasilitasCard({
  imageSrc,
  title,
  description,
  price,
  fasilitasId,
  handleQuantityChange,
  quantity,
}) {
  const incrementCounter = () => {
    if (quantity === 5) {
      return;
    } else {
      handleQuantityChange(fasilitasId, quantity + 1);
    }
  };

  const decrementCounter = () => {
    if (quantity === 0) {
      return;
    } else {
      handleQuantityChange(fasilitasId, quantity - 1);
    }
  };
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      className="bg-white"
    >
      <Image src={imageSrc} alt={title} width="150px" />
      <Box p={4} className="w-full">
        <VStack align="flex-start">
          <Box>
            <Text fontWeight="bold">{title}</Text>
            <Text>{description}</Text>
          </Box>
          <Box>
            <Text fontWeight="medium">Harga: Rp {price}</Text>
            <Text></Text>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="base"
            overflow="hidden"
            shadow="md"
            className="bg-white"
          >
            <Center>
              <Button
                onClick={decrementCounter}
                mr={5}
                bgColor={"white"}
                borderRadius="base"
              >
                -
              </Button>
              <Text> {quantity} </Text>

              <Button
                onClick={incrementCounter}
                ml={5}
                bgColor={"white"}
                borderRadius="base"
              >
                +
              </Button>
            </Center>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}

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
