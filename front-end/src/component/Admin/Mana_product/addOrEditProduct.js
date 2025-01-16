import { useEffect, useState } from 'react';
import AreaUploadImage from '../../Shared/areaUploadImage';
import StarRating from '../../Shared/starRating';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ModalCategory from './modalCategory';
import ListSpecificationsAdmin from './specification/listSpecificationAdmin';
import { STATUS_CODES } from '../../../ultil/statusContaints';
import { toast } from 'react-toastify';

export default function AddOrEditProduct(type = 'update') {
    const { slug } = useParams();
    const [device, setDevice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentCategory, setCurrentCategory] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        category: '',
        sellingPrice: '0',
        stockQuantity: '0',
        description: '',
        status: 0,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!slug) return;

                const response = await axios.get(`http://localhost:8081/api/device/admin/detail/${slug}`)

                const result = response.data.data;

                setDevice(result);

                setFormData({
                    name: result.name,
                    category: result.categoryDevice.id,
                    sellingPrice: result.sellingPrice,
                    stockQuantity: result.stock,
                    description: result.description,
                    status: result.status,
                });
                
                setCurrentCategory({
                    id: result.categoryDevice.id,
                    nameCategory: result.categoryDevice.nameCategory
                });

                
            } catch (error) {
                console.log("Lỗi:", error.message)
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [slug]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        let updatedValue = value;
        if (id === "sellingPrice" || id === "stockQuantity") {
            updatedValue = value.replace(/[^0-9]/g, ""); // Loại bỏ các ký tự không phải số
        }
        
        setFormData((prevData) => ({
            ...prevData,
            [id]: updatedValue,
        }));
    };

    const onSaveCategory = (category) => {
        setCurrentCategory(category)

        setFormData((prevData) => ({
            ...prevData,
            category: category.id, // Lưu id của danh mục vào formData.category
        }));
    }
    
    if (loading) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async () => {
        
        setErrors({});

        // Validate tên sản phẩm
        if (!formData.name || formData.name.length > 500) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: '*Tên sản phẩm không được để trống và tối đa 500 ký tự.',
            }));
        }

        if (!formData.category) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                category: '*Vui lòng chọn một danh mục.',
            }));
        }
        
        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            console.log(`http://localhost:8081/api/device/check-name/${encodeURIComponent(formData.name)}`)
            const response = await axios.get(`http://localhost:8081/api/device/check-name/${encodeURIComponent(formData.name)}`);
            console.log(response.data);

            if (response.data.exists) {
                console.log("SP Tồn tại")
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    name: '*Tên sản phẩm đã tồn tại.',
                }));
                return;
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra tên sản phẩm:', error);
            toast.error('Có lỗi xảy ra khi kiểm tra tên sản phẩm.');
            return;
        }

        const deviceSend = {
            name: formData.name,
            idCategory: formData.category,
            description: formData.description,
            image: formData.image,
            sellingPrice: formData.sellingPrice,
            status: formData.status,
        }

        let response;

        if (slug) {
            deviceSend.idDevice = device.idDevice
            response = await axios.put(`http://localhost:8081/api/device/`, {
                deviceSend: deviceSend,
                stock: formData.stockQuantity
            }) 

            if (response.data.data) {
                toast.success('Cập nhật thành công')
                alert('Cập nhật thành công')
            }
            
        } else {
            response = await axios.post(`http://localhost:8081/api/device/`, {
                deviceSend: deviceSend,
                stock: formData.stockQuantity
            }) 
            if (response.data.errorCode == 0) {
                
                toast.success('Thêm sản phẩm thành công')
                alert('Thêm sản phẩm thành công')
            } else {
                alert('Thêm sản phẩm thất bại')
            }
        }
    }

    return (
    <>
        <div class="my-3">
            <Link to="/admin/device"
                class="text-decoration-none">
                <i class="bi bi-arrow-left pe-2"></i>Trở về
            </Link>
        </div>

        <div className="container-fluid mt-3">
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title d-flex justify-content-between align-items-center">
                                    <span>Thông tin sản phẩm
                                        {device &&
                                            <>
                                                <i class="fa-solid fa-heart text-danger ms-3"> {device.likeCount} </i>
                                                <i class="fa-solid fa-eye text-secondary ms-3"> {device.views} </i>
                                            </>
                                        }
                                        
                                    </span>
                                    {device && <StarRating rating={device.star} />}
                                    <button
                                        className="btn btn-primary mt-3 w-25"
                                        onClick={() => handleSubmit()}
                                    >
                                        {slug ? `Lưu` : `Thêm thiết bị`}
                                    </button>
                            </h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="mb-3">
                                            <label for="productName" className="form-label">Tên sản phẩm:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder='Nhập tên của thiết bị ...'
                                                />
                                                {errors.name && <span className="text-danger">{errors.name}</span>}
                                        </div>
                                        <div className="mb-3">
                                            <label for="category" className="form-label">Danh mục:</label>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control bg-secondary text-light"
                                                    id="category"
                                                    value={currentCategory?.nameCategory}
                                                />
                                                <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#editCategoryModal">Sửa</button>
                                                <ModalCategory currentCategory={currentCategory} onSaveCategory={onSaveCategory}/>
                                            </div>
                                            {errors.category && <div className="text-danger">{errors.category}</div>}
                                        </div>
                                    </div>    
                                    <div className='row col-12'>
                                        <div className="mb-3 col-6">
                                            <label for="sellingPrice" className="form-label">Giá bán:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="sellingPrice"
                                                    value={`${Number(formData.sellingPrice).toLocaleString()} VNĐ`}
                                                    onChange={handleInputChange}
                                                />
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label for="stockQuantity" className="form-label">Số lượng tồn kho:</label>
                                                <input type="text" className="form-control" id="stockQuantity"
                                                    value={formData.stockQuantity}
                                                    onChange={handleInputChange}
                                                />
                                        </div>
                                    </div>
                                
                                        
                                    <div className="mb-3">
                                        <label for="description" className="form-label">Mô tả:</label>
                                            <textarea
                                                className="form-control" id="description" rows="4"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                placeholder='Nhập mô tả tổng quan của thiết bị ...'
                                            />
                                    </div>
                                    <div className="mb-3 col-6">
                                    <label htmlFor="status" className="form-label">Trạng thái:</label>
                                            <select
                                                className="form-select"
                                                id="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                            >
                                                <option value={STATUS_CODES.DEVICE.ACTIVE}>Hoạt động</option>
                                                <option value={STATUS_CODES.DEVICE.DISCOUNT}>Sản phẩm khuyến mãi</option>
                                                <option value={STATUS_CODES.DEVICE.FEATURED}>Nổi bật</option>
                                                <option value={STATUS_CODES.DEVICE.NEW}>Mới</option>
                                                <option value={STATUS_CODES.DEVICE.NON_ACTIVE}>Ngừng hoạt động</option>
                                            </select>
                                    </div>
                                </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            {/* <AreaUploadImage image='' /> */}
                                        </div>
                                        {/* <div className='mb-3'>
                                            <h6>Thông số kỹ thuật</h6>
                                            <ListSpecificationsAdmin attributes={device.attributes} />
                                        </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}