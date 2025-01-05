export default function PlaceToRating() {
    return (
        <section>
            <div className="mb-3">
                <label className="form-label text- display-6">Đánh giá</label>
                <div className="rating d-flex align-items-center">
                    <span >
                        <i className="fa-regular fa-star" data-value="1"></i>
                        <i className="fa-regular fa-star" data-value="2"></i>
                        <i className="fa-regular fa-star" data-value="3"></i>
                        <i className="fa-regular fa-star" data-value="4"></i>
                        <i className="fa-regular fa-star" data-value="5"></i>
                    </span>
                    <span id="rating-value" className="ms-2">Chưa chọn</span>
                </div>
            </div>
            <div className="mb-3">
                <textarea className="form-control" rows="4" placeholder="Viết bình luận của bạn..."></textarea>
            </div>
            <button className="btn btn-primary">Gửi</button> 
        </section>
    );
}