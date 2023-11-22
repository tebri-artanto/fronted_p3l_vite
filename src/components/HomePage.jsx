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
  FormControl,
  Select,
  VStack,
} from "@chakra-ui/react";
import useSWR, { useSWRConfig } from "swr";
import NavbarHome from "./NavbarHome";
import axios from "axios";
import Icon from "@mui/material/Icon";

<Icon>star</Icon>;

// import { ChevronRightIcon } from "@chakra-ui/icons";

function Header() {
  return (
    <Box
      as="header"
      bg="teal.500"
      color="white"
      py={4}
      px={2}
      borderBottom="1px solid"
      borderColor="teal.600"
    >
      <Container maxW="container.xl">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading as="h1" size="lg">
            Grand Atma Hotel
          </Heading>
          <HStack spacing={4}>
            <Link href="/booking">Book Now</Link>
            <Link href="/login">Login</Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
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

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {

  //   const fetcher = async () => {
  //     try {
  //       // Fetch data from the kamar table
  //       const kamarResponse = await axios.get("http://localhost:8000/kamars");
  //       const kamars = kamarResponse.data.data;

  //       // Fetch related data from the tarif and season tables for each kamar
  //       const joinedData = await Promise.all(
  //         kamars.map(async (kamar) => {
  //           // Fetch the related tarif record
  //           const tarifResponse = await axios.get(
  //             `http://localhost:8000/tarifs/${kamar.id_tarif}`
  //           );
  //           const tarif = tarifResponse.data.data;

  //           // Fetch the related season record
  //           const seasonResponse = await axios.get(
  //             `http://localhost:8000/seasons/${tarif.id_season}`
  //           );
  //           const season = seasonResponse.data.data;

  //           return {
  //             ...kamar,
  //             tarif,
  //             season,
  //           };
  //         })
  //       );
  //       setData(joinedData);
  //     } catch (error) {
  //       // Handle errors here
  //       console.error("Error fetching data:", error);
  //       throw error;
  //     }
  //   };
  //   fetcher();
  // }, []);

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const fetcher = async () => {
    try {
      // Fetch data from the kamar table
      const kamarResponse = await axios.get("http://localhost:8000/kamars");
      const kamars = kamarResponse.data.data;

      // Fetch related data from the tarif and season tables for each kamar
      const joinedData = await Promise.all(
        kamars.map(async (kamar) => {
          // Fetch the related tarif record
          const tarifResponse = await axios.get(
            `http://localhost:8000/tarifs/${kamar.id_tarif}`
          );
          const tarif = tarifResponse.data.data;

          // Fetch the related season record
          const seasonResponse = await axios.get(
            `http://localhost:8000/seasons/${tarif.id_season}`
          );
          const season = seasonResponse.data.data;

          return {
            ...kamar,
            tarif,
            season,
          };
        })
      );

      return joinedData;
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const [seasons, setSeasons] = useState([]);
  const [tarifs, setTarifs] = useState(null);
  const [kamars, setKamars] = useState([
    {
      id: "",
      no_kamar: "",
      jenis_kamar: "",
      kapasitas: "",
      jenis_bed: "",
      luas_kamar: "",
      fasilitas: "",
    },
  ]);
  const [kamarId, setKamarId] = useState([]);
  // const { data } = useSWR("kamar", fetcher);
  // if (!data) return <h2>Loading...</h2>;

  // const filteredData = data.filter((kamar) => {
  //   const searchTermLower = searchTerm.toLowerCase();
  //   return (
  //     // (kamar.season.tanggal_mulai === value.startDate) &&
  //     (kamar.no_kamar.toLowerCase().includes(searchTermLower) ||
  //       kamar.jenis_kamar.toLowerCase().includes(searchTermLower) ||
  //       kamar.kapasitas.toString().includes(searchTermLower) ||
  //       kamar.jenis_bed.toLowerCase().includes(searchTermLower) ||
  //       kamar.luas_kamar.toString().includes(searchTermLower) ||
  //       kamar.fasilitas.toLowerCase().includes(searchTermLower) ||
  //       kamar.tarif.besaran_tarif.toString().includes(searchTermLower) ||
  //       kamar.season.nama_season.toLowerCase().includes(searchTermLower))

  //   );
  // });

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
          `http://localhost:8000/tarifs/search/${seasonId}`
        );
        console.log(tarifsResponse.data.data);

        // If there are tariffs associated with the season, fetch the rooms for each tariff
        if (tarifsResponse.data.data.length > 0) {
          const kamarsResponse = await axios.get(
            `http://localhost:8000/kamars/season/${seasonId}`
          );
          console.log(kamarsResponse.data.data);

          setKamars(kamarsResponse.data.data);
          setTarifs(tarifsResponse.data.data);
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



  return (
    <Box>
      {/* <Header /> */}
      <NavbarHome />
      {/* Hero Section */}
      <Box
        bgImage="url('https://storage.googleapis.com/image-storage-p3l/DALL%C2%B7E%202023-11-04%2017.48.42%20-%20Imagine%20a%20towering%20marble%20facade%20dominating%20the%20city%20skyline%2C%20constructed%20from%20pristine%20white%20limestone%20and%20featuring%20floor-to-ceiling%20windows.%20The%20ho.png')" // Replace with your hotel image URL
        bgSize="cover"
        bgPosition="center"
        h="500px"
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
            Welcome to Our Hotel
          </Heading>
          <Text fontSize="xl" mb={8}>
            Experience luxury and comfort at our world-class hotel.
          </Text>
          <Button
            colorScheme="teal"
            size="lg"
            px="8"
            rounded="full"
            as="a"
            href="/roomBooking" // Replace with your booking page URL
          >
            Book Now
          </Button>
        </Container>
      </Box>

      {/* Room Showcase Section */}
      <Container maxW="container.xl" pb={16} mt={-10}>
        <Heading as="h2" size="2xl" mb={8} pt={100}>
          Explore Our Rooms
        </Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          <RoomCard
            imageSrc="https://jakarta.el-hotels.com/sites/default/files/jkt/Superior-king.jpg" // Replace with room image URL
            title="Superior"
            description="Comfortable and affordable standard room."
            price="$99/night"
          />
          <RoomCard
            imageSrc="https://djmzubtjl6upi.cloudfront.net/wp-content/uploads/sites/3/2017/12/Deluxe-Double-Guestroom2.jpg" // Replace with room image URL
            title="Double Deluxe"
            description="Relax in our stylish and modern deluxe room."
            price="$199/night"
          />
          <RoomCard
            imageSrc="https://d2ile4x3f22snf.cloudfront.net/wp-content/uploads/sites/237/2017/12/26064237/One-World-Hotel-Petaling-Jaya-Malaysia-rooms-Executive-Deluxe-Twin-image01.jpg" // Replace with room image URL
            title="Executive Deluxe"
            description="Experience the ultimate luxury in our spacious suite."
            price="$299/night"
          />
          <RoomCard
            imageSrc="https://image-tc.galaxy.tf/wijpeg-9x3pb1xdcg00ksf35jeloubva/junior-suite-hotel-gran-mahakam_wide.jpg?crop=0%2C104%2C2000%2C1125" // Replace with room image URL
            title="Junior Suite"
            description="Relax in our stylish and modern deluxe room."
            price="$199/night"
          />
        </SimpleGrid>
      </Container>

      <Footer />
    </Box>
  );
};
import HotelIcon from "@mui/icons-material/Hotel";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import WifiIcon from "@mui/icons-material/Wifi";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StraightenRoundedIcon from "@mui/icons-material/Straighten";
import { Spacer } from "@chakra-ui/react";

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
}) {
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
              Superior Twin Room Only
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
                      href="#"
                      ml={2}
                      color="teal.500"
                      textDecoration="underline"
                    >
                      Read Cancellation Policy
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
                href="/booking" // Replace with your booking page URL
              >
                Book Now
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

import RoomFacilityModal from "./utilities/modalDetailKamar";
import ModalDoubleDeluxe from "./utilities/modalDobleDeluxe";
import ModalJuniorSuite from "./utilities/modalJuniorSuite";
import ModalExecutiveDeluxe from "./utilities/modalExecutiveDeluxe";

function RoomCard({ imageSrc, title, description, price }) {
  
    const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="md">
      <Image src={imageSrc} alt={title} />
      <Box p={4}>
        <Heading as="h3" size="xl" mb={2}>
          {title}
        </Heading>
        <Text fontSize="lg" mb={4}>
          {description}
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          
        </Text>
        <Button
          colorScheme="teal"
          size="md"
          mt={4}
          px="6"
          rounded="full"
          onClick={openModal}
        >
          View Details
        </Button>

        <RoomFacilityModal
          isOpen={isModalOpen && title === "Superior"}
          onClose={closeModal}
          imageSrc={imageSrc}
          title={title}
          description={description}
          price={price}
        />
        <ModalDoubleDeluxe
          isOpen={isModalOpen && title === "Double Deluxe"}
          onClose={closeModal}
          imageSrc={imageSrc}
          title={title}
          description={description}
          price={price}
        />
        <ModalJuniorSuite
          isOpen={isModalOpen && title === "Junior Suite"}
          onClose={closeModal}
          imageSrc={imageSrc}
          title={title}
          description={description}
          price={price}
        />
        <ModalExecutiveDeluxe
          isOpen={isModalOpen && title === "Executive Deluxe"}
          onClose={closeModal}
          imageSrc={imageSrc}
          title={title}
          description={description}
          price={price}
        ></ModalExecutiveDeluxe>
      </Box>
    </Box>
  );
}

export default HomePage;
