import FooterAdmin from "./Footer/footer";
import HeaderAdmin from "./Header/headerAdmin";
import ManaBlog from "../../../pages/admin/Blog/manageBlogPage";


export default function ContentAdmin() {
    return (
        <div class="main-content">
            <HeaderAdmin />
            {/* <SiteAdmin /> */}
            {/* <ManaSlideshow /> */}
            {/* <ManaAttribute /> */}
            <ManaBlog />
            <FooterAdmin />
        </div>
    )
}