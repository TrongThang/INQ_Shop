const {
    getAllBlog,
    getBlog,
    postCreateBlog,
    putUpdateBlog,
    updateStatusBlog,
} = require('../../services/BlogServices.js')


// Hàm xử lý lấy tất cả các blog của người dùng
const getAllBlogUserAPI = async (req, res) => {
    try {
        // Gọi hàm lấy tất cả các blog của người dùng từ file services
        const result = await getAllBlog_user();

        // Kiểm tra nếu không có kết quả hoặc kết quả trống
        if (!result || result.length === 0) {
            // Trả về mã lỗi 404 và thông báo nếu không tìm thấy blog của người dùng
            return res.status(404).json({ message: "No user blogs found" });
        }

        // Trả về dữ liệu blog của người dùng trong trường hợp thành công
        res.status(200).json({
            errorCode: 0,
            data: result,
            message: "successfully"
        });
    } catch (error) {
        // Xử lý lỗi nếu có sự cố khi lấy blog của người dùng
        console.error("Error fetching user blogs:", error);
        // Trả về mã lỗi 500 và thông báo lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu
        res.status(500).json({ message: "An error occurred while fetching user blogs" });
    }
};
// Hàm xử lý lấy tất cả các blog
const getAllBlogAPI = async (req, res) => {
    try {
        // Gọi hàm lấy tất cả các blog từ file services
        const result = await getAllBlog();
        console.log(result);
        // Kiểm tra nếu không có kết quả hoặc kết quả trống
        if (!result || result.length === 0) {
            // Trả về mã lỗi 404 và thông báo nếu không tìm thấy blog
            return res.status(404).json({ message: "No blogs found" });
        }

        // Trả về dữ liệu blog trong trường hợp thành công
        res.status(200).json({
            errorCode: 0,
            data: result,
            message: "successfully"
        });
    } catch (error) {
        // Xử lý lỗi nếu có sự cố khi lấy blog
        console.error("Error fetching blogs:", error);
        // Trả về mã lỗi 500 và thông báo lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu
        res.status(500).json({ message: "An error occurred while fetching blogs" });
    }
};

// // Hàm xử lý lấy một blog theo yêu cầu
// const getBlogAPI = async (req, res) => {
//     // Lấy dữ liệu từ body của yêu cầu
//     const data = req.body;

//     try {
//         // Gọi hàm lấy thông tin blog cụ thể từ cơ sở dữ liệu
//         const result = await getBlog(data);
//         if(data.id)
//         // Kiểm tra nếu không có kết quả hoặc kết quả trống
//         if (!result || result.length === 0) {
//             // Trả về mã lỗi 404 và thông báo nếu không tìm thấy blog với ID hoặc dữ liệu cung cấp
//             return res.status(404).json({ message: "Blog not found" });
//         }

