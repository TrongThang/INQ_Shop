import ProfileSidebar from '../../../component/user/Profile/navCustomer/profileSidebar';
import AccountCustomer from '../../../component/user/Profile/account';

function AccountCustomerPage() {
    return (
        <div className='row ms-4'>
            <ProfileSidebar />
            <AccountCustomer />
        </div>
    )
}

export default AccountCustomerPage;