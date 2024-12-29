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
    try {
        const data = req.body;
        const employee = await createEmployee(data);
        res.status(201).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const putUpdateEmployeeAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const employee = await updateEmployee(id, data);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found.' });
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
