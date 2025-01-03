import ListLiked from '../../component/user/Liked/ListLiked';
import { useEffect, useState } from 'react';

export default function Liked() {
  const [devices, setDevices] = useState([]);
  const idCustomer = "CUS000001";
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
  }, []);
  return (
      <ListLiked idCustomer={idCustomer} devices={devices}/>
  );
}