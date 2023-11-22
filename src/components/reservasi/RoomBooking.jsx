import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Image,
  Stack,
  SimpleGrid,
  Flex,
  Link,
  Divider,
  List,
  ListItem,
  chakra,
  HStack,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import useSWR, { useSWRConfig } from "swr";
import NavbarHome from "../NavbarHome";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";

function RoomBooking() {
  const [tarifs, setTarifs] = useState([]);
  const [kamars, setKamars] = useState([]);
  const [kamarId, setKamarId] = useState([]);

  const [value, setValue] = useState({
    startDate: "2023-03-05",
    endDate: "2023-03-10",
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const seasonsResponse = await axios.get(
        "http://localhost:8000/seasons/search",
        {
          params: {
            tanggal_mulai: value.startDate,
            tanggal_selesai: value.endDate,
          },
        }
      );
      if (seasonsResponse.data.data.length > 0) {
        // Assuming there can be multiple seasons in the range, you would need to decide
        // how to handle multiple seasons. Here, we just take the first season.
        console.log(seasonsResponse.data.data[0]);
        const seasonId = seasonsResponse.data.data[0].id;

        // Fetch tariffs related to the season
        const tarifsResponse = await axios.get(
          `http://localhost:8000/tarifs/withKamar/${seasonId}`
        );
        setTarifs(tarifsResponse.data.data);
        console.log(tarifsResponse.data.data);

        // If there are tariffs associated with the season, fetch the rooms for each tariff
        if (tarifsResponse.data.data.length > 0) {
          const kamarsResponse = await axios.get(
            `http://localhost:8000/kamars/season/${seasonId}`
          );
          setKamars(kamarsResponse.data.data);
          console.log(kamarsResponse.data.data);
          console.log(seasonsResponse.data.data);
          console.log(tarifsResponse.data.data);
          //  console.log(kamarsResponse.data.data);
        } else {
          // Handle the case where there are no tariffs for the season
          console.log("No tariffs found for this season");
          setKamars([]);
          setTarifs([]);
        }
      } else {
        // Handle the case where there are no seasons in the range
        console.log("No seasons found in this date range");
        setKamars([]);
        setTarifs([]);
      }
    } catch (error) {
      console.error("There was an error fetching the seasons:", error);
    }
  };

  const getUniqueKamarsByJenisKamar = (kamars) => {
    const uniqueKamars = kamars.reduce((acc, current) => {
      const x = acc.find((item) => item.jenis_kamar === current.jenis_kamar);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    return uniqueKamars;
  };

  const uniqueKamars = getUniqueKamarsByJenisKamar(kamars);
  console.log(uniqueKamars);

  // const getUniqueKamarsFromTarifs = (tarifs) => {
  //     const uniqueKamars = tarifs.reduce((acc, current) => {
  //         const x = acc.find((item) => item.kamar.jenis_kamar === current.kamar.jenis_kamar);
  //         if (!x) {
  //             return acc.concat([current.kamar]);
  //         } else {
  //             return acc;
  //         }
  //     }, []);
  //     return uniqueKamars;
  // };
  const getUniqueKamarsFromTarifs = (tarifs) => {
    const uniqueKamars = tarifs.reduce((acc, current) => {
      const existingKamar = acc.find(
        (item) => item.kamar.jenis_kamar === current.kamar.jenis_kamar
      );

      if (!existingKamar) {
        // If the unique kamar is not found, append the current kamar to the accumulator
        acc.push({
          kamar: current.kamar,
          besaran_tarif: current.besaran_tarif,
        });
      }

      return acc;
    }, []);

    return uniqueKamars;
  };
  const uniqueKamarsFromTarifs = getUniqueKamarsFromTarifs(tarifs);
  console.log(uniqueKamarsFromTarifs);

  return (
    <div>
      <Box>
        {/* <Header /> */}
        <NavbarHome />
        {/* Hero Section */}
        <Box
          bgImage="url('https://storage.googleapis.com/image-storage-p3l/Room%20image/Roombooking.jpg')" // Replace with your hotel image URL
          bgSize="cover"
          bgPosition="center"
          h="400px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          textAlign="center"
        >
          <Container maxW="container.xl">
            <Heading
              as="h1"
              size="4xl"
              mb={4}
              className="c-gradient-to-r from-cyan-500 to-blue-500"
            >
              Book Your Room
            </Heading>
            <Text fontSize="xl" mb={8}></Text>
          </Container>
        </Box>

        {/* Room Showcase Section */}
        <Container maxW="container.xl" pb={16} mt={-10}>
          <Container
            maxW="container.xl"
            pb={16}
            pt={5}
            className="bg-gradient-to-r from-cyan-500 to-blue-500  rounded-xl"
          >
            <Heading as="h2" color={"white"} size="xl" pl={2}>
              Find Rooms
            </Heading>
            <form onSubmit={handleSearch} className="flex-auto">
              <Flex
                direction="row"
                align="center"
                justify="space-between"
                wrap="wrap"
              >
                <Box flex="3" minW="200px" p="2">
                  <Datepicker
                    primaryColor="teal"
                    value={value}
                    onChange={handleValueChange}
                    minDate={new Date()} // Disable dates before today
                  />
                </Box>

                <Box flex="1" minW="200px" p="2">
                  <Button color={"black"} w="full" bg={"white"} type="submit">
                    Cari Kamar
                  </Button>
                </Box>
              </Flex>
            </form>
          </Container>

          <Container
            maxW="container.xl"
            pt={4}
            pb={3}
            className="bg-teal-color rounded-xl"
            mt={10}
          >
            <Heading color={"white"} pb={3} size={"md"}>
              {" "}
              Available Room Types{" "}
            </Heading>
            {uniqueKamarsFromTarifs.length > 0 && (
              <SimpleGrid columns={[1]} spacing={6}>
                {uniqueKamarsFromTarifs.map((item) => (
                  <HorizontalRoomCard
                    key={item.id}
                    imageSrc={
                      "https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png"
                    }
                    title={item.kamar.jenis_kamar}
                    description={item.kamar.jenis_bed}
                    price={item.kamar.luas_kamar}
                    ukuran_kamar={item.kamar.luas_kamar}
                    startDate={value.startDate}
                    endDate={value.endDate}
                    tarifs={tarifs}
                    kamars={kamars}
                    Tarif={item.besaran_tarif}
                    selectedKamarId={item.kamar.id}
                  />
                ))}
              </SimpleGrid>
            )}
          </Container>
        </Container>

        <Footer />
      </Box>
    </div>
  );
}

export default RoomBooking;

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
import HotelIcon from "@mui/icons-material/Hotel";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import WifiIcon from "@mui/icons-material/Wifi";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StraightenRoundedIcon from "@mui/icons-material/Straighten";
import { checkUserLoginStatus } from "../utilities/checkAuth";

const Feature = ({ icon: IconComponent, text }) => (
  <Flex align="center">
    <IconComponent style={{ color: "#38A169" }} />
    <Text ml={2}>{text}</Text>
  </Flex>
);
function HorizontalRoomCard({
  imageSrc,
  title,
  description,
  price,
  ukuran_kamar,
  startDate,
  endDate,
  tarifs,
  kamars,
  selectedKamarId,
  Tarif,
}) {
  const navigate = useNavigate();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(checkUserLoginStatus());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const [lama_nginap, setDays] = useState();
  // const handleClick = () => {
  //     if (isUserLoggedIn === true) {
  //         try {
  //             // Your logic here
  //             console.log('Start Date:', startDate);
  //             console.log('End Date:', endDate);

  //             // Example: Redirect to the booking page with query parameters
  //             navigate("/addReservasi", {
  //                 state: {
  //                     startDate,
  //                     endDate,
  //                 },
  //             });
  //         } catch (error) {
  //             console.error('Error handling click:', error);
  //         }
  //     } else {

  //         console.log("User is not logged in, redirect to login page");
  //     }
  // };
  // const generatLamaNginep = async () => {
  //     try {
  //       const response = await axios.post("http://localhost:8000/perhitungans/calculateDays",{
  //         tanggalCekin: startDate, tanggalCheckout: endDate,
  //       });
  //       console.log(response);
  //       setDays(response.data.days);
  //     } catch (error) {
  //       // Handle error as needed
  //       console.error(error);
  //     }
  //   };

  const handleClick = (selectedKamarId) => {
    if (isUserLoggedIn === true) {
      try {
        axios
          .post("http://localhost:8000/perhitungans/calculateDays", {
            tanggalCekin: startDate,
            tanggalCheckout: endDate,
          })
          .then((response) => {
            console.log(response.data.data);
            const lama_nginap = response.data.data;
            console.log(lama_nginap);
            try {
              // Your logic here
              console.log("Start Date:", startDate);
              console.log("End Date:", endDate);

              // Example: Redirect to the booking page with query parameters including tarifs, kamars, and selectedKamarId
              navigate("/addReservasi", {
                state: {
                  startDate,
                  endDate,
                  tarifs,
                  kamars,
                  selectedKamarId,
                  Tarif,
                  lama_nginap,
                },
              });
            } catch (error) {
              console.error("Error handling click:", error);
            }
          })
          .catch((error) => {
            console.error(error);
          });
        // console.log(response);
        // setDays(response.data);
      } catch (error) {
        // Handle error as needed
        console.error(error);
      }
    } else {
      setIsLoginModalOpen(true);
      console.log("User is not logged in, redirect to login page");
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
      <Box>
        <Heading pl={4} pt={4} pb={3} size={"lg"}>
          {title}
        </Heading>
        <Flex
          pl={4}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          shadow="md"
          className="bg-white"
          w={1000}
        >
          <Box
            mb={5}
            borderRadius="lg"
            borderWidth="1px"
            shadow="md"
            className="bg-white"
          >
            <Image
              src={imageSrc}
              borderTopLeftRadius="lg"
              borderTopRightRadius="lg"
              alt={title}
              width="300px"
              height="300px"
            />

            <HStack m={3}>
              <StraightenRoundedIcon />
              <Text ml={-1}>
                {ukuran_kamar} m<sup>2</sup>
              </Text>
            </HStack>
          </Box>
          <Box
            ml={3}
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            shadow="md"
            className="bg-white w-fit"
            width="screen"
            mr={3}
            mb={10}
            justify="flex-end"
          >
            <Heading as="h3" size="xl" mb={2}>
              {title}
            </Heading>
            <Text fontSize="lg" mb={4}>
              {description}
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              {price}
            </Text>
            <Text fontWeight="bold" mb={4}>
              Tarif: {Tarif}
            </Text>

            <Divider />
            <Box p={4} bg="white" shadow="md" rounded="md">
              <Flex direction="column" justify="space-between">
                <VStack spacing={3} flex={1}>
                  <HStack>
                    <Feature icon={HotelIcon} text="1 Twin Bed" />
                    <Feature icon={PeopleIcon} text="2 guests" />
                  </HStack>
                  <HStack>
                    <Feature icon={LocalOfferIcon} text="Without Breakfast" />
                    <Feature icon={WifiIcon} text="Free WiFi" />
                  </HStack>

                  <Feature icon={SmokeFreeIcon} text="Non-smoking" />
                  <Flex align="center">
                    <HelpOutlineIcon style={{ color: "#38A169" }} />
                    <Link
                      onClick={() => navigate("/rooms")}
                      ml={2}
                      color="teal.500"
                      textDecoration="underline"
                    >
                      More Details
                    </Link>
                  </Flex>
                </VStack>
              </Flex>
            </Box>
            <Flex justify="flex-end" p={4}>
              <Button
                colorScheme="teal"
                size="md"
                mt={4}
                px="6"
                rounded="full"
                as="a"
                mr={10}
                onClick={() => handleClick(selectedKamarId)}
                // href="/addReservasi" // Replace with your booking page URL
              >
                Book Now
              </Button>
              
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Peringatan</ModalHeader>
          <ModalBody>
            Anda harus login terlebih dahulu sebelum melakukan pemesanan.
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => setIsLoginModalOpen(false)}
            >
              Batal
            </Button>
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
