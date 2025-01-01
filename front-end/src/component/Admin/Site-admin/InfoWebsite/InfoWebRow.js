export default function InfoWebRow({data, key}) {
    return (
        <tr>
            <td><input type="checkbox" /></td>
            <td>{data.KEY_NAME}</td>
            <td>{data.value}</td>
            <td>
                {data.status > 0 
                    ? <span className="badge text-light bg-success">Hoạt động</span> 
                    : <span className="badge text-light bg-danger">Ngừng hoạt động</span>
                }
            </td>
            <td>
                <div className="dropdown">
                    <button className="btn btn-light btn-sm" type="button" id="dropdownMenuButton2"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
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
    )
}