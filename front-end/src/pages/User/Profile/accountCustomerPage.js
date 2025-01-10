import ProfileSidebar from '../../../component/user/Profile/navCustomer/profileSidebar';
import AccountCustomer from '../../../component/user/Profile/account';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

function AccountCustomerPage() {
    useEffect(() => {
        document.title = 'Hồ sơ | INQ'
    }, []);

    return (
        <div className='row ms-4'>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ProfileSidebar />
            <AccountCustomer />
        </div>
    )
}

export default AccountCustomerPage;