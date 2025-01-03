import SearchByCategory from './searchByCategory';
import SearchByPrice from './searchByPrice';

export default function AreaSearch({searchResult}) {
    return (
        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 search-list ms-3">
            <SearchByCategory searchResult={searchResult } />
            <SearchByPrice />
            <div className="product-sidebar-widget mt-4">
                <a href="#" className="btn btn-outline-primary"> Thiết lập lại</a>
            </div>
        </div>
    );
}