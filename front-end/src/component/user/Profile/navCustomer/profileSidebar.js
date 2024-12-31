const ProfileSidebar = () => {
    return (
        <aside className="col-md-3">
            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <div className="bg-secondary rounded-circle p-2 me-2">
                            <i className="bi bi-person text-white"></i>
                        </div>
                        <h5 className="card-title mb-0">Phan Trọng Thắng</h5>
                    </div>
                </div>
            </div>
            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action">
                    <i className="bi bi-bag me-2"></i>Đơn mua
                </a>
                <a href="#" className="list-group-item list-group-item-action active" data-bs-toggle="collapse" data-bs-target="#accountSubmenu" aria-expanded="false" aria-controls="accountSubmenu">
                    <i className="bi bi-person me-2"></i>Tài khoản của tôi
                    <i className="bi bi-chevron-down float-end"></i>
                </a>
                <div className="collapse" id="accountSubmenu">
                    <a href="#" className="list-group-item list-group-item-action ps-5 text-primary">Hồ sơ</a>
                    <a href="#" className="list-group-item list-group-item-action ps-5">Địa chỉ</a>
                    <a href="#" className="list-group-item list-group-item-action ps-5">Đổi mật khẩu</a>
                </div>
            </div>
        </aside>
    );
};


export default ProfileSidebar;
