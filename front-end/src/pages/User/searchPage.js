import { useEffect, useMemo, useState } from "react";
import AreaSearch from "../../component/user/SearchPage/AreaSearch/areaSearch";
import AreaSort from "../../component/user/SearchPage/areaSort";
import ListDeviceSearch from "../../component/user/SearchPage/listDeviceSearch";
import { useLocation, useNavigate  } from "react-router-dom";

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
    
    // const filterData = () => {
    //     let filteredData = searchResult;

    //     // Lọc theo danh mục
    //     // if (conditionSearch.category.length > 0) {
    //     //     filteredData = filteredData.filter(item =>
    //     //         conditionSearch.category.includes(item.categoryDevice.id)
    //     //     );
    //     // }

    //     filteredData = filteredData.filter(item =>
    //         item.sellingPrice >= conditionSearch.price.min && item.sellingPrice <= conditionSearch.price.max
    //     );

    //     setDataToShow(filteredData);
    //     console.log('Search key:', location.search);
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParam = new URLSearchParams(location.search);
                const keyword = queryParam.get('keyword');
                const orderBy = queryParam.get('orderBy');
                const sortBy = queryParam.get('sortBy');

                if (keyword) {
                    const urlSortOrder = (orderBy || sortBy) ? `&orderBy=${orderBy}&sortBy=${sortBy}` : '';
                    
                    const apiUrl = `http://localhost:8081/api/device?keyword=${keyword}` + urlSortOrder;
                    const response = await fetch(apiUrl);
                    
                    const result = await response.json();

                    if (result.errorCode === 0) {
                        setSearchResult(result.data);
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

        // Lọc theo danh mục
        if (conditionSearch.category.length > 0) {
            filteredData = filteredData.filter(item =>
                conditionSearch.category.includes(item.categoryDevice.id)
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
                <h3>Có tổng { dataToShow.length } thiết bị được tìm thấy</h3>

                <ListDeviceSearch data={dataToShow} />
            </div>
        </div>
    );
}