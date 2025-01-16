const connection = require('../../config/database.js');
const { or } = require('sequelize');

const {
    getAllReviewByIdCustomer,
} = require('../../services/ReviewServices.js');

const getAllReviewByIdCustomerAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const views = await getAllReviewByIdCustomer(req.params.id);
        res.status(200).json({
            success: true,
            data: views
        });
    }
    catch(error){
        return res.status(500).json({ 
            message: 'Đã xảy ra lỗi khi xử lý yêu cầu:',
            error: error.message });
    }
}

module.exports = {
    getAllReviewByIdCustomerAPI,
}