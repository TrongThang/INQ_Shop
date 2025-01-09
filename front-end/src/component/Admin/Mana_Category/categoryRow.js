export default function CategoryRow({category, key}) {
    return (
        <tr key={key}>
            <td><input type="checkbox"/></td>
            <td>{category.name}</td>
            <td>
                <img src={category.image} alt={category.name} className="img-fluid" style="max-width: 100px" />
            </td>
            <td>{category.nameParent}</td>
            <td>{category.slug}</td>
            <td>{category.created_at}</td>
            <td>{category.updated}</td>
            <td><span className="badge bg-success">{category.status}</span></td>
            <td>
                <div className="dropdown">
                    <button className="btn btn-light btn-sm" type="button"
                        id="dropdownMenuButton2" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i className="bi bi-three-dots-vertical"></i>
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