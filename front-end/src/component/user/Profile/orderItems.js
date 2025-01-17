import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OrderItems = ({ initialOrders }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
      setOrders(initialOrders);
  }, [initialOrders]);

  if (!orders || orders.length === 0) {
    return <div>Không có đơn hàng nào để hiển thị.</div>;
  }

  const CannelOrderClick = async (id, status) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: `Bạn có chắc muốn hủy đơn hàng này không?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    });
    if (id) {
      if (result.isConfirmed) {
        try {
          // Gửi yêu cầu hủy đơn hàng
          await axios.put("http://localhost:8081/api/order", { idOrder: id, status: status });

          // Cập nhật danh sách đơn hàng (lọc bỏ đơn hàng vừa hủy)
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === id ? { ...order, status: 0 } : order
            )
          );

          await Swal.fire({
            title: 'Thành công!',
            text: 'Hủy đơn hàng thành công!',
            icon: 'success',
          });
        } catch (error) {
          console.error("Lỗi khi hủy đơn hàng:", error);
          await Swal.fire({
            title: 'Lỗi!',
            text: 'Có lỗi xảy ra khi hủy đơn hàng!',
            icon: 'error',
          });
        }
      }
    }
  };

  return (
    <div className="bg-light p-4 rounded">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">
              Đơn hàng
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <>
              <tr className="parent-row collapsed" data-bs-toggle="collapse" data-bs-target={`#child-${index}`}>
                <td style={{ cursor: 'pointer' }}>
                  <div className="text-dark">
                    <span className={`float-end badge ${order.status === 0 ? "bg-danger" : (order.status == 4 ? "bg-success" : (order.status === 3 ? "bg-warning" : (order.status === 2 ? "bg-secondary" : "bg-info")))} text-white fs-6`}>
                      {order.status === 0 ? "Đã hủy" : (order.status === 4 ? "Hoàn thành" : (order.status === 3 ? "Chờ giao hàng" : (order.status === 2 ? "Chuẩn bị hàng" : "Chờ xác nhận")))}
                      <span className="arrow-icon ms-2">&#9660;</span>
                    </span>

                    <span>{order.nameRecipient}</span>
                    <span> - Địa chỉ: </span>
                    <span>{order.address}</span>
                  </div>
                  <div>
                    <span>SĐT: </span>
                    <span>{order.phone}</span>
                  </div>
                  <div>
                    <span>Tổng đơn hàng: </span>
                    <span className="text-danger">{Number(order.totalAmount).toLocaleString()}đ</span>
                    {(order.status === 1 || order.status === 2) &&
                      <button
                        className="float-end badge btn btn-outline-danger text-dark fs-6"
                        onClick={() => CannelOrderClick(order.id, 0)}
                        style={{ marginTop: "-10px", paddingBottom: "7px", paddingTop: "7px" }}
                      >
                        Hủy đơn hàng
                      </button>
                    }
                  </div>

                </td>
              </tr>
              <tr id={`child-${index}`} className="collapse">
                <td colspan="2">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Hình Ảnh</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.order_device.map((detail, idx) => (
                        <tr key={idx} onClick={() => navigate(`/device/${detail.device.slug}`)}>
                          <td><img src={`/img/device/${detail.device.image}`} alt="Product" style={{ height: "100px", width: "100px" }} /></td>
                          <td>{detail.stock}</td>
                          <td>{Number(detail.price).toLocaleString()}đ</td>
                          <td>{Number(detail.amount).toLocaleString()}đ</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </>

          ))}

        </tbody>
      </table>
    </div>
  );
};

export default OrderItems;
