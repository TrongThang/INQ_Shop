import ListRating from "./listRating";
import PlaceToRating from "./placeToRating";

export default function AreaRating({ device }) {
    if (!device) {
        return <div>Đang tải...</div>;
    }
    console.log('Area Rating: ', device)
    return (
        <div className="tab-pane fade show" id="comments" role="tabpanel" aria-labelledby="comments-tab">
            <PlaceToRating />
            <ListRating reviews={device.reviews} />
        </div>
    );
}