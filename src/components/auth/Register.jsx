import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Label, TextInput } from 'flowbite-react'
import { useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import dotenv from 'dotenv'

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

function Register () {

 
 
  const navigate = useNavigate()
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

 

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8000/customers', values);
      console.log(values)
      console.log('Registration successful:', response.data)
      window.alert('Registration Succesfull')
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      nama: '',
      no_identitas: '',
      no_telp: '',
      email: '',
      alamat: ''
    },
    onSubmit: handleSubmit,
    validationSchema: yup.object().shape({
      username: yup.string().required('Please enter your username'),
      password: yup.string().required('Please enter your password'),
      nama: yup.string().required('Please enter your name'),
      no_identitas: yup.string().required('Please enter your identity number'),
      no_telp: yup.string().required('Please enter your phone number'),
      email: yup.string().required('Please enter your email'),
      alamat: yup.string().required('Please enter your address')
    })
  });

  const handleForm = event => {
    const { target } = event
    formik.setFieldValue(target.name, target.value)
  }
  return (
    <div className='max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
      {/* <form className='flex max-w-md flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='username2' value='Your username' />
          </div>
          <TextInput
            id='username2'
            name='username'
            placeholder='Username'
            shadow
            type='text'
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='password2' value='Your password' />
          </div>
          <div className='relative'>
            <TextInput
              id='password2'
              name='password'
              required
              shadow
              type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-2 top-3 cursor-pointer'
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <Button type='submit'>Register new account</Button>
      </form> */}
      {/* <Box padding='4' border='1px solid lightgray' borderRadius='4px' mt='8'> */}
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing='3'>
          <Heading size='lg'>Register</Heading>
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
            <FormControl isInvalid={formik.errors.username}>
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
            </FormControl>
            <Button type='submit' colorScheme='teal'>
              Register new account
            </Button>
          </Stack>
        </form>
      {/* </Box> */}
    </div>
  )
}

export default Register
