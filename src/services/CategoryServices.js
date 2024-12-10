const { convertToSlug } = require('../helpers/stringHelper');
const Category = require('../models/Category');

// USER
const getAllCategory_User = async () => {
    const data = await Category.findAll({
        where: { status: 1},
    });

    return await data;
}

const getAllCategory_Admin = async () => {
    const data = await Category.findAll();

    return await data;
}

const getCategoryById = async (id) => {
    return await Category.findByPK(id);
}

const getChildrenCategory = async (parenId) => {
    return await Category.findAll({
        where: { parenId: parenId },
    });
}

const createCategory = async ({nameCategory, parentId, image, description, status}) => {
    const slug = convertToSlug(nameCategory);

    const category = await Category.create({
        nameCategory: nameCategory, 
        slug: slug,
        parentId: parentId,
        image: image,
        description: description,
        status: status,
    })

    return category;
}

const updateCategory = async ({ id, ...body }) => {
    const slug = convertToSlug(nameCategory);
    
    const [updatedCount] = await category.update(body, {
        where: { id }
    });

    return updatedCount;
}

const deleteCategory = async ({id, status}) => {
    const [updatedCount] = await category.update(
        { status: 0 }, 
        { where: { id } }
    );

    return updatedCount;
}

module.exports = {
    getAllCategory_User, getAllCategory_Admin,
    getCategoryById, getChildrenCategory,
    createCategory, updateCategory, deleteCategory
}