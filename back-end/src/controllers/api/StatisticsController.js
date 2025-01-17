const { getObjectCounts } = require('../../services/StatisticsServices');

const getObjectCountsAPI = async (req, res) => {
    try {
        const { period } = req.query;
        console.log(period)
        const counts = await getObjectCounts(period);

        res.status(200).json({
            success: true,
            data: counts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy dữ liệu thống kê số lượng các đối tượng',
            error: error.message,
        });
    }
};

module.exports = {
    getObjectCountsAPI
};