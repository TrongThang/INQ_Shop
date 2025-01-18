import Rating from "./rating";

export default function ListRating({ reviews }) {
    return (
        <section>
            <div className="container my-3 py-5 text-body">
                <div className="row d-flex justify-content-center">
                    <h4 className="text-dark mb-0 mt-2">Bình luận ({reviews.length})</h4>
                    <div className="card mb-3 border border-primary rounded">
                        {
                            reviews.map((review, index) => (
                                <Rating key={index} review={review}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}