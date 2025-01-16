import FooterAdmin from "./Footer/footer";
import HeaderAdmin from "./Header/headerAdmin";
import ManaBlog from "../../../pages/admin/Blog/manageBlogPage";
import { Outlet } from "react-router-dom";


export default function ContentAdmin() {
    return (
        <div className="main-content">
            <HeaderAdmin />
            <Outlet />

            <FooterAdmin />
        </div>
    )
}