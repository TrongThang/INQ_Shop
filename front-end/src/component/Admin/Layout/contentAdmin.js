import FooterAdmin from "./Footer/footer";
import HeaderAdmin from "./Header/headerAdmin";
import SiteAdmin from "../../../pages/admin/SiteAdmin/siteAdmin";
import ManaSlideshow from "../../../pages/admin/Slideshow/manaSlideshow";
import ManaContact from "../../../pages/admin/Contact/manaContact";



export default function ContentAdmin() {
    return (
        <div class="main-content">
            <HeaderAdmin />
            {/* <SiteAdmin /> */}
            {/* <ManaSlideshow /> */}
            <ManaContact/>
      
            <FooterAdmin />
        </div>
    )
}