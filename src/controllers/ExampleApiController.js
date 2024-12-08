const connection = require('../config/database');

//Models used to in this file
//const Device = required('../models/Device');

//FUNCTION of Services

//Trực tiếp
const getAllDevicesAPI = async (req, res) => {
    //TO DO SOMTHING
    //Step: Câu lệnh truy vấn -> Thực hiện truy vấn -> Trả về kết quả kèm status code, success: true/flase 
    let sql = 'SELECT * FROM Device';

    let [results, fields] = await connection.query(sql);
    
    return res.status(200).json({
        success: true,
        errorCode: 0,
        data: results
    });
};
//OR - Gián tiếp
const postCreateUserAPI = async (req, res) => {
    
    let name = req.body.name;
    let email = req.body.email;
    let city = req.body.city;

    //CreateUser coding in ./services/UserCRUD_Services.js 
    let insertId = await createUser(name, email, city);

    //[insertId] REPLACE => affectedRow or result
    if (insertId) {
        return res.status(201).json({
            success: true,
        })
    } else {
        return res.status(500).json({
            success: false,
            message: 'Có lỗi trong quá trình ...!'
        })
    }
};

module.exports = {
    //TO DO FUNCTION EXPORTS
}