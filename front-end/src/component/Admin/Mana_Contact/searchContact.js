export default function SearchContact() {
  return (
    <div class="row mb-3">
        <div class="col-md-6">
            <div class="input-group">
                <span class="input-group-text">
                    <i class="bi bi-search"></i>
                </span>
                <input type="text" class="form-control" placeholder="Tìm kiếm bài viết" />
            </div>
        </div>
        <div class="col-md-2">
            <select class="form-select status" >
                <option>Trạng thái</option>
                <option value="pending">Đang xử lý</option>
                <option value="resolved">Đã giải quyết</option>
                <option value="closed">Đã đóng</option>
            </select>
      </div>
      
        <div class="col-md-3">
            <button class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#filterModal">
                <i class="bi bi-funnel"></i> Lọc bài viết
            </button>
        </div>

        <div class="modal fade" id="filterModal" tabindex="-1" aria-labelledby="filterModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="filterModalLabel">Bộ Lọc Liên hệ</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="filterForm">
                            <div class="mb-3">
                                <label for="filterAuthor" class="form-label">Người gửi</label>
                                <input type="text" class="form-control" id="filterAuthor" placeholder="Tên người gửi" />
                            </div>
                            <div class="mb-3">
                                <label for="filterStatus" class="form-label">Trạng thái</label>
                                <select class="form-select" id="filterStatus">
                                    <option value="">Tất cả</option>
                                    <option value="active">Hiển thị</option>
                                    <option value="hidden">Ẩn</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="filterDate" class="form-label">Ngày đăng</label>
                                <input type="date" class="form-control" id="filterDate" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-primary" onclick="applyFilters()">Áp dụng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}