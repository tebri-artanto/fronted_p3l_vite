import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useProfileData = () => {
  const [user, setUser] = useState({ id: '', username: '' });
  const [customer, setCustomer] = useState({ id: '', nama: '', alamat: '', no_telp: '', email: '', id_user: '' });

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('authToken');

      if (!token) {
        // Redirect to the login page if no token is found
        console.error('No token found. Redirecting to login.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data.data;
        setUser(userData);

        if (userData.id_role === 1) {
          fetchCustomerData(userData);
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };

    fetchData();
  }, []);

  const fetchCustomerData = async (user) => {
    try {
      const response = await axios.get(`http://localhost:8000/customers/akun/${user.id}`);
      console.log(response);

      setCustomer(response.data.data);
    } catch (error) {
      console.error('Customer data fetch error:', error);
    }
  };

  return { user, customer };
};

export default useProfileData;
