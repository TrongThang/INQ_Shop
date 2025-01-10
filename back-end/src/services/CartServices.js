const { Op } = require('sequelize');
const Cart = require('../models/Cart');
const Device = require('../models/Device');

const getCart = async (idCustomer) => {
    let carts =  await Cart.findAll({
        where: {
            idCustomer: idCustomer,
        },
        include: {
            model: Device,
            as: 'device',
            attributes: ['sellingPrice', 'name', 'image', 'slug'],
        },
        attributes: ['idDevice', 'quantity']
    })

    const formattedCart = carts.map(cart => {
        return {
            idDevice: cart.idDevice,
            quantity: cart.quantity,
            sellingPrice: cart.device?.sellingPrice,
            name: cart.device.name,
            image: cart.device.image,
            slug: cart.device.slug,
        }
    });

    return formattedCart;
}

const postAddDeviceToCart = async (idCustomer, idDevice, quantity) => {
    const data = {idCustomer, idDevice, quantity}
    await Cart.create(data);

    const cart = await getCart(data.idCustomer)

    return cart;
}


const putUpdateDeviceInCart = async (idCustomer, idDevice, quantity, type) => {
    const cartItem  = await Cart.findOne({
        where: {
            idDevice: idDevice,
            idCustomer: idCustomer,
        },
    })
    
    if (!cartItem) {
        throw new Error('Thiết bị không tồn tại trong giỏ hàng!');
    }

    const updatedQuantity = type === 'input' ? quantity : ( Number(cartItem.quantity) + Number(quantity) ) ;

    await cartItem.update(
        { quantity: updatedQuantity },
        {
            where: {
                idCustomer: idCustomer,
                idDevice: idDevice,
            },
        }
    );
    const newCart = await getCart(idCustomer)

    return await newCart;
}

const removeDeviceInCart = async (data) => {
    const { idCustomer, idDevice } = data; 

    const cartItem = await Cart.findOne({
        where: { 
            idCustomer: idCustomer,
            idDevice: idDevice      
        },
    });

    if (cartItem) {
        await cartItem.destroy();
        return getCart(idCustomer)
    } else {
        // Nếu không tìm thấy mục giỏ hàng thỏa mãn
        return { message: 'Thiết bị không có trong giỏ hàng!' };
    }
};

const removeAllDeviceInCart = async (idCustomer) => {
    
    const result = await Cart.destroy({
        where: { 
            idCustomer: idCustomer,
        }
    });

    if (result > 0) {
        return [];
    } else {
        return { message: 'Giỏ hàng trống!' };
    }
}

module.exports = {
    // DATABASE
    getCart,postAddDeviceToCart, putUpdateDeviceInCart,
    removeDeviceInCart, removeAllDeviceInCart,

}
