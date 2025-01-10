import React from 'react';

export default function StarRating({ rating, onRatingChange, isEdit, isExistingReview }) {

    const handleClick = (index) => {
        if (onRatingChange) {
            onRatingChange(index);
        }
    };

    // Định dạng rating để hiển thị
    const ratingFormat = parseFloat(parseFloat(rating).toFixed(1)) === 0 ? parseInt(0) : parseFloat(rating).toFixed(1);

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        let starClass = "far fa-star text-warning me-2"; 
        if (i <= Math.floor(rating)) {
            starClass = "fas fa-star text-warning me-2";
        }

        stars.push(
            <i
                key={i}
                className={starClass}
                onClick={() => {
                    if (isEdit === false && isExistingReview){
                        return
                    }
                    handleClick(i)
                }} // Xử lý sự kiện click
                style={{ cursor: 'pointer' }} // Thêm con trỏ chuột để biểu thị có thể nhấp
            />
        );
    }

    return (
        <div>
            {stars} ({parseInt(ratingFormat)}/5)
        </div>
    );
}