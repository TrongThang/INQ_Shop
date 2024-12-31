export default function SearchByPrice() {
    return (
        <div class="mb-4">
            <label class="form-label">Khoảng giá: <span id="priceRangeValue">0 - 100.000.000</span> VNĐ</label>
            <div class="slider-container position-relative">
                <input type="range" id="priceRangeMin" min="0" max="100" value="0" class="form-range thumb" />
                <input type="range" id="priceRangeMax" min="0" max="100" value="100" class="form-range thumb" />
            </div>
        </div>
    );
}