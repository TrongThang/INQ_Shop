import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Xác định tab hiện tại dựa trên URL
    const activeTab = location.pathname.includes('info-web') ? 'info' : 'statistics';

    return (
        <div className="main-content">
            {/* Thanh chuyển đổi tab */}
            <ul className="nav nav-pills mb-3 ml-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'statistics' ? 'active' : ''}`}
                        onClick={() => navigate('/admin/dashboard/statistics')}>
                        Dashboard
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
                        onClick={() => navigate('/admin/dashboard/info-web')}>
                        Quản lý thông tin website
                    </button>
                </li>
            </ul>

            {/* Nội dung của từng tab */}
            <div className="tab-content" id="pills-tabContent">
             
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;