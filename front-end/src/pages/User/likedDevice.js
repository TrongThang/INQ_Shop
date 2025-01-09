import ListLiked from '../../component/user/Liked/ListLiked';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function Liked() {
  const [devices, setDevices] = useState([]);

  const [idCustomer, setIdCustomer] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = jwtDecode(token); // Decode the JWT token
      setIdCustomer(decoded.idPerson); // Set idCustomer from decoded token
    }
  }, []);

  const fetchDataDevices = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/likedDevice/${idCustomer}`);
      const result = await response.json();
      setDevices(result.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchDataDevices();
  }, [idCustomer]);
  return (
    <ListLiked idCustomer={idCustomer} devices={devices} />
  );
}