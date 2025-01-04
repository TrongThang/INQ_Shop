import {useState} from 'react';
export default function AreaInteraction({ setQuantity }) {
    const [count, setCount] = useState(1);
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
        <div class="input-group w-50 mb-3 mt-5">
            <h5>Số lượng:</h5>
            <div class="d-flex align-items-center">
                <button
                    class="btn btn-outline-primary"
                    type="button"
                    onClick={() => handleMinus()}
                >
                    <i class="fas fa-minus"></i>
                </button>
                <input 
                    type="text" 
                    class="form-control text-center text-dark fw-bold mx-2 border border-dark" 
                    aria-label="Example text with button addon" 
                    aria-describedby="button-addon1" 
                    value={count}
                    onChange={(e) => handleInput(Number(e.target.value))}
                />
                <button
                    class="btn btn-outline-primary"
                    type="button"
                    onClick={() => setCount(count => count + 1)}
                >
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>  
    );
}