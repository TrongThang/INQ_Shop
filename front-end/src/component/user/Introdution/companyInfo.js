import React from 'react';
import { useSettingWeb } from "../../../context/settingWebContext";
const CompanyInfo = () => {
    const { setting } = useSettingWeb();
    
    return (
        <div className="company-info py-5">
            <div className="py-5">
                <div className="text-center pb-5 wow fadeInUp" data-wow-delay="0.2s">
                    <h4 className="display-3 mb-4">Thông Tin Công Ty</h4>
                </div>
                <div className="text-start" style={{ marginLeft: "200px" }}>
                    <p className="fs-5 mb-4"><strong>Tên công ty:</strong> {setting.COMPANY_NAME}</p>
                    <p className="fs-5 mb-4"><strong>Địa chỉ:</strong> {setting.COMPANY_ADDRESS}</p>
                    <p className="fs-5 mb-4"><strong>Số điện thoại:</strong> {setting.COMPANY_PHONE}</p>
                    <p className="fs-5 mb-4"><strong>Email:</strong> {setting.COMPANY_EMAIL}</p>
                    <p className="fs-5 mb-4"><strong>Website:</strong> <a href={setting.COMPANY_LINK_WEBSITE} target="_blank" rel="noopener noreferrer">{setting.COMPANY_LINK_WEBSITE}</a></p>
                    <p className="fs-5 mb-4"><strong>Lĩnh vực kinh doanh:</strong> {setting.COMPANY_BUSINESSFIELD}</p>
                    <p className="fs-5 mb-4"><strong>Tầm nhìn:</strong> {setting.COMPANY_VISION}</p>
                    <p className="fs-5 mb-4"><strong>Sứ mệnh:</strong> {setting.COMPANY_MISSION}</p>
                    <p className="fs-5 mb-4"><strong>Chính sách:</strong> {setting.COMPANY_POLICIES}</p>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfo;