export default function SearchByCategory() {
    return (
        <div class="product-sidebar">
            <div class="product-sidebar-widget">
                <h5 class="product-sidebar-widget-title">Danh mục</h5>
                <ul class="list-group">
                    <li class="list-group-item">
                        <input type="checkbox" class="custom-control-input" id="cat-1" />
                        <label class="custom-control-label" for="cat-1">Categories #1</label>
                    </li>
                    <li class="list-group-item">
                        <input type="checkbox" class="custom-control-input" id="cat-2" />
                        <label class="custom-control-label" for="cat-2">Categories #2</label>
                    </li>
                </ul>
            </div>
        </div>
    );
}