import HeaderUser from "../component/user/LayoutCustomer/Header/header";
import FooterUser from "../component/user/LayoutCustomer/Footer/footer";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export default function User() {
    const [categories, setCategories] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();
    const fetchDataCategories = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/category');
            const result = await response.json();

            setCategories(result.data);
        } catch (err) {
            console.error(err);
        } finally {
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            // Nếu không có token, chuyển hướng về trang đăng nhập
        } else {
            setIsLogged(true);
        }
    }, [navigate]);

    useEffect(() => {
        fetchDataCategories()
    }, []);

    return (
        <>
            <HeaderUser categories={categories} isLogged={isLogged} />
            <Outlet />

            <FooterUser categories={categories} />
        </>
    )
}