export default function AreaUploadImage({ image }) {
    return (
        <div class="col-md-4 col-xl-4">
                <div class="mb-3">
                    <label class="form-label">Hình ảnh:</label>
                <div class="upload-area" style={{ width: "500px", height: "300px" }}>
                    {
                    !image
                        ? (<>
                            <i class="bi bi-cloud-arrow-up upload-icon"></i>
                            <div>Upload ảnh</div>
                        </>)
                        : (<img src={image} alt="avatar" />)
                    }
                    
                    </div>
                </div>
        </div>
    )
}