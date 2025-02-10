const connection = require('../../config/database');
const Cart = require('../../models/Cart');

const {
    // DATABASE
    getCart,postAddDeviceToCart, putUpdateDeviceInCart,
    removeDeviceInCart, removeAllDeviceInCart,
} = require('../../services/CartServices');


const getCartAPI = async (req, res) => {
    try {
        let cartData = null;

        cartData = await getCart(req.params.idCustomer);

        return res.status(200).json({
            errorCode: 0,
            type: 'database',
            data: (cartData !== null ? cartData : "Vui lòng thêm sản phẩm vào giỏ hàng!"),
        });
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình fetch dữ liệu của Giỏ hàng',
            details: error.message,
        });
    }
}

const postAddToCartAPI = async (req, res) => {
    try {
        const {idCustomer, idDevice, quantity, type} = req.body;
    

        // Kiểm tra xem thiết bị đã có trong giỏ hàng của khách hàng chưa
        const existingDevice = await Cart.findOne({
            where: {
                idCustomer: idCustomer,
                idDevice: idDevice,
            }
        });
        let newCart = null; 

        if (existingDevice) {
            // Nếu thiết bị đã có trong giỏ hàng, trả về thông báo lỗi hoặc yêu cầu cập nhật số lượng
            newCart = await putUpdateDeviceInCart(idCustomer, idDevice, quantity, type)
            return res.status(200).json({
                errorCode: 0,
                newCart: newCart
            });
        }
        newCart = await postAddDeviceToCart(idCustomer, idDevice, quantity, type);
        return res.status(200).json({
            errorCode: 0,
            newCart: newCart
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình thêm Thiết bị mới vào Giỏ hàng',
            details: error.message,
        });
    }
}

const putUpdateQuantityDeviceInCartAPI = async (req, res) => {
    const {idCustomer, idDevice, quantity, type} = req.body;
    try{
    // Kiểm tra xem thiết bị đã có trong giỏ hàng của khách hàng chưa
        const existingDevice = await Cart.findOne({
            where: {
                idCustomer: idCustomer,
                idDevice: idDevice,
            }
        });
        let newCart = null; 

        if (existingDevice) {
            // Nếu thiết bị đã có trong giỏ hàng, trả về thông báo lỗi hoặc yêu cầu cập nhật số lượng
            newCart = putUpdateDeviceInCart(idCustomer, idDevice, quantity, type)
            return res.status(200).json({
                errorCode: 0,
                data: newCart
            });
        }
        
        newCart = await postAddDeviceToCart(data);

        return res.status(200).json({
            errorCode: 0,
            data: newCart
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình thêm Thiết bị mới vào Giỏ hàng',
            details: error.message,
        });
    }
}

const removeDeviceInCartAPI = async (req, res) => {
    try {
        const data = req.params || {};

            result = await removeDeviceInCart(data);

            if (result) {
                return res.status(200).json({
                    errorCode: 0,
                    newCart: result,
                    message: 'Xóa thiết bị khỏi giỏ hàng thành công!'
                });
            }

            return res.status(404).json({
                errorCode: 1,
                message: 'Không tìm thấy thiết bị trong giỏ hàng để xóa.'
            }); 

    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình thêm Thiết bị mới vào Giỏ hàng',
            details: error.message,
        });
    };
}

const removeAllDeviceInCartAPI = async (req, res) => {
    try {
        const idCustomer = req.params.idCustomer;

        const result = await removeAllDeviceInCart(idCustomer);

        return res.status(200).json({
            errorCode: 0,
            newCart: result,
            message: 'Xóa tất cả thiết bị khỏi giỏ hàng thành công!'
        });
        
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình xóa Giỏ hàng',
            details: error.message,
        });
    }
}

module.exports = {
    getCartAPI,
    postAddToCartAPI, putUpdateQuantityDeviceInCartAPI,
    removeDeviceInCartAPI, removeAllDeviceInCartAPI,
};
