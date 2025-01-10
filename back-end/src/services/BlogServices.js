const { Op, where } = require('sequelize');
const Blog = require('../models/Blog');
const Category = require('../models/Category');
const Employee = require('../models/Employee');



const getAllBlog_user = async () => {
    return await Blog.findAll({
        where: {
            status: 1
        },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['id', 'nameCategory']
            }
        ]
    });
};
const getAllBlog = async () => {
   
    return await Blog.findAll({
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['id', 'nameCategory']
            }
         
        ]
    });
};
// // Lấy thông tin một slide theo ID
// const getSlideById = async (id) => {
//     return await SlideShow.findOne({
//       where: { id },
//       include: [
//         { model: Employee, as: 'employee', attributes: ['surname', 'lastname'] }
//       ]
//     });
//   };
  

const getBlog = async (data) => {
    const id = data.id;
    return await Blog.findOne({
        where: { id }, // Điều kiện tìm kiếm
        include: [
            {
                model: Employee,
                as: 'employee', // Tên alias trong quan hệ
                attributes: ['surname', 'lastname'], // Chỉ lấy các trường cần thiết
            },
            
        ],
    });
};

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


module.exports = { getAllBlog, getBlog, postCreateBlog, putUpdateBlog,getAllBlog_user };