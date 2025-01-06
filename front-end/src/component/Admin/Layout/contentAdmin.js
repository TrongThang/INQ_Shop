import FooterAdmin from "./Footer/footer";
import HeaderAdmin from "./Header/headerAdmin";
import SiteAdmin from "../../../pages/admin/SiteAdmin/siteAdmin";
import ManaSlideshow from "../../../pages/admin/Slideshow/manaSlideshow";
import ManaContact from "../../../pages/admin/Contact/manaContact";
import ManaAttibuteGroup from "../../../pages/admin/GroupAttribute/manaGroupAttr";



export default function ContentAdmin() {
    return (
        <div class="main-content">
            <HeaderAdmin />
            {/* <SiteAdmin /> */}
            {/* <ManaSlideshow /> */}
            {/* <ManaContact/> */}
            <ManaAttibuteGroup/>
      
            <FooterAdmin />
        </div>
    )
}