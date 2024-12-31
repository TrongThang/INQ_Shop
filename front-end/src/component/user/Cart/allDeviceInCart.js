import OneDeviceInCart from "./oneDeviceInCart";

export default function AllDeviceInCart({ devices }) {
    console.log('Device', devices);
    
    return (
        <div class="card mb-4">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="selectAll" />
                        <label class="form-check-label" for="selectAll">Chọn tất cả</label>
                    </div>
                    <button class="btn btn-link text-danger p-0">Xóa</button>
                </div>
                
                {devices.map((device, index) => (
                    <OneDeviceInCart device={device} index ={index} />
                ))}
            </div>
        </div>
    )
}