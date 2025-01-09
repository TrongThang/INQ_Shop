import {useState} from 'react';
import { useCart } from '../../../../context/CartContext';
export default function AreaInteraction({ setQuantity }) {
    const [count, setCount] = useState(1);
    const { addToCart } = useCart();
    const handleMinus = () => {
        setCount((prevCount) => Math.max(prevCount - 1, 1));

        setQuantity(count - 1);
    }

    const handleInput = (value) => {
        const numericValue = parseInt(value);
        
        // Kiểm tra nếu numericValue là số hợp lệ và lớn hơn 0
        if (!isNaN(numericValue) && numericValue > 0) {
            setCount(numericValue);
            setQuantity(numericValue);
        }
    }

    return (
        <div className="input-group w-50 mb-3 mt-5">
            <h5>Số lượng:</h5>
            <div className="d-flex align-items-center">
                <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => handleMinus()}
                >
                    <i className="fas fa-minus"></i>
                </button>
                <input 
                    type="text" 
                    className="form-control text-center text-dark fw-bold mx-2 border border-dark" 
                    aria-label="Example text with button addon" 
                    aria-describedby="button-addon1" 
                    value={count}
                    onChange={(e) => handleInput(Number(e.target.value))}
                />
                <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => setCount(count => count + 1)}
                >
                    <i className="fas fa-plus"></i>
                </button>
            </div>
        </div>  
    );
}