//         // Trả về dữ liệu blog trong trường hợp thành công
//         res.status(200).json({
//             errorCode: 0,
//             data: result,
//             message: "successfully"
//         });
//     } catch (error) {
//         // Xử lý lỗi nếu có sự cố khi lấy blog
//         console.error("Error fetching blog:", error);
//         // Trả về mã lỗi 500 và thông báo lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu
//         res.status(500).json({ message: "An error occurred while fetching the blog" });
//     }
// };
const getBlogAPI = async (req, res) => {
    // Lấy dữ liệu từ body của yêu cầu
    const { id } = req.params;
    try {
        // Gọi hàm lấy thông tin blog cụ thể từ cơ sở dữ liệu
        const result = await getBlog(id);

        res.status(200).json({
            errorCode: 0,
            data: blog,
            message: "successfully"
        });
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ message: "An error occurred while fetching the blog" });
    }
};
const getAllOrOneBlogAPI_user = async (req, res) => {
    const data = req.body;
    console.log("Request Body:", data); // In ra body để kiểm tra

    // Kiểm tra nếu 'data' có chứa thông tin blog (ví dụ: có trường 'id')
    if (data && data.id) {
        // Nếu có 'id', gọi hàm getBlogAPI
        console.log("Fetching specific blog with ID:", data.id);
        await getBlogAPI(req, res);
        return;
    }

    // Nếu không có 'id', gọi hàm getAllBlogAPI_user để lấy tất cả các blog
    console.log("Fetching all blogs");
    await getAllBlogUserAPI(req, res);
};
const getAllOrOneBlogAPI = async (req, res) => {
    const data = req.body;
    console.log("Request Body:", data); // In ra body để kiểm tra

    // Kiểm tra nếu 'data' có chứa thông tin blog (ví dụ: có trường 'id')
    if (data && data.id) {
        // Nếu có 'id', gọi hàm getBlogAPI
        console.log("Fetching specific blog with ID:", data.id);
        await getBlogAPI(req, res);
        return;
    }

    // Nếu không có 'id', gọi hàm getAllBlogAPI để lấy tất cả các blog
    console.log("Fetching all blogs");
    await getAllBlogAPI(req, res);
};
//Hàm xử lý thêm tin tức
const postCreateBlogAPI = async (req, res) => {
    try {
        const data = req.body;

        // Kiểm tra nếu thiếu tiêu đề hoặc nội dung
        if (!data.title || !data.content) {
            return res.status(400).json({ message: "Title and content are required." });
        }

        // Kiểm tra nếu tiêu đề có độ dài quá ngắn
        if (data.title.length < 5) {
            return res.status(400).json({ message: "Title must be at least 5 characters long." });
        }

        // Kiểm tra nếu nội dung có độ dài quá ngắn
        if (data.content.length < 20) {
            return res.status(400).json({ message: "Content must be at least 20 characters long." });
        }

        // Kiểm tra nếu không có idCategory hợp lệ
        if (!data.idCategory || isNaN(data.idCategory)) {
            return res.status(400).json({ message: "Valid category_id is required." });
        }

        // Gọi hàm tạo blog trong fil services
        const result = await postCreateBlog(data);

        // Trả về thông báo thành công và dữ liệu blog mới tạo
        res.status(201).json({
            message: "created successfully!",
            data: result
        });
    } catch (error) {
        // Xử lý lỗi nếu có sự cố khi tạo blog
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "An error occurred while creating the blog." });
    }
};

//hàm xử lý cập nhật tin tức
const putUpdateBlogAPI = async (req, res) => {
    try {
        const data = req.body;

        // Gọi hàm cập nhật blog trong cơ sở dữ liệu
        const updatedBlog = await putUpdateBlog(data);

        // Nếu không tìm thấy blog để cập nhật
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Trả về thông báo thành công và dữ liệu blog đã cập nhật
        res.status(200).json({
            message: "Blog updated successfully!",
            data: updatedBlog
        });
    } catch (error) {
        // Xử lý lỗi nếu có sự cố trong quá trình cập nhật blog
        console.error("Error updating blog:", error.message);
        res.status(500).json({ message: "An error occurred while updating the blog." });
    }
};

const putUpdateStatusBlogAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const status = req.body.status;
        console.log("Update status blog with ID:", id, "to status:", status);
        // Gọi hàm cập nhật trạng thái blog trong cơ sở dữ liệu
        const updatedBlog = await updateStatusBlog({ id, status });

        // Nếu không tìm thấy blog để cập nhật
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Trả về thông báo thành công và trạng thái blog đã cập nhật
        res.status(200).json({
            message: "Status blog updated successfully!",
            data: updatedBlog
        });
    } catch (error) {
        // Xử lý lỗi nếu có sự cố trong quá trình cập nhật blog
        console.error("Error updating blog:", error.message);
        res.status(500).json({ message: "An error occurred while updating the blog." });
    }
};

module.exports = {
    getAllBlogAPI, getBlogAPI, postCreateBlogAPI, putUpdateBlogAPI, getAllOrOneBlogAPI, putUpdateStatusBlogAPI
}