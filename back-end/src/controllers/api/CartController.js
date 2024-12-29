const connection = require('../../config/database');
const Cart = require('../../models/Cart');

const {
    getCartInCookie, saveCartInCookie,
    addToCartInCookie, updateQuantityDeviceInCartCookie,
    removeDeviceCartInCookie,

    //Database
    getAllInCart, getCartIdCustomer,
    postAddDeviceToCart, putUpdateDeviceInCart,
    removeDeviceInCart, removeAllDeviceInCart
} = require('../../services/CartServices');

const getCartInCookieAPI = (req, res) => {
    try {
        const cartData = getCartInCookie(req);

        return res.status(200).json({
            errorCode: 0,
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

const postAddToCartCookieAPI = async (req, res) => {
    try {
        const deviceAdd = req.body;
        const newCart = addToCartInCookie(req.cookies.cart, deviceAdd);

        saveCartInCookie(res, newCart);

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

const putUpdateQuantityDeviceInCartCookieAPI = async (req, res) => {
    try {
        const { idDevice, quantity } = req.body;
        const newCart = updateQuantityDeviceInCartCookie(req.cookies.cart, idDevice, quantity);

        saveCartInCookie(res, newCart);

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

const removeDeviceInCartCookieAPI = async (req, res) => {
    try {
        const { idRemove } = req.body;
        const newCart = removeDeviceCartInCookie(req.cookies.cart, idRemove);

        saveCartInCookie(res, newCart);

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
    };
}

const removeAllDeviceInCartCookieAPI = async (req, res) => {
    try {
        res.clearCookie('cart');
        return res.status(200).json({
            errorCode: 0,
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

// DATABASE

// Hàm để lấy tất cả giỏ hàng của tất cả khách hàng
const getAllInCartAPI = async (req, res) => {
    try {
        // Gọi hàm để lấy tất cả giỏ hàng (không lọc theo idCustomer)
        const result = await getAllInCart(); // Hàm getAllInCart sẽ lấy dữ liệu giỏ hàng của tất cả khách hàng

        // Nếu không có giỏ hàng nào, trả về thông báo
        if (!result || result.length === 0) {
            return res.status(404).json({
                errorCode: 1,
                message: 'Không có giỏ hàng nào.'
            });
        }

        // Trả về dữ liệu giỏ hàng với mã trạng thái 200
        res.status(200).json({
            errorCode: 0,
            data: result,
            message: 'Successfully'
        });
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({
            message: 'Lỗi khi lấy dữ liệu giỏ hàng',
            error: error.message
        });
    }
};

// Hàm để lấy giỏ hàng của khách hàng dựa trên cả idCustomer và idDevice
const getCartAPI = async (req, res) => {
    const data = req.body // Lấy dữ liệu từ body của yêu cầu
    con
    try {
        // Kiểm tra xem dữ liệu có hợp lệ không (cả idCustomer và idDevice)
        if (!data || !data.idCustomer) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Cần có ID khách hàng để lấy giỏ hàng.'
            });
        }
        // Nếu có idDevice thì lọc theo idDevice, nếu không thì lấy tất cả giỏ hàng của khách hàng
        const result = await getCartIdCustomer(data);

        // Kiểm tra nếu không có giỏ hàng trả về
        if (!result || result.length === 0) {
            return res.status(404).json({
                errorCode: 1,
                message: 'Không tìm thấy giỏ hàng cho khách hàng và thiết bị này.'
            });
        }
        // Nếu lấy dữ liệu thành công, trả về kết quả với mã trạng thái 200
        res.status(200).json({
            errorCode: 0,
            data: result,
            message: "successfully"
        });
    } catch (error) {
        // Xử lý các lỗi trong quá trình lấy dữ liệu
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu giỏ hàng', error }); // Trả về thông báo lỗi chi tiết
    }
}

// Hàm xử lý lấy giỏ hàng của khách hàng (có thể là của một khách hàng cụ thể hoặc tất cả khách hàng)
const getCartAllCartOrOneCart = async (req, res) => {
    const data = req.body;  // Lấy dữ liệu từ body của yêu cầu (req.body)
    console.log(data);  // In dữ liệu nhận được từ yêu cầu (dùng cho debug)
    try {
        // Kiểm tra nếu dữ liệu có idCustomer và idDevice (điều này có nghĩa là yêu cầu lấy giỏ hàng của một khách hàng cụ thể và thiết bị cụ thể)
        if (data && data.idCustomer && data.idDevice) {
            // Nếu có cả idCustomer và idDevice, gọi hàm getCartAPI để lấy giỏ hàng của khách hàng và thiết bị cụ thể
            await getCartAPI(req, res);
            return;
        }

        // Nếu không có idDevice (chỉ có idCustomer), hoặc không có dữ liệu idCustomer, gọi hàm getAllInCartAPI để lấy giỏ hàng của tất cả khách hàng
        await getAllInCartAPI(req, res);
    } catch (error) {
        // Xử lý lỗi nếu có, trả về mã lỗi 500 và thông báo lỗi
        res.status(500).json({ message: '', error });
    }
}
//Hàm xử lý khi thêm vào giỏ hàng
const postAddDeviceToCartAPI = async (req, res) => {
    const data = req.body;
    try {
        // Kiểm tra xem dữ liệu có đầy đủ thông tin cần thiết không
        if (!data || !data.idCustomer || !data.idDevice) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Cần cung cấp đầy đủ idCustomer và idDevice để thêm thiết bị vào giỏ hàng.'
            });
        }

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
     
        // Nếu thiết bị chưa có trong giỏ hàng, tiếp tục thêm thiết bị vào giỏ hàng
        const result = await postAddDeviceToCart(data);

        // Trả về kết quả thêm thiết bị vào giỏ hàng thành công
        res.status(200).json({
            errorCode: 0,
            data: result,
            message: "tạo mới giỏ hàng thành công"
        });

    } catch (error) {
        // Nếu có lỗi trong quá trình thêm thiết bị vào giỏ hàng, trả về mã lỗi 500 và thông báo lỗi
        res.status(500).json({
            message: 'Lỗi khi thêm thiết bị vào giỏ hàng',
            error: error.message  // Trả về thông báo lỗi chi tiết
        });
    }
};

//Hàm xử lý khi cập nhật giỏ hàng
const putUpdateDeviceInCartAPI = async (req, res) => {
    const data = req.body;

    // Kiểm tra xem dữ liệu đầu vào có đầy đủ các thông tin cần thiết không
    if (!data || !data.idCustomer || !data.idDevice || !data.stock) {
        return res.status(400).json({
            errorCode: 1,
            message: 'Cần cung cấp đầy đủ idCustomer, idDevice và newQuantity để cập nhật giỏ hàng.'
        });
    }

    // Kiểm tra tính hợp lệ của newQuantity (ví dụ: phải là số và lớn hơn 0)
    if (isNaN(data.stock) || data.stock <= 0) {
        return res.status(400).json({
            errorCode: 2,
            message: 'Số lượng thiết bị phải là số và lớn hơn 0.'
        });
    }

    try {
        // Kiểm tra xem thiết bị có tồn tại trong giỏ hàng của khách hàng hay không
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

        // Nếu thiết bị đã có trong giỏ hàng, tiến hành cập nhật
        const result = await putUpdateDeviceInCart(data);

        // Trả về kết quả cập nhật thành công
        res.status(200).json({
            errorCode: 0,
            data: result,
            message: "Cart Update Successfully"
        });

    } catch (error) {
        // Nếu có lỗi trong quá trình cập nhật, trả về mã lỗi 500 và thông báo lỗi
        res.status(500).json({
            message: 'Lỗi khi cập nhật thiết bị trong giỏ hàng',
            error: error.message  // Trả về thông báo lỗi chi tiết
        });
    }
};
// Hàm xóa của 1 khách hàng và 1 sản phẩm thiết bị khỏi giỏ hàng
const removeDeviceInCartAPI = async (req, res) => {
    const data = req.body;  // Lấy dữ liệu từ body của yêu cầu (req.body)

    // Kiểm tra xem dữ liệu có đầy đủ thông tin cần thiết không
    if (!data || !data.idCustomer || !data.idDevice) {
        return res.status(400).json({
            errorCode: 1,
            message: 'Cần cung cấp đầy đủ idCustomer và idDevice để xóa thiết bị khỏi giỏ hàng.'
        });
    }

    try {
        // Gọi hàm removeDeviceInCart để xóa thiết bị khỏi giỏ hàng
        const result = await removeDeviceInCart(data);

        // Kiểm tra kết quả trả về từ hàm xóa
        if (!result) {
            // Nếu không tìm thấy thiết bị trong giỏ hàng
            return res.status(404).json({
                errorCode: 1,
                message: 'Không tìm thấy thiết bị trong giỏ hàng để xóa.'
            });
        }
        // Nếu xóa thành công
        res.status(200).json({
            errorCode: 0,
            data: result,
            message: 'Xóa thiết bị khỏi giỏ hàng thành công!'
        });
    } catch (error) {
        // Nếu có lỗi trong quá trình xóa
        res.status(500).json({
            message: 'Lỗi khi xóa thiết bị khỏi giỏ hàng',
            error: error.message  // Trả về thông báo lỗi chi tiết
        });
    }
};
//Hàm xóa tất cả sản phẩm của một khách hàng
const removeAllDeviceInCartAPI = async (req, res) => {
    const data = req.body;

    // Kiểm tra xem dữ liệu có đầy đủ thông tin cần thiết không
    if (!data || !data.idCustomer) {
        // Nếu không có idCustomer, trả về lỗi 400 (Bad Request)
        return res.status(400).json({
            errorCode: 1,
            message: 'Cần cung cấp idCustomer để xóa thiết bị khỏi giỏ hàng.'
        });
    }
    try {
        // Gọi hàm removeAllDeviceInCart để xóa tất cả thiết bị khỏi giỏ hàng
        const result = await removeAllDeviceInCart(data);

        // Trả về kết quả xóa thành công
        res.status(200).json({
            errorCode: 0,
            data: result,
            message: 'Xóa tất cả thiết bị khỏi giỏ hàng thành công!'
        });
    } catch (error) {
        // Nếu có lỗi trong quá trình xóa, trả về mã lỗi 500 (Internal Server Error) và thông báo lỗi chi tiết
        res.status(500).json({ message: 'Lỗi khi xóa tất cả thiết bị khỏi giỏ hàng', error });
    }
}
const removeAllCartOrOneCart = async (req, res) => {
    // Lấy dữ liệu từ body của yêu cầu
    const data = req.body;
    try {
        // Kiểm tra xem có đủ dữ liệu để xác định việc xóa thiết bị theo idCustomer và idDevice không
        if (data && data.idCustomer && data.idDevice) {
            // Nếu có đủ idCustomer và idDevice, gọi hàm removeDeviceInCartAPI để xóa thiết bị duy nhất khỏi giỏ hàng
            await removeDeviceInCartAPI(req, res);
            return;  // Sau khi gọi hàm xóa thiết bị, dừng thực thi thêm
        }
        // Nếu không có idDevice, gọi hàm removeAllDeviceInCartAPI để xóa tất cả thiết bị trong giỏ hàng
        await removeAllDeviceInCartAPI(req, res);
    } catch (error) {
        // Nếu có lỗi trong quá trình thực hiện, trả về lỗi với mã 500 (Internal Server Error)
        res.status(500).json({ 
            message: '',  // Không có thông báo lỗi cụ thể trong message (có thể thay thế nếu muốn)
            error: error  // Trả về thông tin chi tiết về lỗi
        });
    }
};

module.exports = {
    getCartInCookieAPI, postAddToCartCookieAPI,
    putUpdateQuantityDeviceInCartCookieAPI,
    removeDeviceInCartCookieAPI, removeAllDeviceInCartCookieAPI,
    // DATABASE
    getCartAllCartOrOneCart,
    postAddDeviceToCartAPI, putUpdateDeviceInCartAPI,
    removeAllDeviceInCartAPI, removeDeviceInCartAPI,
    removeAllCartOrOneCart
};
