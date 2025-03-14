const InfoWebsite = require('../../models/Info_website');

const { 
    getAllInfoWebsite,
    createInfoWebsite,
    updateInfoWebsite,
    updateStatusInfoWebsite,
    getInfoByKeyName,
    getAllInfoWebsite_Admin
 } = require('../../services/InfoWebsiteServices');

const getAllInfoWebsiteAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const allInfoWebsites = await getAllInfoWebsite();
        res.status(200).json({
            success: true,
            data: allInfoWebsites
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi truy xuất thông tin website',
            error: error.message,
        });
    }
}
const getAllInfoWebsiteAPI_Admin = async (req, res) => {
    //TO DO SOMETHING
    try{
        const allInfoWebsites = await getAllInfoWebsite_Admin();
        res.status(200).json({
            success: true,
            data: allInfoWebsites
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi truy xuất thông tin website',
            error: error.message,
        });
    }
}



const getInfoWebsiteByKeyAPI = async (req, res) => {
    const { keyName } = req.params; // Lấy KEY_NAME từ request params

    try {
        const info = await getInfoByKeyName(keyName);

        if (!info) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy thông tin với KEY_NAME này',
            });
        }

        res.status(200).json({
            success: true,
            data: info,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi truy xuất thông tin',
            error: error.message,
        });
    }
};
const postAddToInfoWebsiteAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const data = req.body;
        if (!data.KEY_NAME || typeof data.KEY_NAME !== 'string' || data.KEY_NAME.trim() === "") {
            return res.status(400).json({
                success: false,
                message: 'Trường "KEY_NAME" phải là chuỗi',
            });
        }
        if (!data.VALUE || typeof data.VALUE !== 'string' || data.VALUE.trim() === "") {
            return res.status(400).json({
                success: false,
                message: 'Trường "VALUE" phải là chuỗi',
            });
        }
        const InfoWebsite = await createInfoWebsite(data);
        res.status(200).json({
            success: true,
            data: InfoWebsite
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi thêm thông tin website',
            error: error.message,
        });
    }
}

const putUpdateInfoWebsiteAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const data = req.body;
        if (!data.KEY_NAME || typeof data.KEY_NAME !== 'string' || data.KEY_NAME.trim() === "") {
            return res.status(400).json({
                success: false,
                message: 'Trường "KEY_NAME" là bắt buộc và phải là chuỗi không được để trống',
            });
        }
        // Kiểm tra VALUE
        if (data.VALUE !== undefined && (typeof data.VALUE !== 'string' || data.VALUE.trim() === "")) {
            return res.status(400).json({
                success: false,
                message: 'Trường "VALUE" phải là chuỗi',
            });
        }
        const InfoWebsite = await updateInfoWebsite(data);
        res.status(200).json({
            success: true,
            data: InfoWebsite,
            message: 'cập nhật thông tin website thành công',
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi cập nhật thông tin website',
            error: error.message,
        });
    }
}
    
const putUpdateStatusInfoWebsiteAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const data = req.body;
        const InfoWebsite = await updateStatusInfoWebsite(data);
        res.status(200).json({
            success: true,
            data: InfoWebsite,
            message: 'Cập nhật trạng thái thông tin website thành công',
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi cập nhật trạng thái thông tin website',
            error: error.message,
        });
    }
}


module.exports = {
    getAllInfoWebsiteAPI,
    postAddToInfoWebsiteAPI,
    putUpdateInfoWebsiteAPI,
    putUpdateStatusInfoWebsiteAPI,
    getInfoWebsiteByKeyAPI,
    getAllInfoWebsiteAPI_Admin
}