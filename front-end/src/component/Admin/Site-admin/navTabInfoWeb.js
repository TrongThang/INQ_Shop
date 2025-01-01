export default function NavTabInfoWeb() {
    return (
        <ul className="nav nav-pills mb-3 ml-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
                <button
                    className="nav-link active"
                    id="pills-dashboard-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-dashboard"
                    type="button"
                    role="tab"
                    aria-controls="pills-dashboard"
                    aria-selected="true"
                >
                    Dashboard
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button
                    className="nav-link"
                    id="pills-info-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-info"
                    type="button"
                    role="tab"
                    aria-controls="pills-info"
                    aria-selected="false"
                >
                    Thông Tin Website
                </button>
            </li>
        </ul>
    )
}