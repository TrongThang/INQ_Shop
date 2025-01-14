import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../../../context/CartContext';
const ProfileSidebar = () => {
    const { customer } = useCart();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <aside className="col-md-3">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="bg-secondary rounded-circle p-2 me-2">
                                <i className="bi bi-person text-white"></i>
                            </div>
                            <h5 className="card-title mb-0">{customer.surname} { customer.lastName}</h5>
                        </div>
                    </div>
                </div>
                <div className="list-group">
                    <Link
                        to="/profile/orders"
                        className={`list-group-item list-group-item-action ${isActive('/profile/orders') ? 'active' : ''}`}
                    >
                        <i className="bi bi-bag me-2"></i>Đơn mua
                    </Link>
                    <button
                        className="list-group-item list-group-item-action active bg-success" data-bs-toggle="collapse" data-bs-target="#accountSubmenu" aria-expanded="false" aria-controls="accountSubmenu">
                        <i className="bi bi-person me-2"></i>Tài khoản của tôi
                        <i className="bi bi-chevron-down float-end"></i>
                    </button>
                    <div className="collapse-expand" id="accountSubmenu">
                        <Link
                            to="/profile"
                            className={`list-group-item list-group-item-action ps-5 ${isActive('/profile') ? 'active' : ''}`}
                        >Hồ sơ</Link>
                        <Link to="/profile/likeDevice" className={`list-group-item list-group-item-action ps-5 ${isActive('/profile/likeDevice') ? 'active' : ''}`}>Thiết bị yêu thích</Link>
                        <Link
                            to="/profile/address"
                            className={`list-group-item list-group-item-action ps-5 ${isActive('/profile/address') ? 'active' : ''}`}
                        >Địa chỉ</Link>
                        <Link
                            to="/profile/changepassword"
                            className={`list-group-item list-group-item-action ps-5 ${isActive('/profile/changepassword') ? 'active' : ''}`}
                        >Đổi mật khẩu</Link>
                    </div>
                </div>
            </aside>
        </>

    );
};


export default ProfileSidebar;
