import React from 'react';

const Services = () => {
    return (
        <div className="container py-5">
            <div className="text-center pb-5">
                <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
                    <h4 className="text-primary">Dịch Vụ Của Chúng Tôi</h4>
                    <h1 className="display-4 mb-4">Chúng Tôi Cung Cấp Dịch Vụ Smart Home Tốt Nhất</h1>
                    <p className="mb-0">
                        Chúng tôi cung cấp các giải pháp IoT thông minh để nâng cao chất lượng sống cho ngôi nhà của bạn. Với hệ thống điều khiển thông minh, an ninh và tiết kiệm năng lượng, chúng tôi giúp ngôi nhà của bạn trở nên tiện nghi và an toàn hơn.
                    </p>
                </div>
            </div>
            <div className="row">
                {/* Service 1: Sales */}
                <div className="col-md-4 mb-4 wow fadeInUp" data-wow-delay="0.2s">
                    <div className="service-item border rounded shadow-sm">
                        <div className="service-content p-4">
                            <h4 className="mb-3 text-primary">Chính Sách Bán Hàng</h4>
                            <p>
                                Chúng tôi cam kết cung cấp các sản phẩm chất lượng với mức giá hợp lý. Khách hàng sẽ nhận được sự tư vấn tận tâm và hỗ trợ tận tình từ đội ngũ nhân viên của chúng tôi. Mỗi sản phẩm đều được kiểm tra chất lượng nghiêm ngặt trước khi giao đến tay bạn.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Service 2: Shipping */}
                <div className="col-md-4 mb-4 wow fadeInUp" data-wow-delay="0.2s">
                    <div className="service-item border rounded shadow-sm">
                        <div className="service-content p-4">
                            <h4 className="mb-3 text-primary">Dịch Vụ Vận Chuyển</h4>
                            <p>
                                Chúng tôi cung cấp dịch vụ vận chuyển nhanh chóng và an toàn. Đảm bảo rằng sản phẩm của bạn sẽ đến tay bạn trong thời gian ngắn nhất và không bị hư hỏng. Bạn sẽ nhận được thông báo về tình trạng đơn hàng ngay khi có sự thay đổi.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Service 3: Customer Support */}
                <div className="col-md-4 mb-4 wow fadeInUp" data-wow-delay="0.2s">
                    <div className="service-item border rounded shadow-sm">
                        <div className="service-content p-4">
                            <h4 className="mb-3 text-primary">Hỗ Trợ Khách Hàng</h4>
                            <p>
                                Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7 qua các kênh trực tuyến và điện thoại. Mọi thắc mắc của bạn sẽ được giải đáp nhanh chóng và tận tình. Đội ngũ chăm sóc khách hàng của chúng tôi luôn lắng nghe và giải quyết mọi yêu cầu của bạn một cách hiệu quả.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
