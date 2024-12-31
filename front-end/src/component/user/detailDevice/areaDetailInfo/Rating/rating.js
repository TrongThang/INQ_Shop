export default function Rating() {
    return (
        <div className="card-body">
            <div className="d-flex flex-start mt-2">
                <img className="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp" alt="avatar" width="40"
                height="40" />
                <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="text-primary fw-bold mb-0">
                        Trọng Thắng
                        <span className="text-body ms-2">Hmm, Sản phẩm khá đẹp 😎</span>
                        </h6>
                        <p className="mb-0">2 days ago</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-row">
                        <i className="fas fa-star text-warning me-2"></i>
                        <i className="fas fa-star text-warning me-2"></i>
                        <i className="fas fa-star text-warning me-2"></i>
                        <i className="fas fa-star text-warning me-2"></i>
                        <i className="fas fa-star text-warning me-2"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}