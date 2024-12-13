const {
    getAllBlog,
    getBlog,
    postCreateBlog,
    putUpdateBlog
} = require('../../services/BlogServices.js')

const getAllBlogAPI = async (req, res) => {
    try {
        const result = await getAllBlog();
        if (!result || result.length === 0) {
            return res.status(404).json({ message: "No blogs found" });
        }
        res.status(200).json({
            data: result
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: "An error occurred while fetching blogs" });
    }
};

const getBlogAPI = async (req, res) => {
    const data = req.body;
    try {
        const result = await getBlog(data);
        if (!result) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({
            data: result
        });
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ message: "An error occurred while fetching the blog" });
    }
};
const getAllOrOneBlogAPI = async(req, res) => {
    const {id} = req.body;
    console.log(id) 
    if(id) {
        await getBlogAPI(req,res)
        return;
    }
    await getAllBlogAPI(req,res)
}

const postCreateBlogAPI = async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        if (!data.title || !data.content) {
            return res.status(400).json({ message: "Title and content are required." });
        }
        const result = await postCreateBlog(data);

        res.status(201).json({
            message: "Blog created successfully!",
            data: result
        });
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "An error occurred while creating the blog." });
    }
};

const putUpdateBlogAPI = async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        const updatedBlog = await putUpdateBlog(data);
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({
            message: "Blog updated successfully!",
            data: updatedBlog
        });
    } catch (error) {
        console.error("Error updating blog:", error.message);
        res.status(500).json({ message: "An error occurred while updating the blog." });
    }
};

module.exports = {
    getAllBlogAPI, getBlogAPI, postCreateBlogAPI, putUpdateBlogAPI, getAllOrOneBlogAPI
}