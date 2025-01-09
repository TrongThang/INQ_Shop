import React from 'react';
import CompanyInfo from '../../../component/user/Introdution/companyInfo';
import ListBlogPage from './listBlogPage';

function BlogDetailsPage({}) {
    return (
        <>
        <CompanyInfo />
            <BlogDetails />

            {/* {introPage = true && <ListBlogPage />} */}
        </>
    )
}

export default BlogDetailsPage;