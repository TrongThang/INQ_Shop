import CategoryRow from "./categoryRow";

export default function CategoryTable({categories}) {
    return (
        <div class="card">
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th><input type="checkbox"/></th>
                            <th>Danh mục</th>
                            <th>Hình ảnh</th>
                            <th>Danh mục cha</th>
                            <th>Slug</th>
                            <th>Ngày tạo</th>
                            <th>Ngày sửa</th>
                            <th>Trạng Thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => ( <CategoryRow category={category} key={category.id} /> ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

