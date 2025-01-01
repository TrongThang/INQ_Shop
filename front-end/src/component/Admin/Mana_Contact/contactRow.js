export default function ContactRow({contact, key}) {
    return (
        <tr key={key}>
            <td><input type="checkbox" /></td>
            <td>{contact.id}</td>
            <td>{contact.fullname }</td>
            <td>{contact.title}</td>
            <td>{contact.email}</td>
            <td className="col-4">
                {contact.content}
            </td>
            <td>{contact.created_at}</td>
            <td>{contact.updated_at}</td>
            <td><span className="badge badge-warning">{contact.status}</span></td>
            <td>
                <div className="dropdown">
                    <button className="btn btn-light btn-sm" type="button" id="dropdownMenuButton2"
                        data-bs-toggle="dropdown" aria-expanded="false">
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