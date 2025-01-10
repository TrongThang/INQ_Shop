import SearchByCategory from './searchByCategory';
import SearchByPrice from './searchByPrice';

export default function AreaSearch({ searchResult, dataToShow, setDataToShow, onCategoryChange, onPriceChange }) {
    
    return (
        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 search-list ms-3">
            <SearchByCategory dataToShow={ dataToShow } onCategoryChange={onCategoryChange} searchResult={searchResult} />
            <SearchByPrice onPriceChange={ onPriceChange} />
            <div className="product-sidebar-widget mt-4">
                <button className="btn btn-outline-primary">
                    Thiết lập lại
                </button>
            </div>
        </div>
    );
}