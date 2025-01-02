export default function SearchHeader() {
    return (
        <form class="d-flex ms-lg-4 me-5">
            <input 
                class="form-control me-2 " 
                type="search" 
                placeholder="Tìm kiếm..." 
                aria-label="Search"
            />
            <button class="btn btn-outline-primary" type="submit">
                <i class="fa-solid fa-search"></i>
            </button>
        </form>
    )
}