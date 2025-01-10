import { useState, useEffect } from "react";

export default function RecursiveDropdown() {
  const [categories, setCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]); // Mảng lưu trữ các mục cha đang hover

  // Fetch categories from API
  const fetchDataCategories = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/category");
      const result = await response.json();
      setCategories(result.data || []); // Fallback to an empty array if data is undefined
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchDataCategories();
  }, []);

  // Hàm xử lý khi hover vào mục cha
  const handleMouseEnter = (categoryId) => {
    setActiveCategories((prev) => [...prev, categoryId]); // Thêm ID vào mảng activeCategories
  };

  // Hàm xử lý khi rời khỏi mục cha
  const handleMouseLeave = (categoryId) => {
    setActiveCategories((prev) => prev.filter((id) => id !== categoryId)); // Loại bỏ ID khỏi mảng activeCategories
  };

  // Recursive function to render categories and subcategories
  const renderCategories = (categories, level = 0) => {
    return (
      <ul className={`dropdown-menu ${level > 0 ? "submenu" : ""}`}>
        {categories.map((category) => (
          <li
            key={category.id}
            className={category.children?.length > 0 ? "dropdown-submenu" : ""}
            onMouseEnter={() => handleMouseEnter(category.id)} // Hover vào mục cha
            onMouseLeave={() => handleMouseLeave(category.id)} // Rời khỏi mục cha
          >
            <a className="dropdown-item" href={`/${category.slug}`}>
              {category.nameCategory}
            </a>
            {category.children?.length > 0 &&
              activeCategories.includes(category.id) && ( // Hiển thị submenu nếu mục cha đang được hover
                <div className="submenu-container">
                  {renderCategories(category.children, level + 1)}
                </div>
              )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="nav-link dropdown">
          <span className="dropdown-toggle" data-bs-toggle="dropdown">
            Danh mục
          </span>
          {renderCategories(categories)}
        </div>
      </div>
    </nav>
  );
}