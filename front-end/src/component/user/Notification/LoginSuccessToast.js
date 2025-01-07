import React, { useRef, useEffect } from "react";

const LoginSuccessToast = ({ show }) => {
    const toastRef = useRef(null);

    useEffect(() => {
        if (show && toastRef.current) {
            // Add show class to toast when `show` is true
            toastRef.current.classList.add('show');
            // Optionally, set a timeout to remove the 'show' class after a few seconds
            setTimeout(() => {
                toastRef.current.classList.remove('show');
            }, 1500); // Hide toast after 1.5 seconds
        }
    }, [show]);

    return (
        <div
            className="toast position-absolute top-3 end-0 p-2 alert alert-success"
            ref={toastRef} // Attach ref to the toast element
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ zIndex: 1050 }}
        >
            <div className="toast-header bg-success text-white">
                <strong className="me-auto">Thành công!</strong>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                ></button>
            </div>
            <div className="toast-body">
                Đăng nhập thành công!
            </div>
        </div>
    );
};

export default LoginSuccessToast;
