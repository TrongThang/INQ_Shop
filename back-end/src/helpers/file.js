function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getBase64Size(base64String) {
    if (!base64String || typeof base64String !== 'string') {
        throw new Error('Input must be a valid Base64 string');
    }

    // Loại bỏ phần header nếu có (ví dụ: "data:image/png;base64,")
    const base64Only = base64String.replace(/^data:[^;]+;base64,/, '');

    // Độ dài chuỗi Base64
    const length = base64Only.length;

    // Đếm số ký tự padding '='
    const padding = (base64Only.match(/=+$/) || [''])[0].length;

    // Tính kích thước thực tế (bytes)
    const sizeInBytes = (length * 3) / 4 - padding;

    return sizeInBytes;
}


