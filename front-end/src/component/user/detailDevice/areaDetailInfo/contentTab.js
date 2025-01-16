import { useEffect, useState } from "react";
import OverviewDevice from "./Overview/overviewDevice";
import AreaRating from "./Rating/areaRating";
import RelatedDevice from "./Related-device/relatedDevice";
import ListSpecifications from "./Specifications/listSpecification";

export default function ContentTab({ device }) {
    const [relatedDevice, setRelatedDevice] = useState([]); // Corrected state name (camelCase)

    // Fetch related devices
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/device/related-device/${device.idCategory}`);
            if (response.ok) {
                const result = await response.json();
                setRelatedDevice(result.data); // Corrected setter function name
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch related devices on mount
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures it's called only once when the component mounts

    // Handle loading state
    if (!device) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className="tab-content" id="productTabsContent">
            <OverviewDevice device={device} />
            <ListSpecifications attributes={device.attributes} />
            <AreaRating device={device} />
            <RelatedDevice data={relatedDevice} />
        </div>
    );
}
