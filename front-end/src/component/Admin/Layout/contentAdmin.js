import FooterAdmin from "./Footer/footer";
import HeaderAdmin from "./Header/headerAdmin";
import { Outlet } from "react-router-dom";

export default function ContentAdmin() {
    return (
        <div className="main-content">
            <HeaderAdmin />
                <Outlet/>
            <FooterAdmin />
        </div>
    )
}