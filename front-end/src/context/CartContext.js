import React, { createContext, useState, useContext, } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([
        {
            idDevice: 1,
            image: "https://placehold.co/200x200",
            name: "Camera chống trộm",
            quantity: 1,
            sellingPrice: 1992000,
        },
        {
            idDevice: 2,
            image: "https://placehold.co/200x200",
            name: "Thiết bị báo cháy",
            quantity: 1,
            sellingPrice: 1500000,
        },
        {
            idDevice: 3,
            image: "https://placehold.co/200x200",
            name: "Thiết bị tưới nước tự động",
            quantity:2,
            sellingPrice: 500000,
        }
    ]);

    const handleInputQuantity = (idDevice, quantity) => {
        if (isNaN(quantity) || quantity < 1) {
            return;
        }
        
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item.idDevice === idDevice) {
                    return { ...item, quantity: quantity };
                }
                return item;
            })
        });
    }
    const addToCart = (device) => {
        setCart((prevCart) => {
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const existingDevice = prevCart.find(item => item.idDevice === device.idDevice);

            if (existingDevice) {
                // Nếu có, tăng số lượng lên 1
                return prevCart.map(item =>
                    item.id === device.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Nếu chưa có, thêm sản phẩm mới vào giỏ với quantity = 1
                return [...prevCart, { ...device, quantity: 1 }];
            }
        });
    }

    const plusDeviceInCart = (idDevice) => {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item.idDevice === idDevice) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        });
    }

    const minusDeviceInCart = (idDevice) => {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item.idDevice === idDevice) {
                    // Nếu số lượng bằng 1, không thay đổi gì
                    if (item.quantity === 1) {
                        return item;
                    }
                    // Nếu số lượng lớn hơn 1, giảm số lượng
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item; // Giữ nguyên các sản phẩm khác
            });
        });
    };

    const removeFromCart = (idDevice) => {
        setCart(cart.filter(item => item.idDevice !== idDevice));
    }

    const removeAllCart = () => {
        setCart([]); 
    };

    const getTotalPrice = () => {
        return cart.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue.quantity * currentValue.sellingPrice)
        }, 0);
    }
    
    const getTotalItem = () => {
        return cart.length;
    }

    const handleCheckout = () => {
        return console.log("Checkout");
    }

    return (
        <CartContext.Provider value={{
            cart, addToCart,
            plusDeviceInCart, minusDeviceInCart,
            removeFromCart, removeAllCart,
            getTotalPrice, handleCheckout, getTotalItem,
            handleInputQuantity,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);