import React, { createContext, useState, useContext, useEffect, } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const fetchDataCart = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/cart')
            if (!response.ok) {
                throw new Error("Lỗi lấy dữ liệu từ giỏ hàng");
            }
            const result = await response.json()

            setCart(result.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchDataCart()
    }, []);

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

    const addToCart = (device, quantity) => {
        const cartItem = {
            idDevice: device.idDevice,
            name: device.name,
            quantity: Number(quantity),
        };

        setCart((prevCart) => {
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const existingDevice = prevCart.find(item => item.idDevice === device.idDevice);

            if (existingDevice) {
                // Nếu có, tăng số lượng theo số lượng của sản phẩm đó.
                return prevCart.map(item =>
                    item.idDevice === device.idDevice
                        ? { ...item, quantity: Number(item.quantity) + Number(quantity) }
                        : item
                );
            } else {
                // Nếu chưa có, thêm sản phẩm mới vào giỏ với quantity = item.quantity
                return [...prevCart, { ...device, quantity: quantity }];
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