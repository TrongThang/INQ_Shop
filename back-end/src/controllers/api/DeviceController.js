const connection = require('../../config/database.js');
const Device = require('../../models/Device.js');

const {
    getAllDevice_User, getAllDevice_Admin, getAllDeviceByStatus,
    getDeviceBySlug, getTopSellingDevice,
    createDevice, updateDevice, updateStatusDevice,
    //Review For Device
    getReviewForCustomer, 
    getAllReviewForDevice, createReviewForDevice, updateReviewForDevice, updateStatusReviewForDevice,
    getTOPDeviceLiked,
    increaseViewDevice, getAllReviewForDevice_admin,getReviewById,updateReviewById
} = require('../../services/DeviceServices.js');

const {
    getChildrenCategory, getAllCategoryIds
} = require('../../services/CategoryServices.js')
const getAllDeviceByUserAPI = async (req, res) => {
    try {
        const { page = 0, status = 1, limit = 90, priceMin, priceMax, idCategory } = req.body;

        const { keyword, orderBy, sortBy } = req.query;
        
        let order = [];
        if (orderBy && sortBy) {
            order = [[orderBy, sortBy.toUpperCase()]];
        } else {
            order = [['name', 'ASC']]; 
        }

        const filters = { priceMin, priceMax, idCategory, keyword };

        const results = await getAllDevice_User(page, status, parseInt(limit), filters, order);

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'User: Có lỗi xảy ra trong quá trình lấy dữ liệu các Thiết bị',
            details: error.message,
        });
    }
}
const getAllDevice_DiscountAPI = async (req, res) => {
    try {
        const { status = 2, limit = 10 } = req.body;

        const results = await getAllDeviceByStatus(status, parseInt(limit));

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'User: Có lỗi xảy ra trong quá trình lấy dữ liệu các Thiết bị',
            details: error.message,
        });
    }
}

const getAllDevice_FeaturedAPI = async (req, res) => {
    try {
        const { status = 3, limit = 10 } = req.body;

        const results = await getAllDeviceByStatus(status, parseInt(limit));

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'User: Có lỗi xảy ra trong quá trình lấy dữ liệu các Thiết bị',
            details: error.message,
        });
    }
}

const getAllDevice_NewAPI = async (req, res) => {
    try {
        const { status = 4, limit = 10 } = req.body;

        const results = await getAllDeviceByStatus(status, parseInt(limit));

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'User: Có lỗi xảy ra trong quá trình lấy dữ liệu các Thiết bị',
            details: error.message,
        });
    }
}

const getTopSellingDeviceAPI = async (req, res) => {
    try {

        const results = await getTopSellingDevice();

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'User: Có lỗi xảy ra trong quá trình lấy dữ liệu các Thiết bị',
            details: error.message,
        });
    }
}

const getTOPDeviceLikedAPI = async (req, res) => {
    try {
        const results = await getTOPDeviceLiked();

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'User: Có lỗi xảy ra trong quá trình lấy dữ liệu các Thiết bị',
            details: error.message,
        });
    }
}

const getAllDeviceByStatusAPI = async (req, res) => {
    try {
        const results = await getDeviceByTypeStatus();

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'User: Có lỗi xảy ra trong quá trình lấy dữ liệu các Thiết bị',
            details: error.message,
        });
    }
}
const getAllDeviceByAdminAPI = async (req, res) => {
    try {
        const results = await getAllDevice_Admin();

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Admin: Có lỗi xảy ra trong quá trình lấy dữ liệu các Thiết bị',
            details: error.message,
        });
    }
}

const getDeviceBySlugAPI = async (req, res) => {
    try {
        console.log(req.params.slug);
        const results = await getDeviceBySlug(req.params.slug);

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình lấy dữ liệu Thiết bị',
            details: error.message,
        });
    }
};


const postCreateDeviceAPI = async (req, res) => {
    try {
        const results = await createDevice(req.body);

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình thêm dữ liệu cho Thiết bị',
            details: error.message,
        });
    }
}

const putUpdateDeviceAPI = async (req, res) => {
    try {
        const results = await updateDevice(req.body);

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Cập nhập dữ liệu Thiết bị thất bại',
            details: error.message,
        });
    }
}

