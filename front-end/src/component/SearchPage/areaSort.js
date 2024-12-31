export default function AreaSort() {
    return (
        <section>
            <span>Sắp xếp theo</span>
            <button className="btn btn-primary ms-3">Liên quan</button>                    
            <button className="btn btn-light">Bán chạy</button>                    
            <div className="nav-item dropdown btn">
                <a href="#" className="nav-link dropdown-hover">
                    <span className="dropdown-toggle">Giá</span>
                </a>
                <div className="dropdown-menu">
                    <a href="#" className="dropdown-item">Giá: Thấp đến cao</a>
                    <a href="#" className="dropdown-item">Giá: Cao đến thấp</a>
                </div>
            </div>              
        </section>
    )
}