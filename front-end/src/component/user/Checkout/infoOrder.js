import { useState } from "react";
import AddressCheckout from "./addressCheckout";

export default function InfoOrder({
    phone, shippingMethod, notes,
    setPhone, setShippingMethod, setNotes,
    choiceAddress, setChoiceAddress,
    deviceCheckout
}) {
    
    const [error, setError] = useState(
        {
            phoneError: ''
        }
    );

    // const regexPhoneNumber =  (phone) => {

    //     const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    
    //     return phone.match(regexPhoneNumber) ? true : false;
    
    // }

    // const handleInputPhone = (value) => {
    //     if (isNaN(Number(value))) {
    //         setError({ ...error, phoneError: '*Số điện thoại phải là số' });
    //         return;
    //     } else if (value.length > 10) {
    //         setError({ ...error, phoneError: '*Số điện thoại không được vượt quá 10 số' });
    //         return;
    //     }
    //     else{
    //         setError({ ...error, phoneError: '' });
    //     }

    //     setPhone(value);
    // }

    return (
        <div className="col-md-5 mb-5">
            <div className="p-2" id="form-checkout">
                <h5 className="h3 mb-1 text-black">Chi tiết Đơn hàng</h5>
                <AddressCheckout choiceAddress={choiceAddress} setChoiceAddress={setChoiceAddress} />

                {/* <div className="form-group row">
                    <div className="col-md-12">
                        <label for="c_phone" className="text-black">Số điện thoại <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => handleInputPhone(e.target.value)}
                        />
                        {error.phoneError && <div className="text-danger" style={{fontSize: "10px"}}>{error.phoneError}</div>}
                    </div>
                </div> */}
                <div className="form-group">
                    <label for="c_phone" className="text-black"> Hình thức giao hàng <span className="text-danger">*</span></label>
                    <select
                        className="form-control"
                        value={shippingMethod}
                        onChange={(e) => setShippingMethod(e.target.value)}
                    >
                        <option value="COD"> - Giao hàng tận nơi -</option>
                        <option value="PAYMENT"> - Thanh toán Online - </option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="c_order_notes" className="text-black">Ghi chú</label>
                    <textarea 
                        name="c_order_notes" 
                        id="c_order_notes" 
                        cols="30" rows="5" 
                        className="form-control text-primary" 
                        placeholder="Viết ghi chú của bạn ở đây"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    >
                    </textarea>
                </div>
            </div>
        </div>
    )
}