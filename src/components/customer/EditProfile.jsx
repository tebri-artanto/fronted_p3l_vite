import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Label, TextInput } from 'flowbite-react'
import { useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputRightElement,
  InputGroup,
  Stack
} from '@chakra-ui/react'

import Cookies from 'js-cookie';

function EditProfile () {
  const navigate = useNavigate()
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [user, setUser] = useState([{'id':'','username':'',}]);
    const [customer, setCustomer] = useState([{'id':'','nama':'', 'alamat':'', 'no_telp':'', 'email':''}]);
  const [userData, setUserData] = useState({
    // username: '',
    // password: '',
    nama: '',
    no_identitas: '',
    no_telp: '',
    email: '',
    alamat: '',
    nama_istitusi: '',
    id_user: ''
  });

  useEffect(() => {
    const token = Cookies.get('authToken');
      console.log(token);
    // Check if the user is authenticated
    if (!token) {
      // Redirect to the login page if no token is found
      history.push('/login');
    }

    // Make an authenticated API request to fetch user data
    fetchUserData(token);
  }, []);

  const fetchUserData = async (token) => {
    // Send the token with the request to authenticate
    try {
      const response = await axios.get('http://localhost:8000/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      
      setUser(response.data.data);
        
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

  const fetchCustomerData = async (user) => {
    try {
      const response = await axios.get(`http://localhost:8000/customers/akun/${user.id}`);
      
      
      setCustomer(response.data.data);
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  }

  fetchCustomerData(user);
  

 
  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(`http://localhost:8000/customers/${customer.id}`,values);
      console.log(values);
      console.log(response);
      console.log('UpdateSuccessful:', response.data)
      navigate('/profile')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const formik = useFormik({
    initialValues: customer,
    onSubmit: handleSubmit,
    validationSchema: yup.object().shape({
    //   username: yup.string().required('Please enter your username'),
    //   password: yup.string().required('Please enter your password'),
      nama: yup.string().required('Please enter your name'),
      no_identitas: yup.string().required('Please enter your identity number'),
      no_telp: yup.string().required('Please enter your phone number'),
      email: yup.string().required('Please enter your email'),
      alamat: yup.string().required('Please enter your address')
    }),
    enableReinitialize: true,
  });

  const handleForm = event => {
    const { target } = event
    formik.setFieldValue(target.name, target.value)
  }
  return (
    <div className='max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing='3'>
          <Heading size='lg'>EditProfile
        </Heading>
            <FormControl isInvalid={formik.errors.nama}>
              <FormLabel>Nama Lengkap</FormLabel>
              <Input
                onChange={handleForm}
                type='text'
                name='nama'
                onBlur={formik.handleBlur}
                value={formik.values.nama}
              />
              <FormErrorMessage>{formik.errors.nama}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.no_identitas}>
              <FormLabel>Nomor Identitas(KTP)</FormLabel>
              <Input
                onChange={handleForm}
                type='text'
                name='no_identitas'
                onBlur={formik.handleBlur}
                value={formik.values.no_identitas}
              />
              <FormErrorMessage>{formik.errors.no_identitas}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.no_telp}>
              <FormLabel>Nomor Telepon</FormLabel>
              <Input
                onChange={handleForm}
                type='text'
                name='no_telp'
                onBlur={formik.handleBlur}
                value={formik.values.no_telp}
              />
              <FormErrorMessage>{formik.errors.no_telp}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.alamat}>
              <FormLabel>Alamat</FormLabel>
              <Input
                onChange={handleForm}
                type='text'
                name='alamat'
                onBlur={formik.handleBlur}
                value={formik.values.alamat}
              />
              <FormErrorMessage>{formik.errors.alamat}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                onChange={handleForm}
                type='email'
                name='email'
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            {/* <FormControl isInvalid={formik.errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                onChange={handleForm}
                type='text'
                name='username'
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup size='md'>
                <Input
                  onChange={handleForm}
                  type={show ? 'text' : 'password'}
                  name='password'
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl> */}
            <Button type='submit' colorScheme='teal'>
              EditProfile
            </Button>
          </Stack>
        </form>
      {/* </Box> */}
    </div>
  )
}

export default EditProfile
