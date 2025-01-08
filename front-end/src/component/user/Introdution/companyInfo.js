import React, { useEffect, useState } from 'react';

const CompanyInfo = () => {
    const [companyData, setCompanyData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8081/api/infoWebsite')  // Cập nhật URL API nếu cần
            .then(response => response.json())
            .then(responseData => {
                console.log('API response:', responseData); // Thêm console log để kiểm tra dữ liệu trả về
                if (responseData.success) {
                    // Chuyển đổi mảng thành object với key-value
                    const formattedData = {};
                    responseData.data.forEach(item => {
                        if (item.status === 1) {  // Giả định chỉ lấy những mục có status là 1
                            formattedData[item.KEY_NAME] = item.VALUE;
                        }
                    });
                    setCompanyData(formattedData);
                } else {
                    console.error('API response not successful');
                }
                setLoading(false); // Dừng loading sau khi nhận được dữ liệu
            })
            .catch(error => {
                console.error('There was an error fetching the company data!', error);
                setLoading(false); // Dừng loading nếu có lỗi
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!Object.keys(companyData).length) {
        return <div>No company data available.</div>;
    }

    return (
        <div className="company-info py-5">
            <div className="py-5">
                <div className="text-center pb-5 wow fadeInUp" data-wow-delay="0.2s">
                    <h4 className="display-3 mb-4">Thông Tin Công Ty</h4>
                </div>
                <div className="text-start" style={{ marginLeft: "200px" }}>
                    <p className="fs-5 mb-4"><strong>Tên công ty:</strong> {companyData.COMPANY_NAME}</p>
                    <p className="fs-5 mb-4"><strong>Địa chỉ:</strong> {companyData.COMPANY_ADDRESS}</p>
                    <p className="fs-5 mb-4"><strong>Số điện thoại:</strong> {companyData.COMPANY_PHONE}</p>
                    <p className="fs-5 mb-4"><strong>Email:</strong> {companyData.COMPANY_EMAIL}</p>
                    <p className="fs-5 mb-4"><strong>Website:</strong> <a href={companyData.COMPANY_LINK_WEBSITE} target="_blank" rel="noopener noreferrer">{companyData.COMPANY_LINK_WEBSITE}</a></p>
                    <p className="fs-5 mb-4"><strong>Lĩnh vực kinh doanh:</strong> {companyData.COMPANY_BUSINESSFIELD}</p>
                    <p className="fs-5 mb-4"><strong>Tầm nhìn:</strong> {companyData.COMPANY_VISION}</p>
                    <p className="fs-5 mb-4"><strong>Sứ mệnh:</strong> {companyData.COMPANY_MISSION}</p>
                    <p className="fs-5 mb-4"><strong>Chính sách:</strong> {companyData.COMPANY_POLICIES}</p>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfo;