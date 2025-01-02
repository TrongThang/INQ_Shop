import HeaderUser from "../component/user/LayoutCustomer/Header/header";
import FooterUser from "../component/user/LayoutCustomer/Footer/footer";
import { useEffect, useState } from "react";

export default function User() {
    const [categories, setCategories] = useState([]);

    const fetchDataCategories = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/category');
            const result = await response.json();
            console.log(result.data)

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
            <HeaderUser categories={categories} />

            <FooterUser categories={categories} />
        </>
    )
}