

function HeaderBlog() {
    return (
        <div class="d-flex justify-content-between mb-3">
            <h5>Danh sách bài viết</h5>
            <div>
                <button class="btn btn-primary me-2">
                    <i class="bi bi-plus"></i> Thêm
                </button>
                <button class="btn btn-secondary">
                    <i class="bi bi-download"></i> Xuất file
                </button>
            </div>
        </div>
    )
}

export default HeaderBlog;