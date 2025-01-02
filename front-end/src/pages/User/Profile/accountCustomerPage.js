import ProfileSidebar from '../../../component/user/Profile/navCustomer/profileSidebar';
import AccountCustomer from '../../../component/user/Profile/account';
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