const putIncreaseViewDeviceAPI = async (req, res) => {
    try {
        const idDevice = req.params.idDevice;

        const results = await increaseViewDevice({idDevice});

        return res.status(200).json(results)
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Cập nhập dữ liệu Thiết bị thất bại',
            details: error.message,
        });
    }
}

const updateStatusDeviceAPI = async (req, res) => {
    try {
        const id = req.body.idDevice;
        const status = req.body.status;

        const results = await updateStatusDevice({id, status});

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Cập nhập dữ liệu Thiết bị thất bại',
            details: error.message,
        });
    }
}

const getAllReviewForDeviceAPI = async (req, res) => {
    try {
        console.log(req.params)
        const results = await getAllReviewForDevice(req.params.idDevice);

        return res.status(200).json(results)
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình lấy dữ liệu Thiết bị',
            details: error.message,
        });
    }
};

const getAllReviewForDeviceAPI_Admin = async (req, res) => {
    try {
        // Gọi service để lấy tất cả bình luận
        const results = await getAllReviewForDevice_admin();
            
        // Trả về kết quả cho client
        return res.status(200).json({
            
            errorCode: 0,
            data: results
        });
    } catch (error) {
        // Xử lý lỗi nếu có
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình lấy dữ liệu bình luận',
            details: error.message,
        });
    }
};
const getReviewByIdAPI = async (req, res) => {
    try {
        const { idReview } = req.params; // Lấy idReview từ request params

        // Gọi service để lấy review
        const review = await getReviewById(idReview);

        if (!review) {
            return res.status(404).json({
                errorCode: 1,
                msg: 'Không tìm thấy review với idReview này.',
            });
        }

        // Trả về kết quả cho client
        return res.status(200).json({
            errorCode: 0,
            data: review,
        });
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình lấy dữ liệu review.',
            details: error.message,
        });
    }
};
const updateReviewByIdAPI = async (req, res) => {
    try {
        const { idReview } = req.params; // Lấy idReview từ request params
        const updateData = req.body; // Lấy dữ liệu cần cập nhật từ request body

        // Gọi service để cập nhật review
        const updatedCount = await updateReviewById(idReview, updateData);

        // Trả về kết quả cho client
        return res.status(200).json({
            errorCode: 0,
            msg: `Cập nhật thành công ${updatedCount} review.`,
        });
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình cập nhật review.',
            details: error.message,
        });
    }
};
const getReviewForCustomerAPI = async (req, res) => {
    try {
        const results = await getReviewForCustomer(req.params.idDevice, req.params.idCustomer);

        return res.status(200).json(results)
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình lấy dữ liệu Thiết bị',
            details: error.message,
        });
    }
}

const postCreateReviewForDeviceAPI = async (req, res) => {
    try {
        const results = await createReviewForDevice(req.body);

        return res.status(200).json(results)
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình thêm dữ liệu cho Thiết bị',
            details: error.message,
        });
    }
}

const putUpdateReviewForDeviceAPI = async (req, res) => {
    try {
        const { idReview } = req.body.comment;
        const results = await updateReviewForDevice(idReview, req.body);

        return res.status(200).json(true)
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Cập nhập dữ liệu Đánh giá của sản phẩm thất bại',
            details: error.message,
        });
    }
}

const updateStatusReviewForDeviceAPI = async (req, res) => {
    try {
        const id = req.body.idDevice;
        const status = req.body.status;

        const results = await updateStatusReviewForDevice({id, status});

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Cập nhập dữ liệu Thiết bị thất bại',
            details: error.message,
        });
    }
}

module.exports = {
    getAllDeviceByUserAPI,getAllDevice_FeaturedAPI, getAllDevice_NewAPI, getTopSellingDeviceAPI, getAllDeviceByAdminAPI,
    getDeviceBySlugAPI, getTOPDeviceLikedAPI, getAllDevice_DiscountAPI,
    postCreateDeviceAPI, putUpdateDeviceAPI,
    updateStatusDeviceAPI, putIncreaseViewDeviceAPI,
    //Review For Device
    getReviewForCustomerAPI,
    getAllReviewForDeviceAPI, postCreateReviewForDeviceAPI,
    putUpdateReviewForDeviceAPI, updateStatusReviewForDeviceAPI,getAllReviewForDeviceAPI_Admin,
    getReviewByIdAPI,updateReviewByIdAPI
}