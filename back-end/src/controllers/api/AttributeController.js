
const {
    getAllAttribute, getAttributeByCategoryAndAncestors, getAttributeById,
    createAttribute, updateAttribute,
    updateStatusAttribute,

    //Attr Group 
    getAllAttributeGroup, getAttributeGroupById,
    createAttributeGroup, updateAttributeGroup,
    updateStatusAttributeGroup
} = require('../../../src/services/AttributeServices');

const getAllAttributeAPI = async (req, res) => {
    try {
        const results = await getAllAttribute();

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình fetch dữ liệu của Thuộc tính',
            details: error.message,
        });
    }
}

const getAttributeByIdAPI = async (req, res) => {
    try {
        const results = await getAttributeById(req.params.id);

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Quá trình fetch dữ liệu của Thuộc tính theo ID',
            details: error.message,
        });
    }
};

const getAttributeByCategoryAPI = async (req, res) => {
    try {
        const results = await getAttributeByCategoryAndAncestors(req.params.id);

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Quá trình fetch dữ liệu của Thuộc tính theo Danh mục',
            details: error.message,
        });
    }
};

const postCreateAttributeAPI = async (req, res) => {
    console.log(req.body);
    try {
        const results = await createAttribute(req.body);
        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Tạo thuộc tính thất bại',
            details: error.message,
        });
    }
}

const putUpdateAttributeAPI = async (req, res) => {
    try {
        const data = req.body;
        const {id} = req.params;
        const results = await updateAttribute({id, data});
        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Cập nhật giá trị thuộc tính thất bại',
            details: error.message,
        });
    }
}

const updateStatusAttributeAPI = async (req, res) => {
    try {
        const { id }= req.params;
        const status = req.body.status;
        const results = await updateStatusAttribute({id, status});

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Cập nhật trạng thái thuộc tính thất bại',
            details: error.message,
        });
    }
}

//AttributeGroup
const getAllAttributeGroupAPI = async (req, res) => {
    try {
        const results = await getAllAttributeGroup();

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình fetch dữ liệu của Thuộc tính',
            details: error.message,
        });
    }
}

const getAttributeGroupByIdAPI = async (req, res) => {
    try {
        const results = await getAttributeGroupById(req.params.id);

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Quá trình fetch dữ liệu của Thuộc tính theo ID',
            details: error.message,
        });
    }
};


const postCreateAttributeGroupAPI = async (req, res) => {
    try {
        const results = await createAttributeGroup(req.body);

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Tạo thuộc tính thất bại',
            details: error.message,
        });
    }
}

const putUpdateAttributeGroupAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const result = await updateAttributeGroup({ id, ...data });

        if (result === 0) {
            return res.status(404).json({ message: "Attribute group not found" });
        }

        return res.status(200).json({
            errorCode: 0,
            data: result,
            message: "Attribute group updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Cập nhật nhóm thuộc tính thất bại',
            details: error.message,
        });
    }
};

const updateStatusAttributeGroupAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const status = req.body.status;
        
        const result = await updateStatusAttributeGroup({id, status});

   
        if (!result) {
            return res.status(404).json({ message: "AttributeGroup not found" });
        }

      
        res.status(200).json({
            message: "Status AttributeGroup updated successfully!",
            data: result
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllAttributeAPI, getAttributeByIdAPI, getAttributeByCategoryAPI,
    postCreateAttributeAPI, putUpdateAttributeAPI, updateStatusAttributeAPI,
    //Attr Group
    getAllAttributeGroupAPI, getAttributeGroupByIdAPI, 
    postCreateAttributeGroupAPI, putUpdateAttributeGroupAPI,
    updateStatusAttributeGroupAPI
}