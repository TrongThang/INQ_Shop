import { useEffect, useState } from "react";
import ListRating from "./listRating";
import PlaceToRating from "./placeToRating";
import axios from "axios";

export default function AreaRating({ device }) {
    const [reviews, setReviews] = useState(device.reviews || []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/device/reviews/${device.idDevice}`);
            setReviews(response.data);
            console.log('Đánh giá:', reviews)
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bình luận:', error);
        }
    };

    useEffect(() => {
        fetchReviews(); 
    }, [device.idDevice]);

    const handleCommentSubmitted = async () => {
        await fetchReviews(); // Load lại danh sách bình luận
    };

    if (!device) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className="tab-pane fade show" id="comments" role="tabpanel" aria-labelledby="comments-tab">
            <PlaceToRating idDevice={device.idDevice} onCommentSubmitted={handleCommentSubmitted} />
            <ListRating reviews={reviews} />
        </div>
    );
}