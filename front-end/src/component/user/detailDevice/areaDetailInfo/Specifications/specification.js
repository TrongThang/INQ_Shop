export default function Specifications() {
    return (
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Điện năng
                </button>
            </h2>
            <div
                id="collapseOne"
                class=""
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
            >
                <div class="accordion-body rounded">
                    <ul class="row">
                        <li class="col-6">
                            Điện năng tiêu thụ: <span>10W/H</span>
                        </li>
                        <li class="col-6">
                            Công suất: <span>220V</span>
                        </li>
                        <li class="col-6">
                            Điện năng tiêu thụ: <span>10W/H</span>
                        </li>
                        <li class="col-6">
                            Công suất: <span>220V</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}