export default isLoggedIn = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.status(401).json({
            success: false,
            error: 'Bạn cần đăng nhập để truy cập vào tài nguyên này.'
        })
    }
}