import SearchByCategory from './searchByCategory';
import SearchByPrice from './searchByPrice';

export default function AreaSearch() {
    return (
        <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12 search-list">
            <SearchByCategory></SearchByCategory>
            <SearchByPrice></SearchByPrice>
        </div>
    );
}