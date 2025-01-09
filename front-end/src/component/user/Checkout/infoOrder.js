export default function InfoOrder() {
    return (
        <div className="col-md-6 mb-5 mb-md-0">
            <div className="p-3 p-lg-5" id="form-checkout">
                <h2 className="h3 mb-3 text-black">Chi tiết Đơn hàng</h2>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label for="c_fname" className="text-black">Họ và Tên đệm <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="c_fname" name="c_fname" />
                    </div>
                    <div className="col-md-6">
                        <label for="c_lname" className="text-black">Tên <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="c_lname" name="c_lname" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6">
                        <label for="c_state_country" className="text-black">Tỉnh <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="" name="" />
                    </div>
                    <div className="col-md-6">
                        <label for="c_state_country" className="text-black">Quận/Huyện <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="" name="" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6">
                        <label for="c_state_country" className="text-black">Phường/Xã <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="" name="" />
                    </div>
                    <div className="col-md-6">
                        <label for="c_state_country" className="text-black">Tên đường <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="" name="" />
                    </div>
                </div>

                <div className="form-group col-md-6">
                    <label for="c_state_country" className="text-black">Địa chỉ cụ thể <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="" name="" />
                </div>

                <div className="form-group row mb-5">
                <div className="col-md-6">
                    <label for="c_email_address" className="text-black">Email <span className="text-danger">*</span></label>
                    <input 
                        type="text" 
                        className="form-control"
                        id="c_email_address" name="c_email_address" 
                        placeholder="contact.inq@gmail.com"
                    />
                </div>
                <div className="col-md-6">
                    <label for="c_phone" className="text-black">Số điện thoại <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="c_phone" name="c_phone" />
                </div>
                </div>

                <div className="form-group">
                    <label for="c_order_notes" className="text-black">Ghi chú</label>
                    <textarea 
                        name="c_order_notes" 
                        id="c_order_notes" 
                        cols="30" rows="5" 
                        className="form-control text-primary" 
                        placeholder="Viết ghi chú của bạn ở đây"
                    >
                    </textarea>
                </div>

            </div>
        </div>
    )
}