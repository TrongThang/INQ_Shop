import React, { useEffect, useState } from 'react';

const StatisticsTab = () => {
    const [counts, setCounts] = useState({
        deviceCount: 0,
        customerCount: 0,
        orderCount: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/statistics/object-counts');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCounts(data.data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) {
        return <div>Đang tải dữ liệu thống kê...</div>;
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="single-report mb-xs-30">
                    <div className="s-report-inner pr--20 pt--30 mb-3">
                        <div className="icon">
                            <i className="fa-solid fa-basket-shopping"></i>
                        </div>
                        <div className="s-report-title d-flex justify-content-between">
                            <h4 className="header-title mb-0"># Thiết bị</h4>
                            <p>24 H</p>
                        </div>
                        <div className="d-flex justify-content-between pb-2">
                            <h2>{counts.deviceCount}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="single-report mb-xs-30">
                    <div className="s-report-inner pr--20 pt--30 mb-3">
                        <div className="icon">
                            <i className="fa-solid fa-users"></i>
                        </div>
                        <div className="s-report-title d-flex justify-content-between">
                            <h4 className="header-title mb-0"># Khách hàng</h4>
                            <p>24 H</p>
                        </div>
                        <div className="d-flex justify-content-between pb-2">
                            <h2>{counts.customerCount}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="single-report">
                    <div className="s-report-inner pr--20 pt--30 mb-3">
                        <div className="icon">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                        <div className="s-report-title d-flex justify-content-between">
                            <h4 className="header-title mb-0"># Đơn hàng</h4>
                            <p>24 H</p>
                        </div>
                        <div className="d-flex justify-content-between pb-2">
                            <h2>{counts.orderCount}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsTab;