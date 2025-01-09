import DeviceCard from "../../Shared/deviceCard";

export default function ListDeviceSearch({ data }) {
    console.log('Danh sách tìm kiếm: ', data);
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="position-relative">
                    {/* Prev Button: Only visible when there are more products to scroll */}


                    <div className="d-flex overflow-hidden product-container product-container-best-seller">
                        {data.map((device, index) => (
                            <DeviceCard key={index} device={device} />
                        ))}
                    </div>
                    {/* Next Button: Only visible when there are more products to scroll */}
                </div>
            </div>
        </div>
    );
}