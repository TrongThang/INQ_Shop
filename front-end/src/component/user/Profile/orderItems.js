import React from "react";

const OrderItems = ({ orders }) => {
  console.log("orders: ", orders)
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
                    <span className={`float-end badge ${order.status === 0 ? "bg-danger" : (order.status == 1 ? "bg-success" : (order.status === 2 ? "bg-warning" : (order.status === 3 ? "bg-secondary" : "bg-info")))} text-white fs-6`}>
                      {order.status === 0 ? "Đã hủy" : (order.status == 1 ? "Hoàn thành" : (order.status === 2 ? "Chờ giao hàng" : (order.status === 3 ? "Chuẩn bị hàng" : "Chờ thanh toán")))}
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
                    <span className="text-danger">{Math.floor(order.totalAmount)} VNĐ</span>
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
                      {order.order_detail.map((detail, idx) => (
                        <tr key={idx}>
                          <td><img src={`/img/device/${detail.device.image}`} alt="Product" style={{height: "100px", width: "100px"}}/></td>
                          <td>{detail.stock}</td>
                          <td>{detail.price}</td>
                          <td>{detail.amount}</td>
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
