const { convertToSlug } = require('../helpers/stringHelper');
const Category = require('../models/Category');


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

const createCategory = async ({ body }) => {
    const slug = convertToSlug(body.nameCategory);
    body.slug = slug;

    const category = await Category.create(body);

    return category;
}

const updateCategory = async ({ id, ...body }) => {
    const slug = convertToSlug(body.nameCategory);
    body.slug = slug;

    const [updatedCount] = await Category.update(body, {
        where: { id }
    });

    return updatedCount;
}

const updateStatusCategory = async ({id, status}) => {
    const [updatedCount] = await Category.update(
        { status: status }, 
        { where: { id } }
    );

    return updatedCount;
}

module.exports = {
    getAllCategory_User, getAllCategory_Admin,
    getCategoryById, getChildrenCategory,
    createCategory, updateCategory, updateStatusCategory
}