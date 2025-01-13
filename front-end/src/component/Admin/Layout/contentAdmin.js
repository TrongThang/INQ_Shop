import FooterAdmin from "./Footer/footer";
import HeaderAdmin from "./Header/headerAdmin";
import ManaBlog from "../../../pages/admin/Blog/manageBlogPage";
import InfoWeb from "../../../pages/admin/Dashboard/manaInfoWebsite";
import ManaContact from "../../../pages/admin/Contact/manaContact" ;

export default function ContentAdmin() {
    return (
        <div className="main-content">
            <HeaderAdmin />
            {/* <SiteAdmin /> */}
            {/* <ManaSlideshow /> */}
            {/* <ManaAttribute /> */}
            {/* <ManaBlog /> */}
            {/* <InfoWeb /> */}
            <ManaContact />
            <FooterAdmin />
        </div>
    )
}