import React from 'react';
import modernHouseImg from '../../../resource/img/Modern house.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactForm = () => {
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
                            <form>
                                <div className="row g-3">
                                    <div className="col-lg-12 col-xl-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control border-primary" id="name" placeholder="Your Name" />
                                            <label htmlFor="name">Họ tên</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-xl-6">
                                        <div className="form-floating">
                                            <input type="email" className="form-control border-primary" id="email" placeholder="Your Email" />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-xl-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control border-primary" id="title" placeholder="Tiêu đề của bạn" />
                                            <label htmlFor="title">Tiêu đề</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control border-primary" placeholder="Leave a message here" id="message" style={{ height: '200px' }}></textarea>
                                            <label htmlFor="message">Tin nhắn</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary w-100 py-3">Gửi tin nhắn</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="rounded">
                            <iframe className="rounded w-100" 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5139338597123!2d106.70124969999999!3d10.771894099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a3b49e59%3A0xa1bd14e483a602db!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEvhu7kgdGh14bqtdCBDYW8gVGjhuq9uZw!5e0!3m2!1svi!2s!4v1734103769238!5m2!1svi!2s" 
                                width="600" 
                                height="450" 
                                style={{ border: 0, height: '400px' }}
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;