import React from "react";

const OrderItems = () => {
  return (
    <div className="bg-light p-4 rounded">
      <table class="table table-bordered">
        <thead>
            <tr>
            <th scope="col">
                Name
                <span class="float-end badge badge-success bg-success text-white fs-6">  Đang giao  </span> 
            </th>
            
            </tr>
        </thead>
        <tbody>
            <tr class="parent-row collapsed" data-bs-toggle="collapse" data-bs-target="#child-1">
            <td>
                <span>Dơn hàng 1</span>
                <span class="float-end arrow-icon">&#9660;</span>
            </td>
            </tr>

            <tr id="child-1" class="collapse">
            <td colspan="2">
                <table class="table mb-0">
                <thead>
                    <tr>
                    <th scope="col">Hình Ảnh</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td><img src="https://via.placeholder.com/50" alt="Product" /></td>
                    <td>2</td>
                    <td>$10</td>
                    <td>$20</td>
                    </tr>
                    <tr>
                    <td><img src="https://via.placeholder.com/50" alt="Product" /></td>
                    <td>1</td>
                    <td>$15</td>
                    <td>$15</td>
                    </tr>
                </tbody>
                </table>
            </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderItems;
