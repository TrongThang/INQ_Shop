import ListRating from "./listRating";
import PlaceToRating from "./placeToRating";

export default function AreaRating() {
    return (
        <div className="tab-pane fade show" id="comments" role="tabpanel" aria-labelledby="comments-tab">
            <PlaceToRating />
            <ListRating />
        </div>
    );
}