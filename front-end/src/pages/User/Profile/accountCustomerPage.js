import ProfileSidebar from '../../../component/user/Profile/navCustomer/profileSidebar';
import AccountCustomer from '../../../component/user/Profile/account';
import { useEffect } from 'react';

function AccountCustomerPage() {
    useEffect(() => {
        document.title = 'Hồ sơ | INQ'
    }, []);
    
    return (
        <div className='row ms-4'>
            <ProfileSidebar />
            <AccountCustomer />
        </div>
    )
}

export default AccountCustomerPage;