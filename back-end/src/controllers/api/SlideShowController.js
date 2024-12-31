const {
    getAllSlides,
    getSlideById,
    createSlide,
    updateSlide,
    hideSlide
  } = require('../../services/SlideShowServices');
  
  // Lấy danh sách slide
  const getAllSlidesAPI = async (req, res) => {
    try {
      const slides = await getAllSlides();
      res.status(200).json({ success: true, data: slides });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Lấy thông tin một slide
  const getSlideByIdAPI = async (req, res) => {
    try {
      const { id } = req.params;
      const slide = await getSlideById(id);
      if (slide) {
        res.status(200).json({ success: true, data: slide });
      } else {
        res.status(404).json({ success: false, message: 'Slide not found.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Thêm slide mới
  const createSlideAPI = async (req, res) => {
    // try {
    //   const slideData = req.body;
    //   const newSlide = await createSlide(slideData);
    //   res.status(201).json({ success: true, data: newSlide });
    // } catch (error) {
    //   res.status(500).json({ success: false, message: error.message });
    // }

    try {
      const { textButton, link, image } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!textButton || textButton.trim() === "") {
          return res.status(400).json({ success: false, message: "Text Button là bắt buộc." });
      }
      if (!link || link.trim() === "") {
          return res.status(400).json({ success: false, message: "Link là bắt buộc." });
      }
      if (image && !/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|svg)$/.test(image)) {
          return res.status(400).json({ success: false, message: "Image phải là URL hợp lệ (jpg, jpeg, png, gif)." });
      }
     

      // Tạo slide mới nếu dữ liệu hợp lệ
      const newSlide = await createSlide(req.body);
      res.status(201).json({ success: true, data: newSlide });
     } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
  };
  
  // Cập nhật slide
  const updateSlideAPI = async (req, res) => {
    // try {
    //   const { id } = req.params;
    //   const slideData = req.body;
    //   const result = await updateSlide(id, slideData);
    //   if (result[0]) {
    //     res.status(200).json({ success: true, message: 'Slide updated successfully.' });
    //   } else {
    //     res.status(404).json({ success: false, message: 'Slide not found.' });
    //   }
    // } catch (error) {
    //   res.status(500).json({ success: false, message: error.message });
    // }

    try {
      const { id } = req.params;
    const { textButton, link, image } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!textButton || textButton.trim() === "") {
      return res.status(400).json({ success: false, message: "Text Button là bắt buộc." });
    }
    
    if (!link || link.trim() === "") {
      return res.status(400).json({ success: false, message: "Link là bắt buộc." });
    }

    // Kiểm tra định dạng URL của hình ảnh 
    if (image && !/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|svg)$/.test(image)) {
      return res.status(400).json({ success: false, message: "Image phải là URL hợp lệ (jpg, jpeg, png, gif, bmp, svg)." });
    }
      const slideData = req.body;
      const result = await updateSlide(id, slideData);
      if (result[0]) {
        res.status(200).json({ success: true, message: 'Slide updated successfully.' });
      } else {
        res.status(404).json({ success: false, message: 'Slide not found.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Ẩn slide
  const hideSlideAPI = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await hideSlide(id);
      if (result[0]) {
        res.status(200).json({ success: true, message: 'Slide hidden successfully.' });
      } else {
        res.status(404).json({ success: false, message: 'Slide not found.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  module.exports = {
    getAllSlidesAPI,
    getSlideByIdAPI,
    createSlideAPI,
    updateSlideAPI,
    hideSlideAPI
  };
  