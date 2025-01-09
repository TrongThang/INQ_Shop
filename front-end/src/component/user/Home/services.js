import React from 'react';
import { useSettingWeb } from "../../../context/settingWebContext";

const Services = () => {
    const { setting } = useSettingWeb();
    return (
        <div className="container py-5">
            <div className="text-center pb-5">
                <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
                    <h4 className="text-primary">Dịch Vụ Của Chúng Tôi</h4>
                    <h1 className="display-4 mb-4">{ setting.HOME_SERVICES_TITLE }</h1>
                    <p className="mb-0">
                        { setting.HOME_SERVICES_CONTENT }
                    </p>
                </div>
            </div>
            <div className="row">
                {/* Service 1: Sales */}
                <div className="col-md-4 mb-4 wow fadeInUp" data-wow-delay="0.2s">
                    <div className="service-item border rounded shadow-sm">
                        <div className="service-content p-4">
                            <h4 className="mb-3 text-primary">{ setting.HOME_POLICY_SELL }</h4>
                            <p>
                                {setting.HOME_POLICY_SELL_VALUE}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Service 2: Shipping */}
                <div className="col-md-4 mb-4 wow fadeInUp" data-wow-delay="0.2s">
                    <div className="service-item border rounded shadow-sm">
                        <div className="service-content p-4">
                            <h4 className="mb-3 text-primary">{setting.HOME_POLICY_DELIVER}</h4>
                            <p>
                                {setting.HOME_POLICY_DELIVER_VALUE}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Service 3: Customer Support */}
                <div className="col-md-4 mb-4 wow fadeInUp" data-wow-delay="0.2s">
                    <div className="service-item border rounded shadow-sm">
                        <div className="service-content p-4">
                            <h4 className="mb-3 text-primary">{setting.HOME_POLICY_SUPPORT}</h4>
                            <p>
                                {setting.HOME_POLICY_SUPPORT_VALUE}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
