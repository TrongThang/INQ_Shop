import moment from 'moment'
import 'moment/locale/vi';
import StarRating from '../../../../Shared/starRating';

export default function Rating({ review }) {
    return (
        <div className="card-body">
            <div className="d-flex flex-start mt-2">
                <img className="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp" alt="avatar" width="40"
                height="40" />
                <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-0">
                        <h6 className="text-primary fw-bold mb-0">
                            <span className="mb-2">{review.customerReview.surname} {review.customerReview.lastName}</span>
                        <br></br> <span className="text-body mt-2">{review.comment}</span>
                        </h6>
                        <p className="mb-0">{moment(review.created_at).fromNow() }</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-row">
                            <StarRating rating={review.rating} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}