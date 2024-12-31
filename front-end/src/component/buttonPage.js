

export default function ButtonPage({setPage}) {
    return (
        <>
            <button className='btn btn-outline-primary' onClick={() => {setPage('search')}}>Trang Tìm kiếm</button>
            <button className='btn btn-outline-primary' onClick={() => {setPage('cart')}}>Trang Giỏ hàng</button>
            <button className='btn btn-outline-primary' onClick={() => {setPage('checkout')}}>Trang Trang Thanh Toán</button>
            <button className='btn btn-outline-primary' onClick={() => {setPage('detail')}}>Trang Chi tiết SP</button>
            <button className='btn btn-outline-primary' onClick={() => {setPage('loginAdmin')}}>Đăng nhập Admin</button>

            <button className='btn btn-outline-primary' onClick={() => {setPage('login')}}>Đăng nhập</button>
            <button className='btn btn-outline-primary' onClick={() => {setPage('register')}}>Đăng ký</button>
            <button className='btn btn-outline-primary' onClick={() => {setPage('liked')}}>Sản phẩm yêu thích</button>
        </>
    )
}