const { Op, where } = require('sequelize');
const Blog = require('../models/Blog');

const getAllBlog = async () => {
    return await Blog.findAll();
}

const getBlog = async (data) => {
    const id = data.id;
    return await Blog.findByPk(id);
}

const postCreateBlog = async (data) => {
    return await Blog.create(data)
}
const putUpdateBlog = async (data) => {
    const id = data.id;
    const findByPKUpdateBlog = await Blog.findByPk(id);
    return await findByPKUpdateBlog.update(data);
};

const updateStatusAttributeGroup = async ({id, status}) => {
    const [updatedCount] = await Attribute.update(
        { status: status }, 
        { where: { id } }
    );

    return updatedCount;
}
    
module.exports = { getAllBlog, getBlog, postCreateBlog, putUpdateBlog };
