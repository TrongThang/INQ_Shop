import React from 'react';

const CategoryDevice = () => {
  return (
    <div className="container py-5">
      <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
        <h1 className="display-4 fw-bold">Danh Mục Sản phẩm</h1>
      </div>
      <div className="row justify-content-center">
        <div className="position-relative">
          <section className="col-xl-12 col-md-4 row d-flex justify-content-center">
            {/* Đèn thông minh */}
            <a className="col-2 text-center d-flex flex-column align-items-center">
              <img
                src="https://placehold.co/100x100"
                className="card-img-top product-img rounded-circle mb-2 w-75"
                alt="Đèn thông minh"
              />
              <h6 className="h4 mb-2">Đèn thông minh</h6>
            </a>
            {/* An ninh gia đình */}
            <a className="col-2 text-center d-flex flex-column align-items-center">
              <img
                src="https://placehold.co/100x100"
                className="card-img-top product-img rounded-circle mb-2 w-75"
                alt="An ninh gia đình"
              />
              <h6 className="h4 mb-2">An ninh gia đình</h6>
            </a>
            {/* Nhiệt kế thông minh */}
            <a className="col-2 text-center d-flex flex-column align-items-center">
              <img
                src="https://placehold.co/100x100"
                className="card-img-top product-img rounded-circle mb-2 w-75"
                alt="Nhiệt kế thông minh"
              />
              <h6 className="h4 mb-2">Nhiệt kế thông minh</h6>
            </a>
            {/* Trợ lý ảo */}
            <a className="col-2 text-center d-flex flex-column align-items-center">
              <img
                src="https://placehold.co/100x100"
                className="card-img-top product-img rounded-circle mb-2 w-75"
                alt="Trợ lý ảo"
              />
              <h6 className="h4 mb-2">Trợ lý ảo</h6>
            </a>
            {/* Ổ cắm thông minh */}
            <a className="col-2 text-center d-flex flex-column align-items-center">
              <img
                src="https://placehold.co/100x100"
                className="card-img-top product-img rounded-circle mb-2 w-75"
                alt="Ổ cắm thông minh"
              />
              <h6 className="h4 mb-2">Ổ cắm thông minh</h6>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CategoryDevice;
