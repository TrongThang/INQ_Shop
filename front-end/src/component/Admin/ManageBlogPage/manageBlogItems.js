import React from 'react';

import image from '../../resource/img/600x400.jpg'
const ManageBlogItems = () => {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>TT1</td>
      <td>Cách sử dụng đèn thông minh</td>
      <td>Nguyễn Văn A</td>
      <td>320</td>
      <td>
        <img src={image} alt="Thumbnail" width="50" />
      </td>
      <td>20/11/2023</td>
      <td>
        <span className="badge bg-success">Hoạt động</span>
      </td>
      <td>
        <div className="dropdown">
          <button
            className="btn btn-light btn-sm"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-three-dots-vertical"></i>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="#">
                <i className="bi bi-pencil"></i> Sửa
              </a>
            </li>
            <li>
              <a className="dropdown-item text-danger" href="#">
                <i className="bi bi-trash"></i> Xóa
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default ManageBlogItems;
