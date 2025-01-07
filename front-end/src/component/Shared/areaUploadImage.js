import React from "react";

const AreaUploadImage = ({ image, onChange }) => {
    return (
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <div className="mb-3">
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Hình ảnh:
                </label>
                <div
                    style={{
                        width: "500px",
                        height: "300px",
                        border: "2px dashed #6c757d",
                        borderRadius: "8px",
                        backgroundColor: "#f8f9fa",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                >
                    {!image ? (
                        <div
                            style={{
                                textAlign: "center",
                                color: "#6c757d",
                                fontWeight: "500",
                                fontSize: "1rem",
                            }}
                        >
                            <i
                                className="bi bi-cloud-arrow-up"
                                style={{
                                    fontSize: "2.5rem",
                                    marginBottom: "10px",
                                    display: "block",
                                }}
                            ></i>
                            Nhấn để tải ảnh lên
                            <input
                                type="file"
                                onChange={onChange}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    opacity: 0,
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                    ) : (
                        <img
                            src={image}
                            alt="preview"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain", // Đảm bảo ảnh hiển thị vừa khung
                                borderRadius: "8px",
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AreaUploadImage;