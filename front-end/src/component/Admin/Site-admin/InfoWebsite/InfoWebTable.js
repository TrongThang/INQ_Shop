import InfoWebRow from "./InfoWebRow"

export default function InfoWebTable({ data }) {
    data = [
        {
            KEY_NAME: "HEADER_LAYOUT",
            value: "INQ SHOP",
            status: 1
        },
        {
            KEY_NAME: "NAVBAR_1",
            value: "Trang chủ",
            status: 0
        }
    ]
    
    return (
        <div className="card">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th width="40">
                                <input type="checkbox" />
                            </th>
                            <th>KEY NAME</th>
                            <th>Giá trị</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (<InfoWebRow data={item} key={item.KEY_NAME} />))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}