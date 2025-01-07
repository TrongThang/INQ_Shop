import DeviceCard from "../../Shared/deviceCard";

export default function ListDeviceSearch({ data }) {
    console.log('Danh sách tìm kiếm: ', data);
    
    return (
        <div className="row">
            {data.map((device, index) => (
                <DeviceCard key={index} device={device} />
            ))} 
        </div>
    );
}