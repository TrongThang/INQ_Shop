import React, { createContext, useState, useContext, useEffect, } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [idCustomer, setIdCustomer] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = jwtDecode(token);
            setIdCustomer(decoded.idPerson);
        }
    }, []);

    const fetchDataCart = async () => {
        try {
            console.log('ID Customer: ', idCustomer)
            const response = await fetch(`http://localhost:8081/api/cart/${idCustomer}`)
            if (!response.ok) {
                throw new Error("Lỗi lấy dữ liệu từ giỏ hàng");
            }
            const result = await response.json()

            setCart(result.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if (idCustomer) {
            fetchDataCart();
        }
    }, [idCustomer]);

    const handleInputQuantity = (device, quantity) => {
        if (isNaN(quantity) || quantity < 1) {
            return;
        }

        addToCart(device, quantity, 'input')
    }

    const addToCart = async (device, quantity, type = null) => {
        const cartItem = {
            idDevice: device.idDevice,
            quantity: Number(quantity),
        };

        if (idCustomer) {
            try {
                const response = await axios.post('http://localhost:8081/api/cart/', {
                    ...cartItem,
                    idCustomer: idCustomer,
                    type: type
                });
                setCart(response.data.newCart)
            } catch (error) {
                console.log('Lỗi thêm sản phẩm vào giỏ hàng cho KH logged:', error)
            }
        } else {
            try {
                console.log('Thêm SP - No Logged');
                const existingCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];

                const updatedCart = existingCart.find(item => item.idDevice === device.idDevice)
                    ? existingCart.map(item => item.idDevice === device.idDevice
                        ? { ...item, quantity: item.quantity + Number(quantity) }
                        : item
                    )
                    : [...existingCart, cartItem];
                Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
                setCart(updatedCart);
            } catch (error) {
                console.error('Lỗi cập nhật giỏ hàng vào cookie:', error)
            }
        }
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

    const removeFromCart = async (idDevice) => {
        if (idCustomer) {
            console.log('idDevice Remove: ', idDevice)
            try {
                const response = await axios.delete(`http://localhost:8081/api/cart/${idCustomer}/${idDevice}`);

                setCart(response.data.newCart)
            } catch (error) {
                console.log('Lỗi xoá 1 sản phẩm vào giỏ hàng cho KH logged:', error)
            }
        } else {
            try {
                const existingCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];

                const updatedCart = existingCart.filter(item => item.idDevice !== idDevice);

                Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });

                setCart(updatedCart);
            } catch (error) {
                console.error('Lỗi xoá 1 sản phẩm trong giỏ hàng trong cookie:', error)
            }
        }
    }

    const removeAllCart = async () => {
        if (idCustomer) {
            try {
                const response = await axios.delete(`http://localhost:8081/api/cart/${idCustomer}`);

                setCart(response.data.newCart)
            } catch (error) {
                console.log('Lỗi xoá hết giỏ hàng cho KH logged:', error)
            }
        } else {
            try {
                Cookies.remove('cart');

                setCart([]);
            } catch (error) {
                console.error('Lỗi cập nhật giỏ hàng vào cookie:', error)
            }
        }
    };

    const getTotalPrice = () => {
        if (cart) {
            return cart.reduce((accumulator, currentValue) => {
                return accumulator + (currentValue.quantity * currentValue.sellingPrice)
            }, 0);
        }
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