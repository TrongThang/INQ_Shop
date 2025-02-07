import React, { createContext, useState, useContext, useEffect, } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

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
            console.log(`http://localhost:8081/api/cart/${idCustomer}`)
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
        
            console.log('Sp', updatedProduct);
            return {
                ...item,
                nameDevice: updatedProduct?.name || item.nameDevice,
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
        const fetchData = async () => {
            if (idCustomer) {
                await fetchDataCart();
                await fetchDataCustomer();
            } else {
                const cartFromCookie = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
                if (cartFromCookie.length > 0) {
                    await fetchDeviceData(cartFromCookie);
                }
                setCart(cartFromCookie);
            }
        };

        fetchData();
    }, [idCustomer]);

    const handleInputQuantity = (device, quantity) => {
        console.log('Giá trị Quantity:', quantity)
        if (isNaN(quantity) || quantity < 0) {
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
        if (device.stock < quantity) {
            const result = await Swal.fire({
                title: 'Thông báo!',
                text: 'Sản phẩm hiện đã hết hàng, bạn vẫn muốn thêm vào giỏ hàng chứ!',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
            });

            if (!result.isConfirmed) {
                return
            }
        }

        let cartItem = {
            idDevice: device.idDevice,
            quantity: Number(quantity),
        };
        console.log("cartItem:", cartItem.quantity)

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

                const updatedCart = existingCart.find(item => item.idDevice === device.idDevice)
                    ? existingCart.map(item => item.idDevice === device.idDevice
                        ? {
                            ...item,
                            quantity: type === 'input'
                                ? quantity == 0 ? 1 : quantity
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
                if (currentValue.status <= 0) {
                    return accumulator;
                }

                return accumulator + (currentValue.quantity * currentValue.sellingPrice)
            }, 0);
        }
    }
    
    const getTotalItem = () => {
        return cart.length - cart.filter(item => item.status <= 0).length;
    }

    const handleVnpayPayment = async (amount, bankCode) => {
        try {
            const response = await axios.post('http://localhost:8081/api/order/create_payment_url', {
                amount: amount,
                bankCode: bankCode,
            });
    
            if (response.data && response.data.paymentUrl) {
                console.log(`Đã tạo được link thanh toán VnPay: ${response.data.paymentUrl}`)
                // Redirect đến URL thanh toán VNPay
                window.location.href = response.data.paymentUrl;
            } else {
                throw new Error('Không thể tạo URL thanh toán VNPay');
            }
        } catch (error) {
            console.error('Lỗi khi tạo URL thanh toán VNPay:', error);
            await Swal.fire({
                title: 'Lỗi!',
                text: 'Không thể tạo URL thanh toán VNPay. Vui lòng thử lại.',
                icon: 'error',
            });
        }
    };

    const checkoutCart = async (shippingMethod, notes, choiceAddress, deviceCheckout, vnpayMethod) => {
        try {

            const responseCheckDevice = await axios.post('http://localhost:8081/api/device/check-list', 
                { products: deviceCheckout }
            );

            if (responseCheckDevice.data.errorCode == 3) {
                const result = await Swal.fire({
                    title: 'Lỗi!',
                    text: 'Sản phẩm bạn muốn mua hiện đã có thay đổi về giá.',
                    icon: 'error',
                    confirmButtonText: 'Quay lại giỏ hàng',
                });
                navigate('/cart');
                window.location.reload()
                return;
            } else if (responseCheckDevice.data.errorCode == 4) {
                const result =  await Swal.fire({
                    title: 'Thông báo',
                    html: `Có sản phẩm mà bạn muốn mua hiện không đủ số lượng bán!`,
                    icon: 'error',
                    confirmButtonText: 'Quay lại giỏ hàng',
                });
                navigate('/cart');
                window.location.reload()
                return
            }

            const address = `${choiceAddress.street}, ${choiceAddress.ward}, ${choiceAddress.district}, ${choiceAddress.city}`
            const nameRecipient = `${choiceAddress?.customer?.surname} ${choiceAddress?.customer?.lastName}`

            const infoOrder = {
                idCustomer: idCustomer,
                nameRecipient: nameRecipient,
                phone: choiceAddress?.customer?.phone,
                paymentMethod: shippingMethod,
                note: notes,
                address: address,
            }

            // const getDeviceCart = cart.map((item) => item.status > 0);
            const response = await axios.post('http://localhost:8081/api/order/checkout', {
                infoOrder: infoOrder,
                products: deviceCheckout
            }); 


            if (response.data.errorCode === 0) {
                if (shippingMethod !== 'VNPAY') {
                    let mess = shippingMethod === 'COD' ? '' : 'Vui lòng thanh toán <br> <b>STK: 0387976595, TP Bank - Phan Trọng Thắng</b>. <br> Để nhân viên xác nhận!';

                    const imageUrl = shippingMethod === 'COD' ? {} : '/img/payTpBank.png';
                    
                    const result = await Swal.fire({
                        title: 'Thành công!',
                        html: `Đặt hàng thành công!\n${mess}`,
                        icon: 'success',
                        imageUrl: imageUrl,
                        imageWidth: 300, // Chiều rộng hình ảnh (tùy chọn)
                        imageHeight: 'auto',
                    });

                    deviceCheckout.forEach(item => {
                        removeFromCart(item.idDevice)
                    });

                    if (result.isConfirmed) {
                        navigate("/cart")
                    }
                }
                else {
                    const amount = getTotalPrice();
                    const bankCode = vnpayMethod;
                    
                    await deviceCheckout.forEach(item => {
                        removeFromCart(item.idDevice)
                    });

                    handleVnpayPayment(amount, bankCode)

                    
                }
                
            }
        } catch (error) {
            console.log('Lỗi:', error.message);
            await Swal.fire({
                title: 'Thông báo!',
                text: 'Đặt hàng thất bại. Vui lòng thử lại\n Lỗi:!' + error.message ,
                icon: 'error',
            });
        }
    }    

    return (
        <CartContext.Provider value={{
            cart, customer, addToCart,
            removeFromCart, removeAllCart,
            getTotalPrice, getTotalItem,
            handleInputQuantity, checkoutCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);