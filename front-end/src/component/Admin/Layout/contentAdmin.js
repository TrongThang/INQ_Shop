import FooterAdmin from "./Footer/footer";
import HeaderAdmin from "./Header/headerAdmin";
import ManaBlog from "../../../pages/admin/Blog/manageBlogPage";
import InfoWeb from "../../../pages/admin/Dashboard/manaInfoWebsite";
import ManaContact from "../../../pages/admin/Contact/manaContact" ;
import ManageReviewDevice from "../../../pages/admin/ReviewDevice/manaReviewDevice";

export default function ContentAdmin() {
    return (
        <div className="main-content">
            <HeaderAdmin />
            {/* <SiteAdmin /> */}
            {/* <ManaSlideshow /> */}
            {/* <ManaAttribute /> */}
            {/* <ManaBlog /> */}
            {/* <InfoWeb /> */}
            {/* <ManaContact /> */}
            <ManageReviewDevice />
            <FooterAdmin />
        </div>
    )
}