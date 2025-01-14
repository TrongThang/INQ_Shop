import React, { useState } from "react";
import OneDeviceInCart from "./oneDeviceInCart";
import { useCart } from "../../../context/CartContext";
import Pagination from "../../../component/user/Introdution/pagination"; 

export default function AllDeviceInCart() {
  const { cart, removeAllCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(5); // Số lượng sản phẩm trên mỗi trang

  // Tính toán chỉ mục của sản phẩm đầu tiên và cuối cùng trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cart.slice(indexOfFirstItem, indexOfLastItem);

  // Tính tổng số trang
  const totalPages = Math.ceil(cart.length / itemsPerPage);

  // Nếu giỏ hàng trống
  if (cart.length === 0) {
    return (
      <div className="bg-light p-4 rounded fs-3">
        <p>Không có Sản phẩm trong giỏ hàng</p>
      </div>
    );
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
          <div className="form-check">
            {/* <input className="form-check-input" type="checkbox" id="selectAll" /> */}
          </div>
          <button className="btn btn-sm btn-outline-danger" onClick={removeAllCart}>
            <i className="fa-solid fa-trash"></i>
            <span> Xóa hết</span>
          </button>
        </div>

        {/* Hiển thị sản phẩm trên trang hiện tại */}
        {currentItems.map((device, index) => (
          <OneDeviceInCart device={device} key={index} />
        ))}

        {/* Phân trang */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}