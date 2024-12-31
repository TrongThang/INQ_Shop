import ProfileSidebar from "../component/ProfileCustomer/navCustomer/profileSidebar";
import PasswordForm from "../component/ProfileCustomer/passwordForm";

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