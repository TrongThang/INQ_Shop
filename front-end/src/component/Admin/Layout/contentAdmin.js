import FooterAdmin from "./Footer/footer";
import HeaderAdmin from "./Header/headerAdmin";
import ManaBlog from "../../../pages/admin/Blog/manageBlogPage";
import ManaAttribute from "../../../pages/admin/Attribute/manaAttribute";
import ManaOrder from "../../../pages/admin/Order/manaOrders";


export default function ContentAdmin() {
    return (
        <div className="main-content">
            <HeaderAdmin />
            {/* <SiteAdmin /> */}
            {/* <ManaSlideshow /> */}
            {/* <ManaAttribute /> */}
            {/* <ManaBlog /> */}
            <ManaOrder />
            <FooterAdmin />
        </div>
    )
}