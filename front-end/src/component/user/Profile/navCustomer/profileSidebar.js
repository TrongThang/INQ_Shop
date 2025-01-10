import { Link } from 'react-router-dom';

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
                <Link to="/profile/orders" className="list-group-item list-group-item-action">
                    <i className="bi bi-bag me-2"></i>Đơn mua
                </Link>
                <button href="#" className="list-group-item list-group-item-action active" data-bs-toggle="collapse" data-bs-target="#accountSubmenu" aria-expanded="false" aria-controls="accountSubmenu">
                    <i className="bi bi-person me-2"></i>Tài khoản của tôi
                    <i className="bi bi-chevron-down float-end"></i>
                </button>
                <div className="collapse" id="accountSubmenu">
                    <Link to="/profile" className="list-group-item list-group-item-action ps-5 text-primary">Hồ sơ</Link>
                    <Link to="/profile/address" className="list-group-item list-group-item-action ps-5 text-primary">Địa chỉ</Link>
                    <Link to="/profile/changepassword" className="list-group-item list-group-item-action ps-5 text-primary">Đổi mật khẩu</Link>
                </div>
            </div>
        </aside>
    );
};


export default ProfileSidebar;
