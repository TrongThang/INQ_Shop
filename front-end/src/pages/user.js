import HeaderUser from "../component/user/LayoutCustomer/Header/header";
import FooterUser from "../component/user/LayoutCustomer/Footer/footer";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function User() {
    const [categories, setCategories] = useState([]);
    const [isLogged, setIsLogged] = useState(false);

    // Fetch danh mục sản phẩm
    const fetchDataCategories = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/category');
            const result = await response.json();
            if (response.ok) {
                setCategories(result.data || []);
            }
        } catch (error) {
            console.error("Lỗi lấy danh mục:", error);
        }
    };

    // Kiểm tra trạng thái đăng nhập
    const checkLogin = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/account/check-login', {
                method: 'GET',
                credentials: 'include' 
            });

            if (!response.ok) throw new Error("Không thể kiểm tra đăng nhập");

            const result = await response.json();
            if (result.success && result.user) {
                setIsLogged(true);
                console.log("Người dùng đang đăng nhập:", result.user);
            } else {
                setIsLogged(false);
                console.log("Người dùng chưa đăng nhập");
            }
        } catch (error) {
            console.error("Lỗi kiểm tra đăng nhập:", error);
            setIsLogged(false);
        }
    };

    // Gọi kiểm tra đăng nhập và lấy danh mục khi trang tải
    useEffect(() => {
        checkLogin();
        fetchDataCategories();
    }, []);

    return (
        <>
            <HeaderUser categories={categories} isLogged={isLogged} />
            <Outlet />
            <FooterUser categories={categories} />
        </>
    );
}
