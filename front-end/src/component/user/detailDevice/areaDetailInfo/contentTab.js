import OverviewDevice from "./Overview/overviewDevice";
import AreaRating from "./Rating/areaRating";
import ListSpecifications from "./Specifications/listSpecification";

export default function ContentTab() {
    return (
        <div className="tab-content" id="productTabsContent">
            <OverviewDevice />
            <ListSpecifications />
            <AreaRating />
        </div>
    );
}