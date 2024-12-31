import ProfileSidebar from '../../component/User/Profile/navCustomer/profileSidebar';
import AccountCustomer from '../../component/User/Profile/account';
import '../../resource/css/Profile.css'

function AccountCustomerPage() {
    return (
        <div className='row ms-4'>
            <ProfileSidebar />
            <AccountCustomer />
        </div>
    )
}

export default AccountCustomerPage;