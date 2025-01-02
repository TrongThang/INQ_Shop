const SlideshowTable = ({ data }) => {
    return (
        <div className="card">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Mã SS</th>
                            <th>Tiêu đề Slideshow</th>
                            <th>Hình ảnh</th>
                            <th>Link đích</th>
                            <th>Trạng Thái SP</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" /></td>
                                <td>{item.idSlideshow}</td>
                                <td>{item.nameSlideshow}</td>
                                <td><img src={item.image} alt={item.idSlideshow} width="100" /></td>
                                <td>{item.link}</td>

                             
                                <td>
                                    <span className={`badge ${item.status === "Hiển thị" ? "bg-success" : item.status === "Ẩn" ? "bg-danger" : "bg-warning text-dark"}`}>
                                        {item.status}
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
                                                <a className="dropdown-item text-danger" href="#">
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

export default SlideshowTable;