import { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'
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
  ModalBody
} from '@chakra-ui/react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'
import styled from '@emotion/styled'
import useProfileData from '../utilities/fetchUserData'
import { useLocation } from 'react-router-dom'
import ModalConfirmation from '../utilities/modal2'
import { useNavigate } from 'react-router-dom'

const ResumePage = () => {
  //const { user, customer } = useProfileData()
  const [nama, setNama] = useState('')
  const [no_telp, setNoTelp] = useState('')
  const [tanggal_reservasi, setTanggalReservasi] = useState('')
  const [waktu_reservasi, setWaktuReservasi] = useState('')
  const [fasilitas_tambahan, setFasilitasTambahan] = useState([
    { id: '', nama_fasilitas: '', harga: '', stock: '  ' }
  ])
  const [customer, setCustomer] = useState([])
  const location = useLocation()
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
  } = location.state || {}
  const [no_kamar, setNoKamar] = useState('')
  const [kapasitas, setHarga] = useState('')
  const [jenis_kamar, setJenis] = useState('')
  const [jenis_bed, setBed] = useState('')
  const [luas_kamar, setLuas] = useState('')
  const [fasilitas, setFasilitas] = useState('')
  const [status_ketersediaan, setStatus] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const [transaksiFasilitas, setTransaksiFasilitas] = useState([]);

  console.log('selectedKamarId', selectedKamarId)
  console.log('startDate', startDate)
  console.log('endDate', endDate)
  console.log('tarifs', tarifs)
  console.log('kamars', kamars)
  console.log('Tarif', Tarif)
  console.log('lama_nginap', lama_nginap)
  console.log('jmlhKamar', jmlhKamar)
  console.log('jmlhDewasa', jmlhDewasa)
  console.log('jmlhAnak', jmlhAnak)
  console.log('fasilitasIdsArray', fasilitasIdsArray)
  console.log('quantitiesArray', quantitiesArray)
  console.log('reservasis', reservasis)

  
  useEffect(() => {
    const getCustomerById = async () => {
        const response = await axios.get(`http://localhost:8000/customers/${reservasis.id_customer}`);
        setCustomer(response.data.data);
        console.log(response.data.data);
    };
    getCustomerById();
}, [reservasis.id_customer]);


  const steps = [
    { title: 'First', description: 'Book Your Room' },
    { title: 'Second', description: 'Resume Pembayaran' },
    { title: 'Third', description: 'Select Rooms' }
  ]

  const { activeStep, setActiveStep } = useSteps({
    index: 2,
    count: steps.length
  })

  useEffect(() => {
    const getFasilitasById = async () => {
        const response = await axios.get(`http://localhost:8000/transaksiFasilitas/${reservasis.id}`);
        setTransaksiFasilitas(response.data.data);
        console.log(response.data.data);
    };
    getFasilitasById();
}, [reservasis.id]);

