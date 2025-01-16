import FooterAdmin from "./Footer/footer";
import HeaderAdmin from "./Header/headerAdmin";
import ManaBlog from "../../../pages/admin/Blog/manageBlogPage";
import InfoWeb from "../../../pages/admin/Dashboard/manaInfoWebsite";
import ManaContact from "../../../pages/admin/Contact/manaContact" ;
import ManaProduct from "../../../pages/admin/Product/manaProduct";
import { ToastContainer } from "react-toastify";
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