import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import SidebarTest from "../SidebarTest";
import Navbar from "../Navbar";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

import {
  Table as NextTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import {
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
const HomeFO = () => {
  const { mutate } = useSWRConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isCheckInSuccess, setIsCheckInSuccess] = useState(false);
  const [isTambahFasilitas, setIsTambahFasilitas] = useState(false);
  const [fasilitas_tambahan, setFasilitasTambahan] = useState([
    { id: "", nama_fasilitas: "", harga: "", stock: "  " },
  ]);
  const [transaksiFasilitas, setTransaksiFasilitas] = useState([]);
  const [reservationId, setReservationId] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isCheckoutForm, setIsCheckoutForm] = useState(false);  

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  useEffect(() => {
    const fetcher = async () => {
      const response = await axios.get("http://localhost:8000/reservasis");
      setData(response.data.data);
    };
    fetcher();
  }, []);
  
  useEffect(() => {
    const fetcher = async () => {
      const response = await axios.get(
        "http://localhost:8000/fasilitasTambahans"
      );
      setFasilitasTambahan(response.data.data);
    };
    fetcher();
  }, []);
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

  const filteredData = data.filter((riwayatReservasi) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      riwayatReservasi.booking_id.toLowerCase().includes(searchTermLower) ||
      riwayatReservasi.tanggal_checkin.toString().includes(searchTermLower) ||
      // Add conditions for nested properties
      riwayatReservasi.customer.nama.toLowerCase().includes(searchTermLower) ||
      riwayatReservasi.status_reservasi
        .toLowerCase()
        .includes(searchTermLower) ||
      riwayatReservasi.tanggal_pembayaran.toString().includes(searchTermLower)
    );
  });


  function formatDateToDateString(dateString) {
    const date = new Date(dateString);

    if (dateString === "1970-01-01T00:00:00.000Z") {
      return "-";
    }

    const options = { day: "2-digit", month: "2-digit", year: "numeric" };

    return date.toLocaleDateString("en-GB", options);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const checkinReservasi = async (reservasi) => {
    const response = await axios.put(
      `http://localhost:8000/reservasis/update/${reservasi.id}`,
      {
        status_reservasi: "Sudah Checkin",
        tanggal_pembayaran: reservasi.tanggal_pembayaran,
      }
    );
    console.log(response.data);
  };
  function openModal() {
    setIsOpen(true);
  }

  const isToday = (input) => {
    const currentDate = new Date();
    const inputDate = new Date(input);

    return (
      inputDate.getDate() === currentDate.getDate() &&
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleCheckIn = (reservasi) => {
    setSelectedReservation(reservasi);
    openModal();
  };

  const handleCheckInSuccess = () => {
    checkinReservasi(selectedReservation);
    closeModal();
    
    setIsCheckInSuccess(true);
  };

 

  

  // FILEPATH: /d:/Kuliah/Semester 7/P3L/Coding/Frontend/fronted_p3l_vite/src/components/frontOffice/homeFO.jsx

  const handleCheckOut = (id) => {
    navigate(`/checkOutPage/${id}`);
  };


  const handleTambahFasilitas = (reservasi) => {
    console.log(reservasi);
    setSelectedReservation(reservasi);
    setReservationId(reservasi.id);
    console.log(reservasi.id);
    console.log(reservationId);
    getTransaksiFasilitasById(reservasi.id);
    
    console.log("selectedReservasi:", selectedReservation);
    setIsTambahFasilitas(true);
  };

  const getTransaksiFasilitasById = async (reservasi) => {
    const response = await axios.get(
      `http://localhost:8000/transaksiFasilitas/${reservasi}`
    );
    setTransaksiFasilitas(response.data.data);
    console.log(response.data.data);
  };

  const handleSaveTambahFasilitas = () => {
    openConfirmationModal();
    setSelectedReservation(null);
    setIsConfirmationModalOpen(false)
  };

  const saveTambahFasilitas = async () => {
    console.log("reservationId", reservationId);
    const response = await axios.post(
      `http://localhost:8000/transaksiFasilitas/`,
      {
        id_reservasi: reservationId,
        fasilitas_ids: fasilitasIdsArray,
        jumlah_fasilitas: quantitiesArray,
      }
    );
    console.log(response.data);
  };

  const navigateToNotaPelunasanPage = async (reservasiId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/invoices/reservasi/${reservasiId}`
      );
      const invoiceId = response.data.data.id;
      navigate(`/notaLunas/${invoiceId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App flex justify-between">
      <SidebarTest />
      <div className="w-screen ">
        <Navbar />
        <div className="w-full p-10">
          <h1 className="text-3xl font-semibold text-gray-900 pb-10">
            Riwayat Transaksi
          </h1>

          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-slate-200 rounded-md p-2 focus:ring focus:ring-blue-400"
          />
          <div className="relative shadow rounded-lg mt-3">
            <NextTable responsive>
              <TableHeader>
                <TableColumn>No</TableColumn>
                <TableColumn>Booking ID</TableColumn>
                <TableColumn>Customer</TableColumn>
                <TableColumn>Tanggal Checkin</TableColumn>
                <TableColumn>Tanggal Pembuatan</TableColumn>
                <TableColumn>Status Reservasi</TableColumn>
                <TableColumn>Tanggal Pembayaran</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              {/* <TableBody items={items}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>
                        {columnKey === "customer.nama"
                          ? getKeyValue(item.customer, "nama")
                          : getKeyValue(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody> */}
              <TableBody>
                {filteredData.map((reservasi, index) => (
                  <TableRow key={reservasi.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{reservasi.booking_id}</TableCell>
                    <TableCell>{reservasi.customer.nama}</TableCell>
                    <TableCell>
                      {formatDateToDateString(reservasi.tanggal_checkin)}
                    </TableCell>
                    <TableCell>
                      {formatDateToDateString(reservasi.create_date)}
                    </TableCell>
                    <TableCell>{reservasi.status_reservasi}</TableCell>
                    <TableCell>
                      {formatDateToDateString(reservasi.tanggal_pembayaran)}
                    </TableCell>
                    <TableCell>
                      {(reservasi.status_reservasi === "Sudah Checkin" && (
                        <button
                          onClick={() => handleCheckOut(reservasi.id)}
                          className={`font-medium px-3 py-1 rounded text-white mr-1 bg-red-400 hover:bg-red-500`}
                        >
                          Checkout
                        </button>
                      )) ||
                        (reservasi.status_reservasi === "Lunas" &&
                          isToday(reservasi.tanggal_checkin) && (
                            <button
                              onClick={() => handleCheckIn(reservasi)}
                              className={`font-medium px-3 py-1 rounded text-white mr-1 bg-blue-400 hover:bg-blue-500`}
                            >
                              Check In
                            </button>
                          )) || (
                          <button
                            onClick={() => handleCheckIn(reservasi)}
                            disabled={
                              reservasi.status_reservasi === "Belum Dibayar" ||
                              (reservasi.status_reservasi === "Lunas" &&
                                !isToday(reservasi.tanggal_checkin))
                            }
                            className={`font-medium px-3 py-1 rounded text-white mr-1 bg-gray-400 cursor-not-allowed`}
                          >
                            Check In
                          </button>
                        )}
                      <button
                        onClick={() => handleTambahFasilitas(reservasi)}
                        className={`font-medium px-3 py-1 mr-1 rounded text-white ${
                          reservasi.status_reservasi === "Sudah Checkin"
                            ? "bg-green-400 hover:bg-green-500"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={
                          reservasi.status_reservasi !== "Sudah Checkin"
                        }
                      >
                        Tambah Fasilitas
                      </button>
                      {(reservasi.status_reservasi === "Sudah Checkout" && (
                          <button
                            onClick={() => navigateToNotaPelunasanPage(reservasi.id)}
                            className={`font-medium px-3 py-1 rounded text-white ${
                              reservasi.status_reservasi === "Sudah Checkout"
                                ? "bg-blue-400 hover:bg-blue-500"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                            disabled={
                              reservasi.status_reservasi !== "Sudah Checkout"
                            }
                          >
                            Cetak Invoice
                          </button>
                        ))}
                      
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </NextTable>
          </div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Reservation Details
                      </Dialog.Title>
                      <div className="mt-2">
                        {selectedReservation && (
                          <>
                            <p>Booking ID: {selectedReservation.booking_id}</p>
                            <p>
                              Customer Name: {selectedReservation.customer.nama}
                            </p>
                            <p>
                              Tanggal Checkin:{" "}
                              {formatDateToDateString(
                                selectedReservation.tanggal_checkin
                              )}
                            </p>
                            <p>
                              Tanggal Pembuatan:{" "}
                              {formatDateToDateString(
                                selectedReservation.create_date
                              )}
                            </p>
                            <p>
                              Status Reservasi:{" "}
                              {selectedReservation.status_reservasi}
                            </p>
                          </>
                        )}
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="ml-1 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="ml-1 justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={handleCheckInSuccess}
                        >
                          Checkin
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <Transition appear show={isCheckInSuccess} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsCheckInSuccess(false)}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Check-In Success
                    </Dialog.Title>
                    <div className="mt-2">
                      <p>The check-in is successful!</p>
                      <p>Berhasil Deposit RP 300.000</p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="ml-1 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setIsCheckInSuccess(false)}
                      >
                        Close
                      </button>
                    </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          
          <Transition appear show={isTambahFasilitas} as={Fragment}>
            <Dialog as="div" className="z-50" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex  items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 pb=5 mb=5 "
                      >
                        Tambah Fasilitas Tambahan
                      </Dialog.Title>
                      <Box>
                        <div className="w-full  bg-white">
                          <div className="flex justify-around ">
                            <VStack
                              className="w-full"
                              spacing={4}
                              align="stretch"
                            >
                              <Box>
                                <div className="flex justify-between w-full ">
                                  <Box p={4} pt={0} className="w-2/3 bg-white">
                                    <Box
                                      p={4}
                                      mt={5}
                                      className="w-full bg-white"
                                    >
                                      <Heading as="h2" size="md" mb={4}>
                                        Fasilitas Tambahan
                                      </Heading>
                                      <Divider></Divider>
                                    </Box>
                                    <Box
                                      p={4}
                                      className="w-full bg-white"
                                      borderRadius="lg"
                                      borderWidth="1px"
                                      shadow="md"
                                      maxHeight="500px"
                                      overflowY="auto"
                                    >
                                      <SimpleGrid columns={[1]} spacing={3}>
                                        {fasilitas_tambahan.map((item) => (
                                          <HorizontalFasilitasCard
                                            key={item.id}
                                            imageSrc={
                                              "https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png"
                                            }
                                            title={item.nama_fasilitas}
                                            s
                                            description={item.jenis_bed}
                                            price={item.harga}
                                            ukuran_kamar={item.luas_kamar}
                                            fasilitasId={item.id}
                                            handleQuantityChange={
                                              handleQuantityChange
                                            }
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
                                          <Text fontWeight="bold">
                                            Fasilitas Terpesan
                                          </Text>
                                        </Box>
                                        <SimpleGrid columns={[1]} spacing={6}>
                                          {transaksiFasilitas.map((item) => (
                                            <Text key={item.id}>
                                              {item.fasilitas.nama_fasilitas} (
                                              {item.jumlah}) = {item.subtotal}
                                            </Text>
                                          ))}
                                        </SimpleGrid>
                                        <Divider></Divider>

                                        {/* <Button
                                          colorScheme="blue"
                                          mt={4}
                                          // onClick={() => handleContinue()}
                                        >
                                          Continue Transaction
                                        </Button> */}
                                      </VStack>
                                    </Box>
                                  </Box>
                                </div>
                              </Box>
                            </VStack>
                          </div>
                        </div>
                      </Box>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="ml-1 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setIsTambahFasilitas(false)}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="ml-1 justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={handleSaveTambahFasilitas}
                        >
                          Pesen Fasilitas
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <Transition appear show={isConfirmationModalOpen} as={Fragment}>
            <Dialog as="div" className="z-50" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex  items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 pb=5 mb=5 "
                      >
                        Confirmation
                      </Dialog.Title>
                      <Box>
                        <div className="modal">
                          <div className="modal-content">
                            <p>Are you sure you want to add this facility?</p>
                          </div>
                        </div>
                      </Box>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="ml-1 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => closeConfirmationModal}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="ml-1 justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={saveTambahFasilitas}
                        >
                          Pesen Fasilitas
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <Transition appear show={isCheckoutForm} as={Fragment}>
            <Dialog as="div" className="z-50" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex  items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 pb=5 mb=5 "
                      >
                        Tambah Fasilitas Tambahan
                      </Dialog.Title>
                      <Box>
                        <div className="w-full  bg-white">
                          <div className="flex justify-around ">
                            <VStack
                              className="w-full"
                              spacing={4}
                              align="stretch"
                            >
                              <Box>
                                <div className="flex justify-between w-full ">
                                  <Box p={4} pt={0} className="w-2/3 bg-white">
                                    <Box
                                      p={4}
                                      mt={5}
                                      className="w-full bg-white"
                                    >
                                      <Heading as="h2" size="md" mb={4}>
                                        Fasilitas Tambahan
                                      </Heading>
                                      <Divider></Divider>
                                    </Box>
                                    <Box
                                      p={4}
                                      className="w-full bg-white"
                                      borderRadius="lg"
                                      borderWidth="1px"
                                      shadow="md"
                                      maxHeight="500px"
                                      overflowY="auto"
                                    >
                                      <SimpleGrid columns={[1]} spacing={3}>
                                        {fasilitas_tambahan.map((item) => (
                                          <HorizontalFasilitasCard
                                            key={item.id}
                                            imageSrc={
                                              "https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png"
                                            }
                                            title={item.nama_fasilitas}
                                            s
                                            description={item.jenis_bed}
                                            price={item.harga}
                                            ukuran_kamar={item.luas_kamar}
                                            fasilitasId={item.id}
                                            handleQuantityChange={
                                              handleQuantityChange
                                            }
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
                                          <Text fontWeight="bold">
                                            Fasilitas Terpesan
                                          </Text>
                                        </Box>
                                        <SimpleGrid columns={[1]} spacing={6}>
                                          {transaksiFasilitas.map((item) => (
                                            <Text key={item.id}>
                                              {item.fasilitas.nama_fasilitas} (
                                              {item.jumlah}) = {item.subtotal}
                                            </Text>
                                          ))}
                                        </SimpleGrid>
                                        <Divider></Divider>
                                      </VStack>
                                    </Box>
                                  </Box>
                                </div>
                              </Box>
                            </VStack>
                          </div>
                        </div>
                      </Box>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="ml-1 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setIsTambahFasilitas(false)}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="ml-1 justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={handleSaveTambahFasilitas}
                        >
                          Pesen Fasilitas
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default HomeFO;

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
      borderRadius="md"
      overflow="hidden"
      shadow="sm"
      className="bg-white"
      p={2}
      maxW="300px"
    >
      <Image
        src={imageSrc}
        alt={title}
        width="80px"
        height="80px"
        borderRadius="md"
      />
      <Box p={2} flex="1">
        <VStack align="flex-start" spacing={2}>
          <Box>
            <Text fontWeight="bold" fontSize="small">
              {title}
            </Text>
            <Text fontSize="xs">{description}</Text>
          </Box>
          <Box>
            <Text fontWeight="medium" fontSize="small">
              Harga: Rp {price}
            </Text>
          </Box>
          <Center>
            <Button
              onClick={decrementCounter}
              size="sm"
              bgColor="white"
              borderRadius="sm"
            >
              -
            </Button>
            <Text fontSize="sm" fontWeight="medium" mx={2}>
              {quantity}
            </Text>
            <Button
              onClick={incrementCounter}
              size="sm"
              bgColor="white"
              borderRadius="sm"
            >
              +
            </Button>
          </Center>
        </VStack>
      </Box>
    </Flex>
  );
}