console.log('transaksiFasilitas', transaksiFasilitas)

  const fasilitasGambar = [
    {
      imageSrc:
        'https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png'
    },
    {
      imageSrc:
        'https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png'
    },
    {
      imageSrc:
        'https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png'
    },
    {
      imageSrc:
        'https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png'
    },
    {
      imageSrc:
        'https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png'
    },
    {
      imageSrc:
        'https://storage.googleapis.com/image-storage-p3l/superior%201%20double%20bed.png'
    }
  ]

 

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
 

 
  const id = selectedKamarId
  useEffect(() => {
    const getKamarById = async () => {
      const response = await axios.get(`http://localhost:8000/kamars/${id}`)
      setNoKamar(response.data.data.no_kamar)
      setJenis(response.data.data.jenis_kamar)
      setHarga(response.data.data.kapasitas)
      setBed(response.data.data.jenis_bed)
      setLuas(response.data.data.luas_kamar)
      setFasilitas(response.data.data.fasilitas)
    }
    getKamarById()
  }, [id])

  const handleConfirm = () => {
    // Logic to be executed when confirmed
    saveReservasi()
    console.log('Confirmed!')
  }

  const handleCancel = () => {
    // Logic to be executed when canceled
    console.log('Canceled!')
  }


  
 

  const totalharga = Tarif * lama_nginap * jmlhKamar
  const saveReservasi = async e => {
    e.preventDefault()

    const response = await axios.post(
      'http://localhost:8000/reservasis/personal',
      {
        
      }
    )
    console.log(response.data)
    navigate('/roomBooking')
  }

  const handleContinue = () => {
    if(reservasis.id_pegawai === 1){
      navigate(`/paymentPage/${reservasis.id}`)
    }else{
      navigate('/riwayatTransaksi')
    }
    
  }

  

  

  return (
    <Box>
      <Box>
        <Navbar className='flex '>
          <NavbarBrand>
            <Image
              width={65}
              src='https://storage.googleapis.com/image-storage-p3l/logo-kecik.png'
              alt='NextUI Album Cover'
              classNames='m-5'
            />
            <p className='font-bold text-inherit'>Grand Atma Hotel</p>
          </NavbarBrand>
          <NavbarContent
            className='hidden sm:flex gap-4'
            justify='center'
          ></NavbarContent>
          <NavbarContent justify='end'>
            <NavbarItem className='hidden lg:flex'>
              <Stepper size='lg' index={activeStep}>
                {steps.map((step, index) => (
                  <Step key={index} >
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink='0'>
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
        <div className='w-full pr-20 pl-20 pb-20 pt-10 bg-white'>
          <div className='flex justify-around pr-10 pl-10'>
            <VStack className='w-full' spacing={4} align='stretch'>
              <Box>
                <Heading textAlign='left'>Resume Pemesanan</Heading>
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
                <div className='flex justify-between w-full '>
                  <Box p={4} className='w-1/2 bg-white'>
                    <Box
                      p={4}
                      className='w-full bg-white'
                      borderRadius='lg'
                      borderWidth='1px'
                      shadow='md'
                    >
                      <Heading as='h2' size='md' mb={4}>
                        Guest Information
                      </Heading>
                      <Divider></Divider>
                      <Box className='w-full bg-white flex' pt={2}>
                        <Box className='w-1/2 bg-white'>
                          <Box>
                            <Text fontWeight='bold'>Name:</Text>
                            <Text>{customer.nama}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight='bold'>Email:</Text>
                            <Text>{customer.email}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight='bold'>Phone:</Text>
                            <Text>{customer.no_telp}</Text>
                          </Box>
                        </Box>
                        <Box className='w-1/2 bg-white'>
                          <Box>
                            <Text fontWeight='bold'>No Identitas(KTP):</Text>
                            <Text>{customer.no_identitas}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight='bold'>Alamat:</Text>
                            <Text>{customer.alamat}</Text>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      p={4}
                      mt={5}
                      className='w-full bg-white'
                      borderRadius='lg'
                      borderWidth='1px'
                      shadow='md'
                    >
                      <Heading as='h2' size='md' mb={4}>
                        Rincian Fasilitas Tambahan
                      </Heading>
                      <Divider></Divider>
                      <SimpleGrid columns={[1]} spacing={6}>
                        {transaksiFasilitas.map((item) => (
                          <Text key={item.id}>{item.fasilitas.nama_fasilitas} ({item.jumlah}) = {item.subtotal}</Text>
                        ))}
                      </SimpleGrid>
                    </Box>
                    <Box
                      p={4}
                      mt={5}
                      className='w-full bg-white'
                      borderRadius='lg'
                      borderWidth='1px'
                      shadow='md'
                    >
                      <Heading as='h2' size='md' mb={4}>
                        Pembayaran
                      </Heading>
                      <Divider></Divider>
                      <Text fontWeight='bold'>Please Transfer to</Text>
                      <Box className='w-full bg-white flex justify-center' pb={3} borderRadius='lg'
                      borderWidth='1px'
                      shadow='md'pt={2} mt={2} >
                        <Box className='w-1/2 bg-white'>
                          <Box pt={2}>
                            <Text fontWeight='sm'>Account Number : </Text>
                          </Box>
                          <Box pt={2}>
                            <Text fontWeight='sm'>Account Holder Name:</Text>
                          </Box>
                          <Box pt={2}>
                            <Text fontWeight='sm'>Transfer Ammount:</Text>
                          </Box>
                        </Box>
                        <Box className='w-1/3 bg-white' >
                        <Box pt={2}>
                            <Text fontWeight="bold">770011770022 Bank Diamond </Text>
                            <Text></Text>
                          </Box>
                          <Box pt={2}>
                            <Text fontWeight="bold">Bank Diamond</Text>
                          </Box>
                          <Box pt={2}>
                            <Text fontWeight='bold'>{reservasis.total_bayarReservasi}</Text>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box className='w-1/2 bg-white'>
                    <Box
                      className='w-full bg-white'
                      borderRadius='lg'
                      borderWidth='1px'
                      shadow='md'
                      p={4}
                      mt={4}
                    >
                      <VStack align='flex-start' spacing={4}>
                        <Box>
                          <Text fontWeight='bold'>Detail Pemesanan</Text>
                        </Box>
                        <Box className='w-full bg-white flex' pt={2}>
                          <Box className='w-1/2 bg-white'>
                            <Box>
                              <Text fontWeight='bold'>Jumlah Dewasa:</Text>
                              <Text>{jmlhDewasa}</Text>
                            </Box>
                            <Box>
                              <Text fontWeight='bold'>Jumlah Anak-anak:</Text>
                              <Text>{jmlhAnak}</Text>
                            </Box>
                            <Box>
                              <Text fontWeight='bold'>Jumlah Kamar:</Text>
                              <Text>{jmlhKamar}</Text>
                            </Box>
                          </Box>
                          <Box className='w-1/2 bg-white'>
                          <Box>
                              <Text fontWeight='bold'>Booking ID</Text>
                              <Text>{reservasis.booking_id}</Text>
                            </Box>
                            <Box>
                              <Text fontWeight='bold'>Tanggal Cek-in</Text>
                              <Text>{startDate} (Check-in 14.00 WIB)</Text>
                            </Box>
                            <Box>
                              <Text fontWeight='bold'>Tanggal Check-out</Text>
                              <Text>{endDate} (Check-out 12.00 WIB)</Text>
                            </Box>
                          </Box>
                        </Box>

                        <Divider></Divider>

                        <Text fontWeight='bold'>Detail Kamar</Text>
                        <Box className='w-full bg-white flex'>
                          <Box className='w-1/2 bg-white'>
                            <Text>{jenis_kamar}</Text>
                            <Text>Jenis Bed: {jenis_bed}</Text>
                            <Text>Kapasitas: {kapasitas} Orang</Text>
                          </Box>
                          <Box className='w-1/2 bg-white'>
                            <Text>Fasilitas</Text>
                            <Text>{fasilitas}</Text>
                          </Box>
                        </Box>

                        <Accordion
                          className='w-full'
                          defaultIndex={[0]}
                          allowMultiple
                        >
                          <AccordionItem>
                            <h2>
                              <AccordionButton>
                                <Box
                                  as='span'
                                  flex='1'
                                  textAlign='left'
                                  fontWeight='bold'
                                >
                                  Rincian harga
                                </Box>

                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              <Box className=' w-full flex justify-between'>
                                <Text fontWeight='semibold'>
                                  Harga /Kamar/Malam
                                </Text>
                                <Text fontWeight='semibold'>Rp {Tarif}</Text>
                              </Box>
                              <Box className=' w-full flex justify-between'>
                                <Text fontWeight='semibold'>Lama Menginap</Text>
                                <Text fontWeight='semibold'>
                                  {lama_nginap} Hari
                                </Text>
                              </Box>

                              <Box className=' w-full flex justify-between'>
                                <Text fontWeight='semibold'>
                                  Taxes and fees
                                </Text>
                                <Text fontWeight='semibold'>0</Text>
                              </Box>
                              <Divider></Divider>
                              <Box className=' w-full flex justify-between'>
                                <Text fontWeight='semibold'>Total Harga</Text>
                                <Text fontWeight='semibold'>
                                  Rp {totalharga}
                                </Text>
                              </Box>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                        <Button
                          colorScheme='blue'
                          mt={4}
                          onClick={() => handleContinue()}
                        >
                          Continue Payment
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
                                colorScheme='blue'
                                onClick={saveReservasi}
                              >
                                Confirm
                              </Button>
                              <Button
                                colorScheme='gray'
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
  )
}

export default ResumePage


function Footer () {
  return (
    <Box
      as='footer'
      bg='teal.500'
      color='white'
      py={4}
      px={2}
      borderTop='1px solid'
      borderColor='teal.600'
      
    >
      <Container maxW='container.xl'>
        <SimpleGrid columns={[1, 3]} spacing={8}>
          <chakra.div>
            <Heading as='h3' size='md' mb={2}>
              Quick Links
            </Heading>
            <List>
              <ListItem>
                <Link href='/rooms'>
                  Rooms
                  {/* <ChevronRightIcon ml={1} /> */}
                </Link>
              </ListItem>
              <ListItem>
                <Link href='/about'>
                  About Us
                  {/* <ChevronRightIcon ml={1} /> */}
                </Link>
              </ListItem>
              <ListItem>
                <Link href='/contact'>
                  Contact Us
                  {/* <ChevronRightIcon ml={1} /> */}
                </Link>
              </ListItem>
            </List>
          </chakra.div>
          <chakra.div>
            <Heading as='h3' size='md' mb={2}>
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
            <Heading as='h3' size='md' mb={2}>
              Follow Us
            </Heading>
            <Text>
              Stay connected with us on social media for updates and offers.
            </Text>
          </chakra.div>
        </SimpleGrid>
        <Divider mt={6} borderColor='teal.600' />
        <Text mt={4}>&copy; 2023 Grand Atma Hotel. All rights reserved.</Text>
      </Container>
    </Box>
  )
}
