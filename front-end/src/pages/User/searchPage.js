import { useEffect, useState } from "react";
import AreaSearch from "../../component/user/SearchPage/AreaSearch/areaSearch";
import AreaSort from "../../component/user/SearchPage/areaSort";
import ListDeviceSearch from "../../component/user/SearchPage/listDeviceSearch";
import { useLocation, useNavigate  } from "react-router-dom";

export default function SearchPage() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [searchResult, setSearchResult] = useState([]); 
    const [dataToShow, setDataToShow] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParam = new URLSearchParams(location.search);
                const keyword = queryParam.get('keyword');
                const orderBy = queryParam.get('orderBy');
                const sortBy = queryParam.get('sortBy');

                if (keyword) {
                    const apiUrl = `http://localhost:8081/api/device?keyword=${keyword}&orderBy=${orderBy}&sortBy=${sortBy}`;
                    const response = await fetch(apiUrl);
                    
                    const result = await response.json();

                    if (result.errorCode === 0) {
                        setSearchResult(result.data);
                        setDataToShow(result.data)
                    } else {
                        console.error("Lỗi từ API:", result.msg);
                        setSearchResult([]); 
                        setDataToShow([])
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        console.log(searchResult);
    }, [location.search]);

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

    return (
        <div className="mt-5 col-12 row">
            <AreaSearch searchResult={searchResult} setDataToShow={setDataToShow} />
            <div className="row col-xl-10">

                <AreaSort onSortChange={handleSortChange} />
                <h3>Có tổng { searchResult.length } thiết bị được tìm thấy</h3>

                <ListDeviceSearch data={searchResult} />
            </div>
        </div>
    );
}