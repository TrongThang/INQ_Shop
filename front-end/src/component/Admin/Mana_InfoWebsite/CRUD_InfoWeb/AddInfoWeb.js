import { useState, useEffect } from "react";

function AddInfoWeb({ onBack,InfoWebs }) {
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [InfoWeb, setInfoWeb]  = useState({
        VALUE:"",
        STATUS: 1,
        
    });

  
    // Cập nhật dữ liệu form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfoWeb((prevData) => ({
            ...prevData,
            [name]: value,
        }));
       
    };

     // Kiểm tra sự tồn tại của KEY_NAME trong danh sách hiện có
     const checkKeyNameExists = (keyName) => {
        return InfoWebs.some((item) => item.KEY_NAME === keyName);
    };


    // Gửi dữ liệu bài viết
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kiểm tra xem KEY_NAME có bị trùng không
            if (checkKeyNameExists(InfoWeb.KEY_NAME)) {
                setToastMessage('KEY_NAME đã tồn tại. Vui lòng chọn KEY_NAME khác.');
                setShowToast(true);
                return; // Dừng hàm nếu KEY_NAME bị trùng
            }
            const response = await fetch("http://localhost:8081/api/setting-web", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(InfoWeb),
            });
            const result = await response.json();
            if (response.ok) {
                setToastMessage('Đã thêm thông tin thành công.');
        setShowToast(true);

                console.log("Form submitted successfully:", result);
                setTimeout(() => {
                    window.location.reload(); // Làm mới trang
                }, 1000);
            } else {
                console.error("Form submission error:", result);
                setToastMessage('Đã thêm thông tin thất bại.');
        setShowToast(true);
            }
        } catch (error) {
            console.error("Error submitting blog:", error);
            setToastMessage('Đã thêm thông tin thất bại.');
        setShowToast(true);
        }
    };
    useEffect(() => {
        if (showToast) {
          const timer = setTimeout(() => {
            setShowToast(false);
          }, 2000); 
    
          return () => clearTimeout(timer); 
        }
      }, [showToast]);
    return (
        <div className="main-content-inner">
            {/* Back button */}
            <div className="my-3"  onClick={onBack}>
                <a href="#">
                    <i className="bi bi-arrow-left pe-2"></i>Trở về
                </a>
            </div>
            {/* Main form */}
            <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-4">Thêm thông tin Website</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-8">
                             {/* KEY */}
                             <div className="mb-3">
                                <label className="form-label">KEY_NAME</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="KEY_NAME"
                                    value={InfoWeb.KEY_NAME}
                                    onChange={handleChange}
                                    required
                                 
                                />
                            </div>
                            {/* Title */}
                            <div className="mb-3">
                                <label className="form-label">Giá trị</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="VALUE"
                                    value={InfoWeb.VALUE}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                           
                            {/* Status */}
                            <div className="mb-3">
                                <label className="form-label">Trạng thái:</label>
                                <select
                                    className="form-select"
                                    name="STATUS"
                                    value={InfoWeb.STATUS}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="1">Hoạt động</option>
                                    <option value="0">Ngừng hoạt động</option>
                                </select>
                            </div>
                        </div>
                       
                    </div>
                    
                    {/* Submit button */}
                    <div className="text-right">
                        <button type="submit" className="btn btn-info text-white">
                            Lưu
                        </button>
                    </div>
                                       {/* Toast Notification */}
      {showToast && (
        <div className="toast-container position-fixed top-0 end-70 p-3">
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header bg-primary text-white">
              <strong className="me-auto">Thông báo</strong>
             
            </div>
            <div className="toast-body">
              {toastMessage}
            </div>
          </div>
        </div>
      )}
                </form>
            </div>
        </div>
    );
}

export default AddInfoWeb;
