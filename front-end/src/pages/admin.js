// CSS ADMIN
import '../resource/assets/css/typography.css'
import '../resource/assets/css/default-css.css'
import '../resource/assets/css/styles.css'
import '../resource/assets/css/responsive.css'

// import 'jquery-slimscroll/jquery.slimscroll.min.js';
// import 'owl.carousel/dist/assets/owl.carousel.css';


import Sidebar from "../component/admin/Layout/Sidebar/sidebar";
import ContentAdmin from '../component/admin/Layout/contentAdmin.js';

export default function Admin() {
    return (
        <>
            <div class="page-container">
                <Sidebar />
                
                <ContentAdmin />
            </div>
        </>
    )
}