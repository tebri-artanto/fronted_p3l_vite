import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useContext } from 'react'
import AuthContext from './context/AuthProvider'
import Cookies from 'js-cookie';

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
  Stack,
  Link,
  Text
} from '@chakra-ui/react'

const Login = () => {
  
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  console.log(import.meta.env.VITE_API_HOSTING);
  const API_URL = import.meta.env.VITE_API_HOSTING;
  console.log(API_URL);
  

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  // const handleSubmit = async values => {
  //   try {
  //     const response = await axios.post('http://localhost:8000/auth/login', values)
  //     console.log(values)
  //     if (!window.alert('Login Succesfull')){
  //       navigate('/');
  //     }else{
  //       navigate('/login');
  //     }


  //   } catch (error) {
  //     console.error('Login failed:', error)
  //   }
  // }
  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('authToken', token);
  };
  const handleSubmit = async (values) => {
    try {


      const response = await axios.post(`${API_URL}/auth/login`, values);
      const token = response.data.data.token;
      console.log(token);

      // Store the token in a cookie
      Cookies.set('authToken', token);
      saveTokenToLocalStorage(response.data.token);
      window.alert('Login Succesfull')
      const test = await axios.get(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(test);
      // Redirect to the profile page
      if (test.data.data.id_role === 1) {
        navigate('/');
      } else if (test.data.data.id_role === 2) {
        navigate('/season');
      } else if (test.data.data.id_role === 3) {
        navigate('/kamar');
      } else if (test.data.data.id_role === 5) {
        navigate('/homeFO');
      } else if (test.data.data.id_role === 6 || test.data.data.id_role === 7) {
        navigate('/homeLaporan');
      }



    } catch (err) {

      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        window.alert('Missing Username or Password')
        setErrMsg();
      } else if (err.response?.status === 401) {

        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: handleSubmit,

    validationSchema: yup.object().shape({
      username: yup.string().required('Please enter your username'),
      password: yup.string().required('Please enter your password')
    })
  })

  const handleForm = event => {
    const { target } = event
    formik.setFieldValue(target.name, target.value)
  }

  return (
    <div className='max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing='3'>
          <Heading size='lg'>Login</Heading>
          <FormControl isInvalid={formik.errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              onChange={handleForm}
              type='text'
              name='username'
              onBlur={formik.handleBlur}
              value={formik.values.username}
              id="username"
              ref={userRef}
              autoComplete="off"
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
                id="password"
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
            Login
          </Button>
          <Text fontSize='md'>New Customer? {' '}
            <Link color='teal.500' href='/register'>
              Create a new account here.
            </Link></Text>
        </Stack>
      </form>
    </div>
  )
}

export default Login
