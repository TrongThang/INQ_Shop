import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ListLiked = ({ idCustomer, devices }) => {
  const [device, setDevice] = useState([]);
  const navigate = useNavigate();
  console.log('device:', devices);

  useEffect(() => {
    // Cập nhật state khi props devices thay đổi
    setDevice(devices);
  }, [devices]);

    // Hàm xóa sản phẩm yêu thích
  const handleRemoveLiked = async (idDevice) => {
    try {
      // Gửi yêu cầu xóa đến API
      await fetch(`http://localhost:8081/api/likedDevice/${idCustomer}/${idDevice}`, {
        method: 'DELETE',
      });
      setDevice((prevDevices) => prevDevices.filter((item) => item.idDevice != idDevice));
    } catch (err) {
      console.error('Error removing device:', err);
    }
  };
  return (
    <div className="container-fluid">
      <h2 className="card-title mb-4">Thiết bị yêu thích</h2>
      <table className="table align-items-center">
        <thead>
          <tr>
            <th scope="col" className="text-center align-middle"></th>
            <th scope="col" className="text-center align-middle text-primary fs-3">Thiết bị</th>
            <th scope="col" className="text-center align-middle text-primary fs-3">Giá</th>
            <th scope="col" className="text-center align-middle"></th>
          </tr>
        </thead>
        <tbody>
          {device.map((item, index) => (
            <tr key={index} >
              <td>
                <img src={`/img/device/${item.device.image}`} alt={item.device.name} className="img-fluid" style={{height: "100px", width: "100px"}}/>
              </td>
              <td className="text-center align-middle fs-5" onClick={() => navigate(`/device/${item.device.slug}`)} style={{cursor: "pointer"}}>{item.device.name}</td>
              <td className="text-center align-middle fs-5">{Math.floor(item.device.sellingPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ"}</td>
              <td className="text-center align-middle"><span onClick={() => handleRemoveLiked(item.idDevice)}><i class="fa-solid fa-heart text-danger ms-2" style={{cursor: "pointer", fontSize: "25px"}}></i></span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
  
  export default ListLiked;