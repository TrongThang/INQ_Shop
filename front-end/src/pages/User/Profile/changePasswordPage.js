import ProfileSidebar from "../../../component/user/Profile/navCustomer/profileSidebar";
import PasswordForm from "../../../component/user/Profile/passwordForm";

function ChangePasswordPage() {
    return (
        <div className="container-fluid">
            <div className="row ms-4">
                <ProfileSidebar />
                <PasswordForm />
            </div>
        </div>
    )
}
export default ChangePasswordPage;