const Attribute = require('../models/Attribute');
const AttributeGroup = require('../models/Attribute_group');
const Category = require('../models/Category');

const getAllAttribute = async () => {
    const data = await Attribute.findAll();

    return await data;
}

//Lấy tất cả danh mục cha (bao gồm danh mục hiện tại)
const getAllParentCategories = async (idCate, parentCategories = []) => {
    const category = await category.findByPk(idCate, {
        attributes: ['id', 'parentId'],
    });

    //Nếu k có tìm thấy danh mục hoặc không có cả danh mục cha
    //=> Dừng đệ quy và trả về kết quả
    if (category && category.parentId) {
        parentCategories.push(category.parentId);
        return getAllParentCategories(category.parentId, parentCategories);
    }

    return parentCategories;
};

//Các thuộc tính được lấy ra phải có trạng thái được mở !!
const getAttributeByCategoryAndAncestors = async ( idCate ) => {
    const parentCategoryIds = await getAllParentCategories(idCate);

    // Lấy cả danh mục hiện tại mà người dùng truyền vào
    const allCategoryIds = [idCate, ...parentCategoryIds];

    const attributes = await Attribute.findAll({
        where: {
            idCategory: {
                [Op.in]: allCategoryIds, //Op: Là toán tử dùng để so sánh => Ở trường hợp này là 1 phần từ nằm trong danh sách của allCategoryIds
            },
            status: 1
        },
    });

    return attributes;
}

const getAttributeById = async ( id ) => {
    const data = await Attribute.findByPk(id);
    console.log(data);
    return await data;
}
/// ATTRIBUTE
const createAttribute = async ( body ) => {
    const Attr = await Attribute.create( body )

    return Attr;
}

const updateAttribute = async ({ id, data }) => { 
    if (data.required !== undefined) {
        data.required = data.required === "1" || data.required === 1 || data.required === true;
    }
    const updatedAttr = await Attribute.update(data, {
        where: { id: id }
    });

    return updatedAttr;
}

const updateStatusAttribute = async ({id, status}) => {
    console.log(id, status);
    const updatedAttr = await Attribute.update(
        { status: status }, 
        { where:  { id : id } }
    );

    return updatedAttr;
}
/// END ATTRIBUTE

/// ATTRIBUTE GROUP
const getAllAttributeGroup = async () => {
    const data = await AttributeGroup.findAll();

    return await data;
}

const getAttributeGroupById = async ( id ) => {
    const data = await AttributeGroup.findByPk(id);

    return await data;
}

const createAttributeGroup = async ( body ) => {
    const attributeGroup = await AttributeGroup.create( body )

    return attributeGroup;
}

const updateAttributeGroup = async ({ id, ...body }) => { 
    const [updatedCount] = await AttributeGroup.update(body, {
        where: { id }
    });

    return updatedCount;
}

const updateStatusAttributeGroup = async ({id, status}) => {
    const [updatedCount] = await Attribute.update(
        { status: status }, 
        { where: { id } }
    );

    return updatedCount;
}

/// END ATTRIBUTE GROUP

module.exports = {
    getAllAttribute, getAttributeByCategoryAndAncestors, getAttributeById,
    createAttribute, updateAttribute,
    updateStatusAttribute,
    //Attr Group 
    getAllAttributeGroup, getAttributeGroupById,
    createAttributeGroup, updateAttributeGroup,
    updateStatusAttributeGroup
}