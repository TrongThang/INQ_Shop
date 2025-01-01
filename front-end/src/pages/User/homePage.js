import BestSeelingDeivce from "../../component/user/Home/bestSellingDevice";
import Carousel from "../../component/user/Home/carousel";
import CategoryDevice from "../../component/user/Home/categoryDevice";
import FeaturedDevice from "../../component/user/Home/featuredDevice";
import NewDevice from "../../component/user/Home/newDevice";
import Services from "../../component/user/Home/services";

function HomePage() {
    return (
        <>
            <Carousel />
            <CategoryDevice />
            <FeaturedDevice />
            <BestSeelingDeivce />
            <NewDevice />
            <Services />
        </>
    )
}
export default HomePage;