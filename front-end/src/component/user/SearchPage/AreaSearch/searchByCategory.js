import { useEffect, useState } from "react";

export default function SearchByCategory({ searchResult }) {
    const [categories, setCategories] = useState([]);

    const handleCheckCategory = (categoryId, isChecked) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.id === categoryId
                    ? { ...category, checked: isChecked }
                    : category
            )
        );
    };
    // Lọc danh mục duy nhất từ searchResult
    useEffect(() => {
        const uniqueCategories = [];
        const categoryIds = new Set(); // Sử dụng Set để lưu trữ các ID duy nhất

        searchResult.forEach((item) => {
            if (!categoryIds.has(item.categoryDevice.id)) {
                categoryIds.add(item.categoryDevice.id);
                uniqueCategories.push({
                    id: item.categoryDevice.id,
                    name: item.categoryDevice.nameCategory,
                    checked: false,
                });
            }
        });

        setCategories(uniqueCategories);
    }, [searchResult]);

    return (
        <div className="product-sidebar">
            <div className="product-sidebar-widget">
                <h5 className="product-sidebar-widget-title">Danh mục</h5>
                <ul className="list-group">
                    {categories.map((category) => (
                        <li key={category.id} classNameName="list-group-item">
                            <input
                                type="checkbox"
                                classNameName="custom-control-input"
                                value={category.id}
                                id={`cat-${category.id}`}
                                onChange={(e) => handleCheckCategory(category.id, e.target.checked)}
                            />
                            <label
                                classNameName="text-primary custom-control-label ms-2 fw-bold"
                                htmlFor={`cat-${category.id}`}
                            >
                                {category.name}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}