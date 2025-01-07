const SlideShow = require('../models/SlideShow');
const Employee = require('../models/Employee'); 

// Lấy danh sách slide
const getAllSlides = async () => {
  return await SlideShow.findAll({
    include: [
      { model: Employee, as: 'employee', attributes: ['surname', 'lastname'] }
    ]
  });
};

// Lấy thông tin một slide theo ID
const getSlideById = async (id) => {
  return await SlideShow.findOne({
    where: { id },
    include: [
      { model: Employee, as: 'employee', attributes: ['surname', 'lastname'] }
    ]
  });
};

// Thêm slide mới
const createSlide = async (slideData) => {
  return await SlideShow.create(slideData);
};

// Cập nhật thông tin slide
const updateSlide = async (id, slideData) => {
  return await SlideShow.update(slideData, {
    where: { id }
  });
};

// Ẩn slide 
const updateStatusSlide = async (id, status) => {
  return await SlideShow.update(
    {
      status: 0
    },
    {
      where: { id }
    });
};

module.exports = {
  getAllSlides,
  getSlideById,
  createSlide,
  updateSlide,
  updateStatusSlide
};
