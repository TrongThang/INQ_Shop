export default function StarRating ({ rating }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
        // Hiển thị sao đầy
        stars.push(<i key={i} className="fas fa-star text-warning me-2"></i>);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        // Hiển thị sao nửa
        stars.push(<i key={i} className="fas fa-star-half-alt text-warning me-2"></i>);
    } else {
        // Hiển thị sao trống
        stars.push(<i key={i} className="far fa-star text-warning me-2"></i>);
    }
    }

    return <div>{stars}</div>;
};