import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const PurchaseStatistics = () => {
  const chartRef = useRef(null); // Ref để lưu trữ canvas
  const chartInstance = useRef(null); // Ref để lưu trữ instance của biểu đồ
  const [totalPurchases, setTotalPurchases] = useState(0); // State để lưu tổng lượt mua
  const [currentMonthPurchases, setCurrentMonthPurchases] = useState(0); // State để lưu lượt mua tháng này
  const [previousMonthPurchases, setPreviousMonthPurchases] = useState(0); // State để lưu lượt mua tháng trước
  const [purchaseChangePercentage, setPurchaseChangePercentage] = useState(0); // State để lưu phần trăm thay đổi
  const [data, setData] = useState([]); // State để lưu dữ liệu từ API

  // Gọi API để lấy dữ liệu đơn hàng
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/order/revenueStatistics');
      if (!response.ok) {
        throw new Error('Không thể lấy dữ liệu từ API');
      }
      const result = await response.json();
      setData(result.data); // Cập nhật state `data` với dữ liệu từ API
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  // Hàm tính số lượng đơn hàng theo tháng và năm
  const calculateMonthlyPurchases = (orders, targetMonth, targetYear) => {
    return orders.filter((order) => {
      const orderDate = new Date(order.created_at);
      return (
        orderDate.getMonth() === targetMonth && orderDate.getFullYear() === targetYear
      );
    }).length; // Đếm số lượng đơn hàng
  };

  // Tính tổng lượt mua, lượt mua tháng này và tháng trước
  useEffect(() => {
    if (data.length > 0) {
      // Tính tổng lượt mua
      const total = data.length;
      setTotalPurchases(total);

      // Lấy tháng và năm hiện tại
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // Tháng hiện tại (0-11)
      const currentYear = currentDate.getFullYear(); // Năm hiện tại

      // Tính lượt mua tháng này
      const currentMonthPurchases = calculateMonthlyPurchases(data, currentMonth, currentYear);
      setCurrentMonthPurchases(currentMonthPurchases);

      // Tính lượt mua tháng trước
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Nếu tháng hiện tại là tháng 1 (0), tháng trước là tháng 12 (11)
      const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear; // Nếu tháng hiện tại là tháng 1, năm trước là năm trước
      const previousMonthPurchases = calculateMonthlyPurchases(data, previousMonth, previousYear);
      setPreviousMonthPurchases(previousMonthPurchases);

      // Tính phần trăm thay đổi
      const changePercentage =
        previousMonthPurchases === 0
          ? 0
          : ((currentMonthPurchases - previousMonthPurchases) / previousMonthPurchases) * 100;
      setPurchaseChangePercentage(changePercentage);
    }
  }, [data]);

  // Gọi API khi component được render
  useEffect(() => {
    fetchData();
  }, []);

  // Cập nhật biểu đồ khi dữ liệu thay đổi
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current && data.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      // Tạo dữ liệu cho biểu đồ từ API
      const monthlyPurchaseData = Array(12).fill(0); // Mảng lưu số lượng đơn hàng theo tháng (12 tháng)
      const currentYear = new Date().getFullYear(); // Lấy năm hiện tại

      data.forEach((order) => {
        const orderDate = new Date(order.created_at);
        const month = orderDate.getMonth(); // Lấy tháng từ ngày tạo đơn hàng
        const year = orderDate.getFullYear(); // Lấy năm từ ngày tạo đơn hàng

        // Chỉ tính đơn hàng của năm hiện tại
        if (year === currentYear) {
          monthlyPurchaseData[month] += 1; // Tăng số lượng đơn hàng theo tháng
        }
      });

      chartInstance.current = new Chart(ctx, {
        type: 'bar', // Loại biểu đồ (bar, line, pie, ...)
        data: {
          labels: [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
          ],
          datasets: [
            {
              label: `Lượt mua năm ${new Date().getFullYear()}`,
              data: monthlyPurchaseData,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Biểu đồ lượt mua theo tháng',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Số lượt mua',
              },
            },
          },
        },
      });
    }

    // Hủy biểu đồ khi component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="purchase-statistics p-4">
      <h3 className="mb-4">Thống kê lượt mua</h3>

      {/* Thông tin tổng lượt mua */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tổng lượt mua</h5>
              <p className="card-text text-success font-weight-bold">{totalPurchases} lượt</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Lượt mua tháng này</h5>
              <p className="card-text text-primary font-weight-bold">{currentMonthPurchases} lượt</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">So với tháng trước</h5>
              <p className={`card-text font-weight-bold ${purchaseChangePercentage >= 0 ? 'text-success' : 'text-danger'}`}>
                {purchaseChangePercentage >= 0 ? '+' : ''}
                {purchaseChangePercentage.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Biểu đồ lượt mua */}
      <div className="card">
        <div className="card-body">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default PurchaseStatistics;