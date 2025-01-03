import HeaderUser from "../component/user/LayoutCustomer/Header/header";
import FooterUser from "../component/user/LayoutCustomer/Footer/footer";
import ListBlogPage from "./user/Introdution/listBlogPage";
import Contact from "./user/contact";
import { useEffect, useState } from "react";

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
            <ListBlogPage />
            <Contact />
            <FooterUser categories={categories} />
        </>
    )
}