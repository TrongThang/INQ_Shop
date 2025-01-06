import moment from 'moment'
import 'moment/locale/vi';

export default function Rating({ review }) {
    return (
        <div className="card-body">
            <div className="d-flex flex-start mt-2">
                <img className="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp" alt="avatar" width="40"
                height="40" />
                <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="text-primary fw-bold mb-0">
                        {review.surname} {review.lastName}
                            <span className="text-body ms-2">{review.comment}</span>
                        </h6>
                        <p className="mb-0">{moment(review.created_at).fromNow() }</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-row">
                        <i className="fas fa-star text-warning me-2"></i>
                        <i className="fas fa-star text-warning me-2"></i>
                        <i className="fas fa-star text-warning me-2"></i>
                        <i className="fas fa-star text-warning me-2"></i>
                        <i className="fas fa-star text-warning me-2"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}