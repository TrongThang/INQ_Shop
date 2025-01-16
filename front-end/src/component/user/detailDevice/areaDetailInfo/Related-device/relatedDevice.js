import DeviceCard from "../../../../Shared/deviceCard";

function RelatedDevice({ data }) {
    return (
        <>
        <div className="my-5">
            <h1>Thiết bị liên quan</h1>
        </div>
            <div className="row">
                {data.map((device, index) => (
                    <DeviceCard key={index} device={device} />
                ))}
            </div>
        </>

    )
}

export default RelatedDevice;