import ContactRow from "./contactRow";

export default function ContactTable({contacts}) {
    return (
        <div className="card">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th width="40">
                                <input type="checkbox" />
                            </th>
                            <th>ID</th>
                            <th>Họ và tên</th>
                            <th>Tiêu đề</th>
                            <th>Email</th>
                            <th>Nội dung</th>
                            <th>Ngày tạo</th>
                            <th>Ngày sửa</th>
                            <th>Trạng Thái Liên hệ</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (<ContactRow contact={contact} key={contact.id} />))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}