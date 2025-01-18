import ListLiked from '../../component/user/Liked/ListLiked';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProfileSidebar from "../../component/user/Profile/navCustomer/profileSidebar";

export default function Liked() {
  const [devices, setDevices] = useState([]);

  const [idCustomer, setIdCustomer] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = jwtDecode(token);
      setIdCustomer(decoded.idPerson);
    }
  }, []);

  const fetchDataDevices = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/likedDevice/${idCustomer}`);
      const result = await response.json();
      setDevices(result.data);
      console.log("result data: ", result.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (idCustomer) {
      fetchDataDevices();
    }
  }, [idCustomer]);
  return (
      <div className="container-fluid my-4">
        <div className="row ms-4 ">
          <ProfileSidebar />
          <div className="col-md-9 col-xl-9">
            <ListLiked idCustomer={idCustomer} devices={devices}/>
          </div>
        </div>
      </div>
  );
}