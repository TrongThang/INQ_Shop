export default function NavTab() {
return (
    <ul className="nav nav-tabs mb-4" id="productTabs" role="tablist">
        <li className="nav-item" role="presentation">
            <button 
                className="nav-link active" id="overview-tab"
                data-bs-toggle="tab" data-bs-target="#overview"
                type="button" role="tab" aria-controls="overview" aria-selected="true"
            >
                Tổng quan sản phẩm
            </button>
        </li>
        <li className="nav-item" role="presentation">
            <button
                className="nav-link" id="specifications-tab"
                data-bs-toggle="tab" data-bs-target="#specifications"
                type="button" role="tab" aria-controls="specifications" aria-selected="false"
            >
                Thông số kỹ thuật
            </button>
        </li>
        <li className="nav-item" role="comments">
            <button
                className="nav-link" id="comments-tab"
                data-bs-toggle="tab" data-bs-target="#comments"
                type="button" role="tab" aria-controls="comments" aria-selected="false"
            >
                Bình luận
            </button>
        </li>
    </ul>
);
}
