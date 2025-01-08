export default function SearchByPrice() {
    return (
        <div >
            <div class="slider-container position-relative mt-5">
                <label>Khoảng giá: <span id="priceRangeValue" class="fw-bold">0 - 100.000.000</span></label>
                <input type="range" id="priceRangeMin" min="0" max="100" value="0" class="form-range thumb" />
                <input type="range" id="priceRangeMax" min="0" max="100" value="100" class="form-range thumb" />
            </div>
        </div>
    );
}