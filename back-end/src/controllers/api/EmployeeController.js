const {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} = require('../../services/EmployeeServices');

const getAllEmployeesAPI = async (req, res) => {
    try {
        const employees = await getAllEmployees();
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getEmployeeByIdAPI = async (req, res) => {
    const id = req.params.id;

    try {
        console.log('ID: ', id)
        const customer = await getEmployeeById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: customer
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const postCreateEmployeeAPI = async (req, res) => {
    // try {
    //     const data = req.body;
    //     const employee = await createEmployee(data);
    //     res.status(201).json({ success: true, data: employee });
    // } catch (error) {
    //     res.status(500).json({ success: false, message: error.message });
    // }

    try {
        const { surname, lastname, identityNumber, email, phone, birthdate } = req.body;

        // Kiểm tra các điều kiện đầu vào
        if (!surname || surname.trim() === "") {
            return res.status(400).json({ success: false, message: "Surname là bắt buộc." });
        }
        if (!lastname || lastname.trim() === "") {
            return res.status(400).json({ success: false, message: "Lastname là bắt buộc." });
        }
        if (!identityNumber || identityNumber.trim() === "") {
            return res.status(400).json({ success: false, message: "Identity Number là bắt buộc." });
        }
        if (email && !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ success: false, message: "Email không hợp lệ." });
        }
        if (phone && isNaN(phone)) {
            return res.status(400).json({ success: false, message: "Phone phải là số." });
        }
        if (birthdate && isNaN(Date.parse(birthdate))) {
            return res.status(400).json({ success: false, message: "Birthdate không hợp lệ." });
        }

        // Tạo nhân viên mới nếu dữ liệu hợp lệ
        const employee = await createEmployee(req.body);
        res.status(201).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const putUpdateEmployeeAPI = async (req, res) => {
    // try {
    //     const { id } = req.params;
    //     const data = req.body;
    //     const employee = await updateEmployee(id, data);
    //     if (!employee) {
    //         return res.status(404).json({ success: false, message: 'Employee not found.' });
    //     }
    //     res.status(200).json({ success: true, data: employee });
    // } catch (error) {
    //     res.status(500).json({ success: false, message: error.message });
    // }
    try {
        const { id } = req.params;
        const { surname, lastname, identityNumber, email, phone, birthdate } = req.body;

        // Kiểm tra các điều kiện đầu vào
        if (surname && surname.trim() === "") {
            return res.status(400).json({ success: false, message: "Surname không được để trống." });
        }
        if (lastname && lastname.trim() === "") {
            return res.status(400).json({ success: false, message: "Lastname không được để trống." });
        }
        if (identityNumber && identityNumber.trim() === "") {
            return res.status(400).json({ success: false, message: "Identity Number không được để trống." });
        }
        if (email && !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ success: false, message: "Email không hợp lệ." });
        }
        if (phone && isNaN(phone)) {
            return res.status(400).json({ success: false, message: "Phone phải là số." });
        }
        if (birthdate && isNaN(Date.parse(birthdate))) {
            return res.status(400).json({ success: false, message: "Birthdate không hợp lệ." });
        }

        // Cập nhật thông tin nhân viên nếu dữ liệu hợp lệ
        const employee = await updateEmployee(id, req.body);
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found." });
        }

        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteEmployeeAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await deleteEmployee(id);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found.' });
        }
        res.status(200).json({ success: true, message: 'Employee status updated to 0 (soft deleted).' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllEmployeesAPI,
    getEmployeeByIdAPI,
    postCreateEmployeeAPI,
    putUpdateEmployeeAPI,
    deleteEmployeeAPI,
};
