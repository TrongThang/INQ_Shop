const ListLiked = ({ idCustomer, devices }) => {
    // Hàm xóa sản phẩm yêu thích
  const handleRemoveLiked = async (idDevice) => {
    try {
      // Gửi yêu cầu xóa đến API
      await fetch(`http://localhost:8081/api/likedDevice/${idCustomer}/${idDevice}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error('Error removing device:', err);
    }
  };
  return (
    <div className="container-fluid">
      <h2>Thiết bị yêu thích</h2>
      <table className="table align-items-center">
        <thead>
          <tr>
            <th scope="col" className="text-center align-middle"></th>
            <th scope="col" className="text-center align-middle">Thiết bị</th>
            <th scope="col" className="text-center align-middle">Giá</th>
            <th scope="col" className="text-center align-middle"></th>
            <th scope="col" className="text-center align-middle"></th>
          </tr>
        </thead>
        <tbody>
          {devices.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.device.image} alt={item.device.name} className="img-fluid" />
              </td>
              <td className="text-center align-middle">{item.device.name}</td>
              <td className="text-center align-middle">{item.device.sellingPrice}</td>
              <td className="text-center align-middle"><span onClick={() => handleRemoveLiked(item.idDevice)}><i class="fa-solid fa-heart text-danger ms-2"></i></span></td>
              <td className="text-center align-middle">
                <button className="btn btn-outline-danger">
                  Thêm vào giỏ hàng
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
  
  export default ListLiked;