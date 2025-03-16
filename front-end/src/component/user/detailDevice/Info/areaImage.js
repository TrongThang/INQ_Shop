export default function AreaImage({image}) {
    
    return (
        <div className="col-xl-5 wow fadeInLeft mb-3 border border-dark" data-wow-delay="0.4s">
            <img
                src={`/img/device/${image}` || "https://placehold.co/600x400"} 
                style={{ height: "500px" }} 
                className="img-fluid w-100 py-3" 
                alt=""
            />
        </div>
    ); 
}