export default function PayCart({ devices }) {
    
    return (
        <div class="card mb-4 fixed-bottom">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="ms-10">
                        <h5 class="card-title mb-0">Tổng cộng <span class="text-danger"> ({devices.length})</span></h5>
                    </div>
                    <h2 class="text-danger mb-0">
                        {/* accumulator => Giá trị được lưu qua mỗi vòng lặp */}
                        {
                            devices.reduce((accumulator, currentValue) => {
                                return accumulator + (currentValue.quantity * currentValue.sellingPrice)
                            }, 0).toLocaleString()
                        } VNĐ
                    </h2>
                </div>
                <button class="btn btn-primary float-end fs-4 w-100">Thanh toán</button>
            </div>
        </div>
    );
}