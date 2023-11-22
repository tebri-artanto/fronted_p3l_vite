import React from "react";
import { Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,} from "@nextui-org/react";
import { useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import { checkUserLoginStatus } from './utilities/checkAuth';
import Modal1 from './utilities/modal1'; // Import your modal component
import { useNavigate } from 'react-router-dom'



export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(checkUserLoginStatus());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState([{'id':'','username':'', 'id_role':''}]);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Update the user's login status when they successfully log in
    setIsUserLoggedIn(true);
  };
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

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Send a POST request to the logout API
      Cookies.remove('authToken');
      window.location.href = '/';
      axios.post('http://localhost:8000/auth/logout').then(response => {
          if (response.status === 200) {
            // Logout was successful, remove the token and redirect
            Cookies.remove('authToken');
            localStorage.removeItem('authToken');
            window.location.href = '/login'; // Replace with your login page URL
          } else {
            // Handle the API response in case of an error
            console.error('Logout failed:', response.data);
          }
        })
        .catch(error => {
          // Handle any Axios request errors
          console.error('Axios request failed:', error);
        });
    }
    setIsUserLoggedIn(false);
  };
  const handleRiwayat = () => {

    if(fetchUserData(Cookies.get('authToken'))){
      console.log(user.id_role);
      if(user.id_role === 1){
        navigate('/riwayatTransaksiCust');
      }else if(user.id_role === 2){
        navigate('/riwayatTransaksi');
      }else if(user.id_role === 3){
        navigate('/riwayatTransaksi');
      }
    }
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  return (
    <Navbar >
      <NavbarBrand>

        <Image
          width={65}
          src="https://storage.googleapis.com/image-storage-p3l/logo-kecik.png"
          alt="NextUI Album Cover"
          classNames="m-5"
        />
        <p className="font-bold text-inherit">Grand Atma Hotel</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">

      </NavbarContent>
      <NavbarContent justify="end">
      {isUserLoggedIn ? (
        <NavbarItem className="hidden lg:flex">
        <Button onClick={handleRiwayat} color="primary"variant="flat">Riwayat Reservasi</Button>
            <Button onClick={handleLogout} color="primary"variant="flat">Logout</Button>
      </NavbarItem>
            
          
        ) : (
          
          <div>
           
            <NavbarItem className="hidden lg:flex" >
            <Button as={Link} color="primary" href="/login" variant="flat" >
            Login
          </Button>
          
            <Button as={Link} color="primary" href="/register" variant="flat" >
            Sign Up
          </Button>
        </NavbarItem>
            
          </div>
        )}

        <Modal1 isOpen={isLoginModalOpen} onClose={closeLoginModal} onLogin={handleLogin} />
        
        <NavbarItem>
          
        </NavbarItem>
        
      </NavbarContent>
    </Navbar>
  );
}
