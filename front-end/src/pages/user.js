import HeaderUser from "../component/user/LayoutCustomer/Header/header";
import FooterUser from "../component/user/LayoutCustomer/Footer/footer";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function User() {
    const [categories, setCategories] = useState([]);
    const [isLogged, setIsLogged] = useState(false);

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