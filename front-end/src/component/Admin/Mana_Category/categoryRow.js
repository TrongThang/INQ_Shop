export default function CategoryRow({category, key}) {
    return (
        <tr key={key}>
            <td><input type="checkbox"/></td>
            <td>{category.name}</td>
            <td>
                <img src={category.image} alt={category.name} class="img-fluid" style="max-width: 100px" />
            </td>
            <td>{category.nameParent}</td>
            <td>{category.slug}</td>
            <td>{category.created_at}</td>
            <td>{category.updated}</td>
            <td><span class="badge bg-success">{category.status}</span></td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-light btn-sm" type="button"
                        id="dropdownMenuButton2" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                        <li>
                            <a class="dropdown-item" href="#">
                                <i class="bi bi-pencil"></i> Sửa
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item text-danger" href="#">
                                <i class="bi bi-trash"></i> Xóa
                            </a>
                        </li>
                    </ul>
                </div>
            </td>
        </tr>
    )
}