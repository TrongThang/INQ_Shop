import React, { createContext, useState, useContext, useEffect, } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [idCustomer, setIdCustomer] = useState(null);

    const navigate = useNavigate();

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

    const fetchDeviceData = async (cart) => {
        const response = await axios.get('http://localhost:8081/api/device/admin')

        const allDevice = await response.data.data

        const updatedCart = cart.map(item => {
            const updatedProduct = allDevice.find(p => p.id === item.idDevice);
            return {
                ...item,
                sellingPrice: updatedProduct?.sellingPrice || item.sellingPrice,
                image: updatedProduct?.image || item.image,
                status: updatedProduct?.status || item.status,
                stock: updatedProduct?.stock || item.stock
            };
        });

        setCart(updatedCart);
    }

    const fetchDataCustomer = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/customer/${idCustomer}`)
            if (!response.ok) {
                throw new Error("Lỗi lấy dữ liệu từ khách hàng");
            }
            const result = await response.json()

            setCustomer(result.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if (idCustomer) {
            fetchDataCart();
            fetchDataCustomer();
        }
        else {
            const cartFromCookie = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
            if (cartFromCookie.length > 0) {
                fetchDeviceData(cartFromCookie);
            }
            setCart(cartFromCookie);
        }
    }, [idCustomer]);

    const handleInputQuantity = (device, quantity) => {
        console.log('Giá trị Quantity:', quantity)
        if (isNaN(quantity) || quantity < 1) {
            return; // Không cho phép số lượng không hợp lệ 
        }
        if (quantity > device.stock) {
            quantity = device.stock;
        }
        const updatedDevice = {
            ...device,
            quantity: quantity,
        };


        addToCart(updatedDevice, quantity, 'input');
    }

    const addToCart = async (device, quantity, type = null) => {
        let cartItem = {
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
            cartItem = {
                idDevice: device.idDevice,
                quantity: Number(quantity),
                sellingPrice: device.sellingPrice,
                image: device.image,
                name: device.name,
                status: device.status,
                stock: device.stock
            }

            try {
                const existingCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
                console.log('Thêm SP - No Logged:', existingCart);

                const updatedCart = existingCart.find(item => item.idDevice === device.idDevice)
                    ? existingCart.map(item => item.idDevice === device.idDevice
                        ? {
                            ...item,
                            quantity: type === 'input'
                                ? quantity
                                : Number(item.quantity) + Number(quantity)
                        } 
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

    const checkCheckout = () => {
        const isValid = window.confirm("Kiểm tra trước Thanh toán. Tiếp tục?");
        if (isValid) {
            navigate("/checkout"); 
        }
    }


    return (
        <CartContext.Provider value={{
            cart, customer, addToCart,
            removeFromCart, removeAllCart,
            getTotalPrice, checkCheckout, getTotalItem,
            handleInputQuantity,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);