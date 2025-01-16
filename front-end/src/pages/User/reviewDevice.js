import Review from '../../component/user/Review/review';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProfileSidebar from "../../component/user/Profile/navCustomer/profileSidebar";

export default function ReviewDevice() {
    const [reviews, setReviews] = useState([]);

    const [idCustomer, setIdCustomer] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = jwtDecode(token); // Decode the JWT token
            setIdCustomer(decoded.idPerson); // Set idCustomer from decoded token
        }
    }, []);

    const fetchDataReview = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/review/${idCustomer}`);
            const result = await response.json();
            setReviews(result.data);
            console.log("result data: ", result.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        if (idCustomer) {
            fetchDataReview();
        }
    }, [idCustomer]);
    return (
        <div className="container-fluid my-4">
            <div className="row ms-4 ">
                <ProfileSidebar />
                <div className="col-md-9 col-xl-9">
                    <Review idCustomer={idCustomer} reviews={reviews}/>
                </div>
            </div>
        </div>
    );
}