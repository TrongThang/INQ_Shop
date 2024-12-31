export default function InfoOrder() {
    return (
        <div class="col-md-6 mb-5 mb-md-0">
            <div class="p-3 p-lg-5" id="form-checkout">
                <h2 class="h3 mb-3 text-black">Chi tiết Đơn hàng</h2>
                <div class="form-group row">
                    <div class="col-md-6">
                        <label for="c_fname" class="text-black">Họ và Tên đệm <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="c_fname" name="c_fname" />
                    </div>
                    <div class="col-md-6">
                        <label for="c_lname" class="text-black">Tên <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="c_lname" name="c_lname" />
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-md-6">
                        <label for="c_state_country" class="text-black">Tỉnh <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="" name="" />
                    </div>
                    <div class="col-md-6">
                        <label for="c_state_country" class="text-black">Quận/Huyện <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="" name="" />
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-md-6">
                        <label for="c_state_country" class="text-black">Phường/Xã <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="" name="" />
                    </div>
                    <div class="col-md-6">
                        <label for="c_state_country" class="text-black">Tên đường <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="" name="" />
                    </div>
                </div>

                <div class="form-group col-md-6">
                    <label for="c_state_country" class="text-black">Địa chỉ cụ thể <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="" name="" />
                </div>

                <div class="form-group row mb-5">
                <div class="col-md-6">
                    <label for="c_email_address" class="text-black">Email <span class="text-danger">*</span></label>
                    <input 
                        type="text" 
                        class="form-control"
                        id="c_email_address" name="c_email_address" 
                        placeholder="contact.inq@gmail.com"
                    />
                </div>
                <div class="col-md-6">
                    <label for="c_phone" class="text-black">Số điện thoại <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="c_phone" name="c_phone" />
                </div>
                </div>

                <div class="form-group">
                    <label for="c_order_notes" class="text-black">Ghi chú</label>
                    <textarea 
                        name="c_order_notes" 
                        id="c_order_notes" 
                        cols="30" rows="5" 
                        class="form-control text-primary" 
                        placeholder="Viết ghi chú của bạn ở đây"
                    >
                    </textarea>
                </div>

            </div>
        </div>
    )
}