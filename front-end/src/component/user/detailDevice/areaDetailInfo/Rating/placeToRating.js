import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import StarRatingReview from './startRatingReview';

export default function PlaceToRating({ idDevice, onCommentSubmitted }) {
    const [review, setReview] = useState(null);
    const [star, setStar] = useState(0);
    const [isBuy, setIsBuy] = useState(false);
    const [edit, setEdit] = useState(false);
    const [idCustomer, setIdCustomer] = useState(null);
    const [changeComment, setChangeComment] = useState(false)
    const [isExistingReview, setIsExistingReview] = useState(false);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                const decoded = jwtDecode(token);
                setIdCustomer(decoded.idPerson);
            }
            
            const response = await axios.get(`http://localhost:8081/api/device/review/${idDevice}/${idCustomer}`)

            const responseOrder = await axios.get(`http://localhost:8081/api/order/checkOrder/${idCustomer}/${idDevice}`)
            
            const data = await response.data;
            
            setReview(data);
            setIsBuy(responseOrder.data)
            setStar(data.rating);
            setIsExistingReview(data != null)

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [idDevice, changeComment])

    const handleComment = (text) => {
        setReview(prevReview  => ({ ...review, comment: text }));
    }

    const handleRatingChange = (newRating) => {
        setStar(newRating);
    };

    const handleSubmitComment = async (type) => {
        try {
            const comment = {
                idCustomer: idCustomer,
                idDevice: idDevice,
                comment: review?.comment || '',
                rating: star
            }
            console.log('Data trước tạo:', comment)

            if (type === 'edit') {
                comment.idReview = review.idReview;
                const response = await axios.put('http://localhost:8081/api/device/review/', {
                    comment
                });
                if (response.status === 200) {
                    setEdit(false);
                    setChangeComment(!changeComment)
                    if (onCommentSubmitted) {
                        onCommentSubmitted();
                    }
                }
            } else if (type === 'create') {
                const response = await axios.post('http://localhost:8081/api/device/review/', {
                    comment
                });
                if (response.status === 200) {
                    setEdit(false);
                    setChangeComment(!changeComment)
                    if (onCommentSubmitted) {
                        onCommentSubmitted();
                    }
                }
            }
        } catch (error) {
            console.log('Lỗi khi gửi cập nhật đánh giá: ', error)
        }
    }

    return (
        <section>
            {isBuy
                ?
                    <>
                        <div className="mb-3">
                            <label className="form-label display-6">Đánh giá</label>
                            <div className="rating d-flex align-items-center">
                                <span>
                                <StarRatingReview
                                    rating={star}
                                    onRatingChange={handleRatingChange}
                                    isEdit={edit}
                                    isExistingReview={isExistingReview}
                                />
                                </span>
                            </div>
                        </div>
                        <div className="mb-3">
                        <textarea
                            id="comment"    
                            className={
                                `form-control border border-dark fs-6
                                    ${edit === false && (review?.comment && review?.rating)
                                    ? 'bg-secondary text-white'
                                    : 'text-dark'}
                                `
                            }
                            rows="4"
                            placeholder="Viết bình luận của bạn..."
                            value={`${review?.comment || ''}`}
                            onChange={(e) => handleComment(e.target.value)}
                            readOnly={edit === false && (review?.comment && review?.rating)}
                        ></textarea>
                    </div>
                    {
                        isExistingReview  
                            ? <>
                                {edit === true 
                                    ? 
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleSubmitComment('edit')}
                                    >
                                        Cập nhật
                                    </button>
                                    :
                                    <button
                                        className={`btn btn-warning`}
                                        onClick={() => {
                                            setEdit(true)
                                            const commentInput = document.getElementById("comment");

                                            if (commentInput) {
                                                commentInput.focus();
                                    
                                                const length = commentInput.value.length;
                                                commentInput.setSelectionRange(length, length);
                                            }
                                        }}
                                    >
                                        Chỉnh sửa
                                    </button>
                                }
                                
                                {edit === true && 
                                    <button className="ms-3 btn btn-outline-success text-dark" onClick={() => setEdit(false)}>
                                        Huỷ Chỉnh sửa
                                    </button>
                                }
                                
                            </>
                            : <>
                                <button className="btn btn-primary" onClick={() => {
                                    handleSubmitComment('create');
                                }}>
                                    Gửi
                                </button>
                            </>
                    }
                    </>
                :
                <h6 className='text-'>
                    Vui lòng mua sản phẩm để đánh giá!
                </h6>
            }
            
        </section>
    );
}