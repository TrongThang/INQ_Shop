import React, { useEffect, useRef } from "react";
import BestSeelingDeivce from "../../component/user/Home/bestSellingDevice";
import Carousel from "../../component/user/Home/carousel";
import CategoryDevice from "../../component/user/Home/categoryDevice";
import FeaturedDevice from "../../component/user/Home/featuredDevice";
import NewDevice from "../../component/user/Home/newDevice";
import Services from "../../component/user/Home/services";
import DisCountDevice from "../../component/user/Home/discountDevice";

function HomePage() {
    const scrollToNew = useRef(null);
    const scrollToFeatured = useRef(null);
    const scrollToBestSelling = useRef(null);
    useEffect(() => {
        document.title = 'Trang chủ | INQ'
    }, []);

    return (
        <>
            <Carousel scrollToNew={() => scrollToNew.current.scrollIntoView({ behavior: "smooth" })}
                scrollToFeature={() => scrollToFeatured.current.scrollIntoView({ behavior: "smooth" })}
                scrollToBestSelling={() => scrollToBestSelling.current.scrollIntoView({ behavior: "smooth" })}
            />
            <CategoryDevice />
            <FeaturedDevice ref={scrollToFeatured} />
            <BestSeelingDeivce ref={scrollToBestSelling} />
            <NewDevice ref={scrollToNew} />
            <DisCountDevice />
        </>
    )
}
export default HomePage;