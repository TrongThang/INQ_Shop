import React, { useEffect } from 'react';
import BlogDetails from '../../../component/user/Introdution/blogDetails'
import ListBlogPage from './listBlogPage';

function BlogDetailsPage({ introPage = null }) {

    return (
        <>
            <BlogDetails />

            {introPage = true && <ListBlogPage />}
        </>
    )
}

export default BlogDetailsPage;