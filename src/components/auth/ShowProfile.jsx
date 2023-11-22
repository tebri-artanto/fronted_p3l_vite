import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import SidebarTest from "../SidebarTest";
import Navbar from "../Navbar";
import { Dialog, Transition } from '@headlessui/react'
import { Box, Flex, Image, Text, Button, Spacer } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';


const ShowProfile = () => {
  const [user, setUser] = useState([{ 'id': '', 'username': '', }]);
  const [customer, setCustomer] = useState([{ 'id': '', 'nama': '', 'alamat': '', 'no_telp': '', 'email': '', 'id_user': '' }]);
  const navigate = useNavigate();


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

  const fetchCustomerData = async (user) => {
    try {
      const response = await axios.get(`http://localhost:8000/customers/akun/${user.id}`);
      console.log(response);

      setCustomer(response.data.data);
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  }

  if (user.id_role === 1) {
    fetchCustomerData(user);
  }

  let role = '';
  if (user.id_role === 1) {
    role = 'Customer';
  } else if (user.id_role === 2) {
    role = 'Sales Marketing';
  } else if (user.id_role === 3) {
    role = 'Admin';
  } else if (user.id_role === 4) {
    role = 'FO';
  }

  return (
    <div className='App flex justify-between'>
      <SidebarTest />
      <div className="w-screen ">
        <Navbar />
        <div className="max-w-lg mx-auto my-10">
          {/* <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              className="w-full h-auto"
              src="https://source.unsplash.com/1600x900/?nature,water"
              alt="Profile"
            />
            <h3 className="font-bold text-xl mb-2 text-center">Profile Page</h3>
            <div className="px-6 py-4">
              <div className=" mb-2 justify-center">Username: {user.username}</div>

              <p className="text-gray-700 text-base">
                Role: {role}
                {customer.nama}
              </p>
              <p className="text-gray-700 text-base">

              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                JavaScript
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                React
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                Tailwind CSS
              </span>
            </div>
          </div> */}
          <Box  p={4} rounded="lg" boxShadow="md" bg="white">
            <Flex align="center" mb={4}>
              <Image
                src="https://source.unsplash.com/1600x900/?nature,water"
                alt="Profile Picture"
                borderRadius="full"
                boxSize={150}
              />
              <Spacer />
              <Button colorScheme="teal" size="sm">
                Edit Profile
              </Button>
            </Flex>
            <Text fontSize="2xl" fontWeight="bold">
              {customer.nama}
            </Text>
            <Text fontSize="md" color="gray.500">
              {user.username}
            </Text>
            <Text mt={4}>
              No Identitas: {customer.no_identitas}
            </Text>
            <Text mt={4}>
              Phone Number: {customer.no_telp}
            </Text>
            <Text mt={4}>
              Email: {customer.email}
            </Text>
            <Text mt={4}>
              Alamat: {customer.alamat}
            </Text>
            
          </Box>
        </div>


      </div>

    </div>
  );
};

export default ShowProfile;