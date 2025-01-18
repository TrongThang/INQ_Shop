import { useEffect, useState } from "react";

export default function SearchByPrice({onPriceChange }) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000000);

    useEffect(() => {
        onPriceChange(minPrice, maxPrice);
    }, [minPrice, maxPrice])

    const handlePriceChange = (value, isMin) => {
        if (!isNaN(value) && isMin) {
            setMinPrice(Number(value))
        }
        else if(!isNaN(value) && value <= 100000000) {
            setMaxPrice(Number(value))
        }
    };

    
    return (
        <div>
            <div className="position-relative mt-5">
                <label className="text-nowrap">
                    Khoảng:
                    <span id="priceRangeValue" className="fw-bold">{minPrice} - {(maxPrice).toLocaleString()} VNĐ</span>
                </label>
                <input
                    type="text" id="priceRangeMin"
                    value={minPrice} onChange={(e) => handlePriceChange(e.target.value, true)}
                />
                <div>
                    -
                </div>
                <input
                    type="text" id="priceRangeMax"
                    value={maxPrice} onChange={(e) => handlePriceChange(e.target.value, false)}
                />
            </div>
        </div>
    );
}