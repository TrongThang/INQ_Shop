import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Review = ({ idCustomer, reviews }) => {
  const [review, setReview] = useState([]);
  console.log('reviews:', reviews);
  const navigate = useNavigate();

  useEffect(() => {
    // Cập nhật state khi props devices thay đổi
    setReview(reviews);
  }, [reviews]);

  return (
    <div className="container-fluid">
      <h2 className="card-title mb-4">Thiết bị đã đánh giá</h2>
      <table className="table align-items-center">
        <thead>
          <tr>
            <th scope="col" className="text-center align-middle"></th>
            <th scope="col" className="text-center align-middle text-primary">Thiết bị</th>
            <th scope="col" className="text-center align-middle text-primary">Nội dung đánh giá</th>
            <th scope="col" className="text-center align-middle text-primary">Sao</th>
          </tr>
        </thead>
        <tbody>
          {review.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={`/img/device/${item.device.image}`} alt={item.device.name} className="img-fluid" style={{height: "100px", width: "100px"}}/>
              </td>
              <td className="text-center align-middle fs-6" onClick={() => navigate(`/device/${item.device.slug}`)}>{item.device.name}</td> 
              <td className="text-center align-middle fs-6">{item.comment}</td>
              <td className="text-center align-middle fs-6" style={{width: "55px"}}>{item.rating}<i class="fas fa-star text-warning me-2"></i></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
  
  export default Review;