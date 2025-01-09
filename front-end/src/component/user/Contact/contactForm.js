import React from 'react';
import modernHouseImg from '../../../resource/img/Modern house.png';

const ContactForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="container-fluid contact bg-light">
      <div className="container">
        <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '850px' }}>
          <h3 className="display-5 mb-4">Bạn cần hỗ trợ?</h3>
          <h5 className="text-primary">INQ rất hân hạnh được hỗ trợ bạn, hãy để lại thông tin cho chúng tôi nhé. Yêu cầu của bạn sẽ được xử lý và phản hồi trong thời gian sớm nhất.</h5>
        </div>
        <div className="row g-5">
          <div className="col-xl-6 wow fadeInLeft" data-wow-delay="0.2s">
            <div className="contact-img d-flex justify-content-center">
              <div className="contact-img-inner">
                <img src={modernHouseImg} className="img-fluid w-100" alt="Image" />
              </div>
            </div>
          </div>
          <div className="col-xl-6 wow fadeInRight" data-wow-delay="0.4s">
            <div>
              <h4 className="text-primary">Gửi tin nhắn của bạn</h4>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-lg-12 col-xl-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control border-primary"
                        id="fullname"
                        name="fullname"
                        placeholder="Your Name"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Họ tên không được bỏ trống')}
                        onInput={(e) => e.target.setCustomValidity('')}
                      />
                      <label htmlFor="fullname">Họ tên</label>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control border-primary"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Email không được bỏ trống hoặc không hợp lệ')}
                        onInput={(e) => e.target.setCustomValidity('')}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control border-primary"
                        id="title"
                        name="title"
                        placeholder="Tiêu đề của bạn"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Tiêu đề không được bỏ trống')}
                        onInput={(e) => e.target.setCustomValidity('')}
                      />
                      <label htmlFor="title">Tiêu đề</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control border-primary"
                        placeholder="Leave a message here"
                        id="content"
                        name="content"
                        style={{ height: '200px' }}
                        value={formData.content}
                        onChange={handleChange}
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Tin nhắn không được bỏ trống')}
                        onInput={(e) => e.target.setCustomValidity('')}
                      ></textarea>
                      <label htmlFor="content">Tin nhắn</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100 py-3">
                      Gửi tin nhắn
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
