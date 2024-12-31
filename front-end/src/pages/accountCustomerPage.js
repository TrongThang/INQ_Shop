
import React from 'react';
import ProfileSidebar from '../component/ProfileCustomer/navCustomer/profileSidebar';
import AccountCustomer from '../component/ProfileCustomer/account';
import '../resource/css/Profile.css'

function AccountCustomerPage() {
    return (
        <div className='row ms-4'>
            <ProfileSidebar />
            <AccountCustomer />
        </div>
    )
}

export default AccountCustomerPage;