import OverviewDevice from "./Overview/overviewDevice";
import AreaRating from "./Rating/areaRating";
import ListSpecifications from "./Specifications/listSpecification";

export default function ContentTab({ device }) {
    if (!device) {
        return <div>Đang tải...</div>;
    }
    console.log('Content Tab: ', device)
    
    return (
        <div className="tab-content" id="productTabsContent">
            <OverviewDevice device={device} />
            <ListSpecifications attributes={ device.attributes } />
            <AreaRating device={device}/>
        </div>
    );
}