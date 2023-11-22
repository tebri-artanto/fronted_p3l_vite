import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const usePegawaiData = () => {
  const [user, setUser] = useState({ id: '', username: '' });
  const [pegawai, setPegawai] = useState({ id: '', nama_pegawai: '', id_akun: '' });

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
        fetchPegawaiData(userData);
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };

    fetchData();
  }, []);

  const fetchPegawaiData = async (user) => {
    try {
      const response = await axios.get(`http://localhost:8000/pegawais/akun/${user.id}`);
      console.log(response);

      setPegawai(response.data.data);
    } catch (error) {
      console.error('Pegawai data fetch error:', error);
    }
  };

  return { user, pegawai };
};

export default usePegawaiData;
