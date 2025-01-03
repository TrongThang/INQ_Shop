import AreaSearch from "../../component/user/SearchPage/AreaSearch/areaSearch";
import AreaSort from "../../component/user/SearchPage/areaSort";
import ListDeviceSearch from "../../component/user/SearchPage/listDeviceSearch";

export default function SearchPage() {
    return (
        <div className="mt-5 col-12 row">
            <AreaSearch />
            <div className="row col-xl-10">
                <AreaSort />
                <ListDeviceSearch />
            </div>
        </div>
    );
}