import React, { useRef, useEffect } from "react";

const ContactToast = ({ message, show }) => {
    const toastRef = useRef(null);

    useEffect(() => {
        if (show && toastRef.current) {
            // Thêm class 'show' để hiển thị Toast
            toastRef.current.classList.add('show');
            // Tự động ẩn Toast sau 3 giây
            setTimeout(() => {
                toastRef.current.classList.remove('show');
            }, 3000); // Ẩn Toast sau 3 giây
        }
    }, [show]);

    return (
        <div
            className="toast position-fixed top-3 end-0 p-3 alert alert-success"
            ref={toastRef} // Gắn ref cho Toast element
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ zIndex: 1050 }}
        >
            <div className="toast-header bg-success text-white">
                <strong className="me-auto">Thông báo</strong>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                ></button>
            </div>
            <div className="toast-body">
                {message}
            </div>
        </div>
    );
};

export default ContactToast;
