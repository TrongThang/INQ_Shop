import { useEffect, useMemo, useState } from "react";
import AreaSearch from "../../component/user/SearchPage/AreaSearch/areaSearch";
import AreaSort from "../../component/user/SearchPage/areaSort";
import ListDeviceSearch from "../../component/user/SearchPage/listDeviceSearch";
import { useLocation, useNavigate, useParams  } from "react-router-dom";
import Pagination from "../../component/Shared/Pagination/pagination";

export default function SearchPage() {
    useEffect(() => {
        document.title = 'Tìm kiếm | INQ'
    }, []);
    
    const location = useLocation();
    const navigate = useNavigate(); 
    const [searchResult, setSearchResult] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [conditionSearch, setConditionSearch] = useState({
        category: [],
        price: { min: 0, max: 100000000 }
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParam = new URLSearchParams(location.search);
                const keyword = queryParam.get('keyword');
                const orderBy = queryParam.get('orderBy');
                const sortBy = queryParam.get('sortBy');
                const page = queryParam.get('page') || 0

                if (keyword) {
                    const urlSortOrder = (orderBy || sortBy) ? `&orderBy=${orderBy}&sortBy=${sortBy}` : '';
                    const urlPage = page ? `&page=${page}` : '';
                    const apiUrl = `http://localhost:8081/api/device/search?keyword=${encodeURIComponent(keyword)}${urlPage}${urlSortOrder}`;
                    const response = await fetch(apiUrl);
                    
                    const result = await response.json();

                    if (result.errorCode === 0) {
                        setSearchResult(result.data);
                        setTotalPages(result.totalPages);
                        setCurrentPage(parseInt(page) + 1)
                        setTotalCount(result.totalCount)
                    } else {
                        console.error("Lỗi từ API:", result.msg);
                        setSearchResult([]); 
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [location.search]);


    const dataToShow = useMemo(() => {
        let filteredData = searchResult;
        //Xử lý lấy các sản phẩm từ trang nào tới trang nào của searchResult

        // Lọc theo danh mục
        if (conditionSearch.category.length > 0) {
            filteredData = filteredData.filter(item =>
                conditionSearch.category.includes(item.categoryDevice?.id)
            );
        }

        // Lọc theo giá
        filteredData = filteredData.filter(item =>
            item.sellingPrice >= conditionSearch.price.min && item.sellingPrice <= conditionSearch.price.max
        );

        return filteredData;
    }, [searchResult, conditionSearch]);

    const handleSortChange = (selectedSort) => {
        const [orderBy, sortBy] = selectedSort.split('_'); // Tách --> orderBy và sortBy
        
        const queryParam = new URLSearchParams(location.search);
        queryParam.set('orderBy', orderBy);
        queryParam.set('sortBy', sortBy);
        navigate(`?${queryParam.toString()}`);
    };

    if (loading) {
        return <div>Đang tải...</div>;
    }

    const handleCategoryChange = (selectedCategories) => {
        setConditionSearch(prev => ({ ...prev, category: selectedCategories }));
    };

    const handlePriceChange = (min, max) => {
        setConditionSearch(prev => ({ ...prev, price: { min, max } }));
    };

    const handlePageChange = (newPage) => {
        const queryParam = new URLSearchParams(location.search);
        queryParam.set('page', newPage - 1);
        navigate(`?${queryParam.toString()}`);
    };

    return (
        <div className="mt-5 col-12 row">
            <AreaSearch
                searchResult={searchResult}
                dataToShow={dataToShow}
                onCategoryChange={handleCategoryChange}
                onPriceChange={handlePriceChange}
            />
            <div className="row col-xl-10">

                <AreaSort onSortChange={handleSortChange} />
                <h3>Có tổng { totalCount } thiết bị được tìm thấy</h3>

                <ListDeviceSearch data={dataToShow} />
            </div>

            {
                totalPages > 1
                && <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
            }
        </div>
    );
}