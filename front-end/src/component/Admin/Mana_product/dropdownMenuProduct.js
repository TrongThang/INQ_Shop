import Dropdown from "react-bootstrap/Dropdown";

export default function DropdownMenuProduct() { 
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Danh sách thông số
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item>
                Công suất: 7W - 15W
                <button
                    className="btn btn-sm btn-outline-warning ms-2"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#editAttributeModal"
                >
                    Sửa
                </button>
                </Dropdown.Item>
                <Dropdown.Item>
                Cường độ ánh sáng: 600 - 1600 Lumens
                <button
                    className="btn btn-sm btn-outline-warning ms-2"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#editAttributeModal"
                >
                    Sửa
                </button>
                </Dropdown.Item>
                <Dropdown.Item>
                Điện áp hoạt động: 220V
                <button
                    className="btn btn-sm btn-outline-warning ms-2"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#editAttributeModal"
                >
                    Sửa
                </button>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                onClick={() => alert("Thêm thuộc tính!")}
                >
                <span className="fw-bold text-danger">+ Thêm thuộc tính</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};