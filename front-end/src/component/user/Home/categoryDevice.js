import React, { useEffect, useState } from "react";

const CategoryDevice = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataCategories = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/category/take-five');
      const result = await response.json();
      console.log(result.data)

      setCategories(result.data);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchDataCategories()
  }, []);



  return (
    <div className="container py-5">
      <div className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
        <h1 className="display-4 fw-bold">Danh Mục Sản phẩm</h1>
      </div>
      <div className="row justify-content-center">
        <div className="position-relative">
          <section className="col-xl-12 col-md-4 row d-flex justify-content-center">
            {categories.map((category) => (
              <a
                key={category.id}
                className="col-2 text-center d-flex flex-column align-items-center"
                href={`/category/${category.slug}`}
              >
                <img
                  src="https://placehold.co/100x100" // Hiển thị ảnh mặc định nếu không có ảnh
                  className="card-img-top product-img rounded-circle mb-2 w-75"
                  alt={category.nameCategory}
                />
                <h6 className="h4 mb-2">{category.nameCategory}</h6>
              </a>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CategoryDevice;
