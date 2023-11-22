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

const EditPassword = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [use, setU] = useState('');
  const [user, setUser] = useState([{'id':'','username':'',}]);
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const navigate = useNavigate()
  const { id } = useParams()

//   useEffect(() => {
//     userRef.current.focus();
//   }, [])

  useEffect(() => {
    setErrMsg('');
  }, [use, pwd])

  // const handleSubmit = async values => {
  //   try {
  //     const response = await axios.post('http://localhost:8000/auth/login', values)
  //     console.log(values)
  //     if (!window.alert('EditPassword Succesfull')){
  //       navigate('/');
  //     }else{
  //       navigate('/login');
  //     }


  //   } catch (error) {
  //     console.error('EditPassword failed:', error)
  //   }
  // }
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
      console.log(response);
      
      setUser(response.data.data);
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };
  const updatePass = async (values) => {
    try {
        
      const response = await axios.put(`http://localhost:8000/auth/${user.id}`, values);
      console.log(response);

      window.alert('EditPassword Succesfull')

        navigate('/profile');

    } catch (err) {

      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        window.alert('Missing Username or Password')
        setErrMsg();
      } else if (err.response?.status === 401) {

        setErrMsg('Unauthorized');
      } else {
        setErrMsg('EditPassword Failed');
      }
      errRef.current.focus();
    }
  }

  const formik = useFormik({
    initialValues: {
      oldpassword: '',
      newpassword: '',
    },
    onSubmit: updatePass,

    validationSchema: yup.object().shape({
    oldpassword: yup.string().required('Please enter your old password'),
    newpassword: yup.string().required('Please enter your new password')
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
          <Heading size='lg'>Edit Password</Heading>

          <FormControl isInvalid={formik.errors.oldpassword}>
            <FormLabel>Old Password</FormLabel>
            <InputGroup size='md'>
              <Input
                onChange={handleForm}
                type={show ? 'text' : 'password'}
                name='oldpassword'
                onBlur={formik.handleBlur}
                value={formik.values.oldpassword}
                id="oldpassword"
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.oldpassword}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.errors.newpassword}>
            <FormLabel>New Password</FormLabel>
            <InputGroup size='md'>
              <Input
                onChange={handleForm}
                type={show ? 'text' : 'password'}
                name='newpassword'
                onBlur={formik.handleBlur}
                value={formik.values.newpassword}
                id="newpassword"
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.newpassword}</FormErrorMessage>
          </FormControl>
          <Button type='submit' colorScheme='teal'>
            EditPassword
          </Button>
        </Stack>
      </form>
    </div>
  )
}

export default EditPassword
