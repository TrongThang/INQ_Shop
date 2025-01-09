import FooterAdmin from "./Footer/footer";
import HeaderAdmin from "./Header/headerAdmin";
import ManaBlog from "../../../pages/admin/Blog/manageBlogPage";


export default function ContentAdmin() {
    return (
        <div className="main-content">
            <HeaderAdmin />
            {/* <SiteAdmin /> */}
            {/* <ManaSlideshow /> */}
            {/* <ManaAttribute /> */}
            <ManaBlog />
            <FooterAdmin />
        </div>
    )
}