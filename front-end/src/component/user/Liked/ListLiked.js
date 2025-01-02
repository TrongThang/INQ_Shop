const ListLiked = ({ products }) => {
    return (
      <div className="container-fluid">
        <h2>Sản phẩm yêu thích</h2>
        <table className="table align-items-center">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Sản phẩm</th>
              <th scope="col"></th>
              <th scope="col">Giá</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <th scope="row" className="align-middle">
                  <input type="checkbox" name={`checkbox-${index}`} />
                </th>
                <td>
                  <img src={product.image} alt={product.name} className="img-fluid" />
                </td>
                <td className="text-center align-middle">{product.name}</td>
                <td className="text-center align-middle">{product.price}</td>
                <td className="text-center align-middle">
                  <button className="btn btn-outline-danger">
                    Thêm vào giỏ hàng
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ListLiked;