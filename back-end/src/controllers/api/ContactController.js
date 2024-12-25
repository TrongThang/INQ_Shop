const {
    getAllContact,
    getContact,
    postCreateContact,
    putUpdateContact,
    checkContactByEmail
} = require('../../services/ContactServices.js');


// hàm xử lý lấy tất cả yêu cầu
const getAllContactAPI = async (req, res) => {
    try {
        const result = await getAllContact();

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "No contacts found" });
        }
        res.status(200).json({
            errorCode: 0,
            data: result,
            message: "successfully"
        });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "An error occurred while fetching contacts" });
    }
};

//hàm xử lý lấy liên hệ theo yêu cầu
const getContactAPI = async (req, res) => {
    try {
        const data = req.body;

        const result = await getContact(data);
        // Nếu không tìm thấy liên hệ
        if (!result) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({
            errorCode: 0,
            data: result,
            message: "successfully"
        });
    } catch (error) {
        console.error("Error fetching contact:", error);
        res.status(500).json({ message: "An error occurred while fetching contact" });
    }
};

const getAllContactOrgetOneContact = async (req, res) => {
    // Lấy dữ liệu từ body của yêu cầu
    const data = req.body;

    // In ra console dữ liệu từ body để kiểm tra
    console.log("Request Body:", data);

    // Kiểm tra nếu có dữ liệu và có trường 'id' trong body yêu cầu
    if (data && data.id) {
        // Nếu có 'id', gọi API getContactAPI để lấy thông tin liên hệ theo id
        await getContactAPI(req, res);
        return; // Dừng chức năng và trả về kết quả
    }

    // Nếu không có 'id' trong body, gọi API getAllContactAPI để lấy tất cả liên hệ
    await getAllContactAPI(req, res);
};

//hàm xử lý tạo mới liên hệ
const postCreateContactAPI = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);

        // Kiểm tra xem fullname có trống không
        if (!data.fullname || data.fullname.trim() === "") {
            return res.status(400).json({
                message: "Fullname cannot be empty."
            });
        }

        // Kiểm tra xem title có trống không
        if (!data.title || data.title.trim() === "") {
            return res.status(400).json({
                message: "Title cannot be empty."
            });
        }

        // Kiểm tra xem email có trống không
        if (!data.email || data.email.trim() === "") {
            return res.status(400).json({
                message: "Email cannot be empty."
            });
        }

        // Kiểm tra xem email có hợp lệ không (Ví dụ: email phải chứa '@')
        if (data.email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
            return res.status(400).json({
                message: "Invalid email format."
            });
        }

        // Kiểm tra email đã tồn tại trong cơ sở dữ liệu
        const existingContactByEmail = await checkContactByEmail(data.email);
        if (existingContactByEmail) {
            return res.status(400).json({
                message: "Email already exists."
            });
        }

        // Kiểm tra nếu data có đủ thông tin và hợp lệ, sau đó tạo mới liên hệ
        const result = await postCreateContact(data);

        // Trả về thông báo thành công
        res.status(201).json({
            errorCode: 0,
            data: result,
            message: "Contact created successfully"
        });
    } catch (error) {
        console.error("Error creating contact:", error.message);

        // Trả về lỗi khi có sự cố trong quá trình tạo liên hệ
        res.status(500).json({ message: "An error occurred while creating the contact." });
    }
};

//hàm xử lý cập nhật liên hệ
const putUpdateContactAPI = async (req, res) => {
    try {
        const data = req.body;
        console.log("Request Data:", data);
        // Cập nhật liên hệ với dữ liệu đã kiểm tra
        const result = await putUpdateContact(data);

        if (!result) {
            return res.status(404).json({ message: "Contact not found" });
        }

        // Trả về thông báo thành công
        res.status(200).json({
            errorCode: 0,
            data: result,
            message: "successfully"
        });
    } catch (error) {
        console.error("Error updating contact:", error.message);

        // Trả về lỗi khi có sự cố trong quá trình cập nhật liên hệ
        res.status(500).json({ message: "An error occurred while updating the contact." });
    }
};

module.exports = {
    getAllContactOrgetOneContact,
    postCreateContactAPI,
    putUpdateContactAPI,
};
