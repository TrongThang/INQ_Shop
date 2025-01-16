import React, { useEffect, useState } from 'react';
import CardData from './cardData';
import axios from 'axios';

const StatisticsTab = () => {
    const [counts, setCounts] = useState({
        Revenue: 0,
        TotalDeviceSold: 0,
        CountCustomerSold: 0,
        RevenuePercentageChange: 0, 
        TotalDeviceSoldPercentageChange: 0,
        CountCustomerSoldPercentageChange: 0
    });

    const [loading, setLoading] = useState(true);
    const [timeFilter, setTimeFilter] = useState("day"); // Mặc định chọn "Ngày"
    const handleFilterChange = async (e) => {
        const value = e.target.value;
        setTimeFilter(value)
    };

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/statistics/object-counts?period=${timeFilter}`);

                const result = response.data

                setCounts(result.data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [timeFilter]);

    if (loading) {
        return <div>Đang tải dữ liệu thống kê...</div>;
    }

    return (
        <>
            <div className="mb-3 col-4">
                <label htmlFor="dateFilter" className="form-label">
                    Chọn khoảng thời gian:
                </label>
                <select
                    id="dateFilter"
                    className="form-select border border-secondary rounded"
                    value={timeFilter}
                    onChange={handleFilterChange}
                >
                    <option value="day">Ngày</option>
                    <option value="month">Tháng</option>
                    <option value="year">Năm</option>
                </select>
            </div>
            <div className="row">
                <CardData data={counts.Revenue} title="Doanh thu" growValue={counts.RevenuePercentageChange}
                    type="money" icon="fa-solid fa-sack-dollar" period={timeFilter}
                />
                <CardData data={counts.TotalDeviceSold} title="Thiết bị đã bán" growValue={counts.TotalDeviceSoldPercentageChange}
                    icon="fa-solid fa-basket-shopping" period={timeFilter}
                />
                <CardData data={counts.CountCustomerSold} title="Khách hàng đã mua" growValue={counts.CountCustomerSoldPercentageChange}
                    icon="fa-solid fa-users" period={timeFilter}
                />
            </div>
        </>
    );
};

export default StatisticsTab;