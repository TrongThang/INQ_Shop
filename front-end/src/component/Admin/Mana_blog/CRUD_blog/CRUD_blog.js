
function CRUD_blog() {
    return (
        <div className="main-content-inner">
            {/* Back button */}
            <div className="my-3">
                <a href="#">
                    <i className="bi bi-arrow-left pe-2"></i>Trở về
                </a>
            </div>
            {/* Main form */}
            <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-4">Thông tin Chi tiết bài viết</h5>

                <form>
                    <div className="row">
                        <div className="col-md-8">
                            {/* Article title */}
                            <div className="mb-3">
                                <label className="form-label">Tiêu đề bài viết:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue="Cách sử dụng đèn thông minh"
                                />
                            </div>

                            {/* Author */}
                            <div className="mb-3">
                                <label className="form-label">Tên tác giả:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue="Nguyễn Văn A"
                                />
                            </div>

                            {/* Category */}
                            <div className="mb-3">
                                <label className="form-label">Danh mục:</label>
                                <select className="form-select">
                                    <option>Đèn</option>
                                    <option>Báo cháy</option>
                                    <option>Hệ thống vườn</option>
                                </select>
                            </div>

                            {/* Dates */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Ngày đăng bài:</label>
                                    <div className="input-group">
                                        <input
                                            type="date"
                                            className="form-control"
                                            defaultValue="2023-11-20"
                                        />
                                        <span className="input-group-text">
                                            <i className="bi bi-calendar"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="mb-3">
                                <label className="form-label">Trạng thái:</label>
                                <select className="form-select">
                                    <option defaultValue>Hiển thị</option>
                                    <option>Ẩn</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            {/* Image upload */}
                            <div className="mb-3">
                                <label className="form-label">Hình ảnh:</label>
                                <div className="upload-area">
                                    <i className="bi bi-cloud-arrow-up upload-icon"></i>
                                    <div>Upload ảnh</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rich text editor */}
                    <div className="mb-3 border p-3">
                        <label className="form-label">Nội dung chi tiết:</label>
                        <div className="editor-toolbar">
                            <button type="button" className="toolbar-btn">
                                <i className="bi bi-text-paragraph"></i>
                            </button>
                            <button type="button" className="toolbar-btn">
                                <i className="bi bi-type-bold"></i>
                            </button>
                            <button type="button" className="toolbar-btn">
                                <i className="bi bi-type-italic"></i>
                            </button>
                            <button type="button" className="toolbar-btn">
                                <i className="bi bi-type-underline"></i>
                            </button>
                            <span className="toolbar-divider"></span>
                            <button type="button" className="toolbar-btn">
                                <i className="bi bi-link-45deg"></i>
                            </button>
                            <button type="button" className="toolbar-btn">
                                <i className="bi bi-image"></i>
                            </button>
                            <span className="toolbar-divider"></span>
                            <button type="button" className="toolbar-btn">
                                <i className="bi bi-list-ul"></i>
                            </button>
                            <button type="button" className="toolbar-btn">
                                <i className="bi bi-list-ol"></i>
                            </button>
                            <button type="button" className="toolbar-btn">
                                <i className="bi bi-quote"></i>
                            </button>
                            <button type="button" className="toolbar-btn">
                                <i className="bi bi-text-left"></i>
                            </button>
                            <button type="button" className="toolbar-btn">
                                <i className="bi bi-text-center"></i>
                            </button>
                            <button type="button" className="toolbar-btn">
                                <i className="bi bi-text-right"></i>
                            </button>
                            <button type="button" className="toolbar-btn">
                                <i className="bi bi-three-dots"></i>
                            </button>
                        </div>
                        <div className="editor-content">
                            <p>
                                Đèn thông minh không chỉ giúp chiếu sáng mà còn mang đến nhiều
                                tiện ích vượt trội, nâng cao chất lượng cuộc sống và tiết kiệm
                                năng lượng. Để sử dụng đèn thông minh hiệu quả, bạn có thể tham
                                khảo các bước dưới đây:
                            </p>
                            <ol>
                                <li>Kết nối đến thông minh với ứng dụng điều khiển</li>
                                <li>
                                    Tải ứng dụng quản lý đèn thông minh tương ứng, ví dụ: INQ
                                    Smart, Philips Hue, hoặc Mi Home.
                                </li>
                                <li>
                                    Kết nối đèn với mạng WiFi trong nhà. Đảm bảo đèn và thiết bị
                                    di động của bạn chung một mạng.
                                </li>
                                <li>
                                    Thực hiện quét và thêm đèn vào ứng dụng để bắt đầu điều khiển.
                                </li>
                            </ol>
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="text-right">
                        <button type="submit" className="btn btn-info text-white">
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CRUD_blog;