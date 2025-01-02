import ListLiked from '../../component/user/Liked/ListLiked';

export default function Liked() {
    const products = [
        {
          image: "https://placehold.co/150x150/png",
          name: "Camera thông minh, lắp ở đâu cũng được, 2.4V",
          price: "1.992.004đ",
        },
        {
          image: "https://placehold.co/150x150/png",
          name: "Camera thông minh, lắp ở đâu cũng được, 2.4V",
          price: "1.992.004đ",
        },
        {
          image: "https://placehold.co/150x150/png",
          name: "Camera thông minh, lắp ở đâu cũng được, 2.4V",
          price: "1.992.004đ",
        },
      ];
    
    return (
        <ListLiked products={products}/>
    );
}