const connection = require('../../config/database');
const Cart = require('../../models/Cart');

const {
    getCartInCookie, saveCartInCookie, 
    addToCartInCookie, updateQuantityDeviceInCartCookie,
    removeDeviceCartInCookie,

    //Database
    getCart,
    postAddDeviceToCart, putUpdateDeviceInCart,
    removeDeviceInCart, removeAllDeviceInCart
} = require('../../services/CartServices');

const issetDataCart = (data) => {
    return data.idCustomer
        & data.idDevice
        & data.stock;
} 


const getCartAPI = async (req, res) => {
    try {
        const cartData = null;
        if (req.session.isLogged) {

            cartData = await getCart(req.body.idCustomer);

            return res.status(200).json({
                errorCode: 0,
                type: 'database',
                data: (cartData !== null ? cartData : "Vui lòng thêm sản phẩm vào giỏ hàng!"),
            });
        }
        
        //COOKIE
        cartData = getCartInCookie(req);

        return res.status(200).json({
            errorCode: 0,
            type: 'cookie',
            data: (cartData !== undefined ? cartData : "Vui lòng thêm sản phẩm vào giỏ hàng!"),
        })
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
        const data = req.body;
        const newCart = null;
        if (req.session.isLogged) {

            // Kiểm tra xem thiết bị đã có trong giỏ hàng của khách hàng chưa
            const existingDevice = await Cart.findOne({
                where: {
                    idCustomer: data.idCustomer,
                    idDevice: data.idDevice
                }
            });

            if (existingDevice) {
                // Nếu thiết bị đã có trong giỏ hàng, trả về thông báo lỗi hoặc yêu cầu cập nhật số lượng
                return res.status(400).json({
                    errorCode: 2,
                    message: 'Thiết bị này đã có trong giỏ hàng.'
                });
            }

            newCart = postAddDeviceToCart(req.body)

            return res.status(200).json({
                errorCode: 0,
                data: newCart,
                type: 'database',
                message: "Thêm sản phẩm vào giỏ hàng thành công"
            })
        }
        
        // COOKIE
        newCart = addToCartInCookie(req.cookies.cart, data);
        saveCartInCookie(res, newCart);

        return res.status(200).json({
            errorCode: 0,
            type: 'database',
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

const putUpdateQuantityDeviceInCartAPI = async (req, res) => {
    try {
        const data = req.body;
        const newCart = null;
        if (req.session.isLogged) {
            // Kiểm tra xem dữ liệu đầu vào có đầy đủ các thông tin cần thiết không
            if (issetDataCart(data)) {
                return res.status(400).json({
                    errorCode: 1,
                    message: 'Cần cung cấp đầy đủ Mã khách hàng, Mã Sản phẩm và số lượng mới để cập nhật giỏ hàng.'
                });
            }
            // Kiểm tra tính hợp lệ của newQuantity (ví dụ: phải là số và lớn hơn 0)
            if (isNaN(data.stock) || data.stock <= 0) {
                return res.status(400).json({
                    errorCode: 2,
                    message: 'Số lượng thiết bị phải là số và lớn hơn 0.'
                });
            }

            const cartItem = await Cart.findOne({
                where: {
                    idCustomer: data.idCustomer,
                    idDevice: data.idDevice
                }
            });

            // Nếu không tìm thấy thiết bị trong giỏ hàng, trả về lỗi
            if (!cartItem) {
                return res.status(404).json({
                    errorCode: 3,
                    message: 'Không tìm thấy thiết bị trong giỏ hàng của khách hàng.'
                });
            }

            newCart = putUpdateDeviceInCart(data)

            res.status(200).json({
                errorCode: 0,
                data: newCart,
                type: 'database',
                message: "Cập nhật sản phẩm trong giỏ hàng thành công"
            });
        }

        newCart = updateQuantityDeviceInCartCookie(req.cookies.cart, idDevice, quantity);

        saveCartInCookie(res, newCart);

        return res.status(200).json({
            errorCode: 0,
            type: 'cookies',
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

const removeDeviceInCartCookieAPI = async (req, res) => {
    try {
        const data = req.body;

        if (req.session.isLogged) {
            if (!data.idCustomer || !data.idDevice) {
                return res.status(400).json({
                    errorCode: 1,
                    message: 'Cần cung cấp đầy đủ Mã Nhân viên và Mã thiết bị để xóa thiết bị khỏi giỏ hàng.'
                });
            }

            result = await removeDeviceInCart(data);

            if (result) {
                return res.status(200).json({
                    errorCode: 0,
                    data: result,
                    type: 'database',
                    message: 'Xóa thiết bị khỏi giỏ hàng thành công!'
                });
            }

            // Nếu không tìm thấy thiết bị trong giỏ hàng
            return res.status(404).json({
                errorCode: 1,
                message: 'Không tìm thấy thiết bị trong giỏ hàng để xóa.'
            }); 
        }

        //COOKIE
        newCart = removeDeviceCartInCookie(req.cookies.cart, data.idDevice);
        saveCartInCookie(res, newCart);

        return res.status(200).json({
            errorCode: 0,
            type: 'cookie',
            data: newCart
        })
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
        if (req.session.isLogged) {
            if (!data.idCustomer) {
                return res.status(400).json({
                    errorCode: 1,
                    message: 'Mã khách hàng muốn xóa toàn bộ giỏ hàng'
                });
            }

            // Gọi hàm removeAllDeviceInCart để xóa tất cả thiết bị khỏi giỏ hàng
            const result = await removeAllDeviceInCart(data);

            // Trả về kết quả xóa thành công
            return res.status(200).json({
                errorCode: 0,
                data: result,
                type: 'database',
                message: 'Xóa tất cả thiết bị khỏi giỏ hàng thành công!'
            });
        }
        
        // If Customer is not Logged in
        res.clearCookie('cart');
        return res.status(200).json({
            errorCode: 0,
            type: 'cookie',
            msg: 'Giỏ hàng đã được xóa thành công',
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
    removeDeviceInCartCookieAPI, removeAllDeviceInCartAPI,
};
