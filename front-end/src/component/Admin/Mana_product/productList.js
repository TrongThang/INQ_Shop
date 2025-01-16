const ProductTable = ({ devices, onDelete }) => {
    console.log("product table",devices)
    return (
        <div className="card">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sản phẩm</th>
                            <th>Hình ảnh</th>
                            <th>Giá bán</th>
                            <th>Mô tả</th>
                            <th>Mô tả thường</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((item, index) => (
                            <tr key={index}>
                                <td>{item.idDevice}</td>
                                <td>{item.name}</td>
                                <td><img src={`/img/device/${item.image}`} alt={item.name} width="100" /></td>
                                <td>{Number(item.sellingPrice).toLocaleString()}</td>
                                <td dangerouslySetInnerHTML={{ __html: item.description }}></td>
                                <td>{item.descriptionNormal}</td>
                                <td>
                                    <span className={`badge ${item.status === 0 ? "bg-danger" : item.status === 1 ? "bg-success" : item.status === 2 ? "bg-warning" : item.status === 3 ? "bg-info" : item.status === 4 ? "bg-primary" : "bg-secondary"}`}>
                                        {item.status === 0 ? "Ngừng bán" : item.status === 1 ? "Đang bán" : item.status === 2 ? "Khuyến mãi" : item.status === 3 ? "Nổi bật" : item.status === 4 ? "Mới" : "Bán chạy"}
                                    </span>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <i className="bi bi-pencil"></i> Sửa
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item text-danger" href="#" onClick={() => onDelete(item.idDevice, 0)}>
                                                    <i className="bi bi-trash"></i> Xóa
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;