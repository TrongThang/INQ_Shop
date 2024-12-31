import Rating from "./rating";

export default function ListRating() {
    return (
        <section>
            <div className="container my-5 py-5 text-body">
                <div className="row d-flex justify-content-center">
                    <h4 className="text-dark mb-0 mt-2">Bình luận (4)</h4>
                    <div className="card mb-3 border border-primary rounded">
                        <Rating />
                        <Rating />
                        <Rating />
                        <Rating />
                    </div>
                </div>
            </div>
        </section>
    );
}