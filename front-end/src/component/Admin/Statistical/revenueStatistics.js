import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const RevenueStatistics = () => {
  const chartRef = useRef(null); // Ref để lưu trữ canvas
  const chartInstance = useRef(null); // Ref để lưu trữ instance của biểu đồ
  const [totalRevenue, setTotalRevenue] = useState(0); // State để lưu tổng doanh thu
  const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0); // State để lưu doanh thu tháng này
  const [previousMonthRevenue, setPreviousMonthRevenue] = useState(0); // State để lưu doanh thu tháng trước
  const [revenueChangePercentage, setRevenueChangePercentage] = useState(0); // State để lưu phần trăm thay đổi
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

  // Hàm tính doanh thu theo tháng và năm
  const calculateMonthlyRevenue = (orders, targetMonth, targetYear) => {
    return orders
      .filter((order) => {
        const orderDate = new Date(order.created_at);
        return (
          orderDate.getMonth() === targetMonth && orderDate.getFullYear() === targetYear
        );
      })
      .reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);
  };

  // Tính tổng doanh thu, doanh thu tháng này và tháng trước
  useEffect(() => {
    if (data.length > 0) {
      // Tính tổng doanh thu
      const total = data.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);
      setTotalRevenue(total);

      // Lấy tháng và năm hiện tại
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // Tháng hiện tại (0-11)
      const currentYear = currentDate.getFullYear(); // Năm hiện tại

      // Tính doanh thu tháng này
      const currentMonthRevenue = calculateMonthlyRevenue(data, currentMonth, currentYear);
      setCurrentMonthRevenue(currentMonthRevenue);

      // Tính doanh thu tháng trước
      let previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Nếu tháng hiện tại là tháng 1 (0), tháng trước là tháng 12 (11)
      let previousYear = currentMonth === 0 ? currentYear - 1 : currentYear; // Nếu tháng hiện tại là tháng 1, năm trước là năm trước
      const previousMonthRevenue = calculateMonthlyRevenue(data, previousMonth, previousYear);
      setPreviousMonthRevenue(previousMonthRevenue);

      // Tính phần trăm thay đổi
      const changePercentage =
        previousMonthRevenue === 0
          ? 0
          : ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
      setRevenueChangePercentage(changePercentage);
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
      const monthlyRevenueData = Array(12).fill(0); // Mảng lưu doanh thu theo tháng (12 tháng)
      const currentYear = new Date().getFullYear(); // Lấy năm hiện tại

      data.forEach((order) => {
        const orderDate = new Date(order.created_at);
        const month = orderDate.getMonth(); // Lấy tháng từ ngày tạo đơn hàng
        const year = orderDate.getFullYear(); // Lấy năm từ ngày tạo đơn hàng

        // Chỉ tính doanh thu của năm hiện tại
        if (year === currentYear) {
          monthlyRevenueData[month] += parseFloat(order.totalAmount); // Cộng dồn doanh thu theo tháng
        }
      });

      chartInstance.current = new Chart(ctx, {
        type: 'line', // Loại biểu đồ (line, bar, pie, ...)
        data: {
          labels: [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
          ],
          datasets: [
            {
              label: `Doanh thu năm ${new Date().getFullYear()} (VND)`,
              data: monthlyRevenueData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
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
              text: 'Biểu đồ doanh thu theo tháng',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Doanh thu (VND)',
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
    <div className="revenue-statistics p-4">
      <h3 className="mb-4">Thống kê doanh thu</h3>

      {/* Thông tin tổng doanh thu */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tổng doanh thu</h5>
              <p className="card-text text-success font-weight-bold">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Doanh thu tháng này</h5>
              <p className="card-text text-primary font-weight-bold">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentMonthRevenue)}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">So với tháng trước</h5>
              <p className={`card-text font-weight-bold ${revenueChangePercentage >= 0 ? 'text-success' : 'text-danger'}`}>
                {revenueChangePercentage >= 0 ? '+' : ''}
                {revenueChangePercentage.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="card">
        <div className="card-body">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default RevenueStatistics;