// CSS ADMIN
import '../resource/assets/css/typography.css'
import '../resource/assets/css/default-css.css'
import '../resource/assets/css/styles.css'
import '../resource/assets/css/responsive.css'

import Sidebar from "../component/admin/Layout/Sidebar/sidebar";
import ContentAdmin from '../component/admin/Layout/contentAdmin.js';
import Login_Admin from './admin/Account_Admin/login_admin.js';

export default function Admin() {
    return (
        <>
            <div className="page-container">
                <Sidebar />
                <Login_Admin />
                <ContentAdmin />
            </div>
        </>
    )
}