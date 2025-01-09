export default function AreaImage({image}) {
    
    return (
        <div className="col-xl-5 wow fadeInLeft mb-3 border border-dark" data-wow-delay="0.4s">
            <img src={`/img/device/${image}` || "https://placehold.co/600x400"} className="img-fluid w-100 py-3" alt=""/>
            {/* <div className="thumbnail-row d-flex justify-content-start">
                {imagesDevice.map(image => (<img src={image} className="img-fluid p-1" alt="Thumbnail" />))}
            </div> */}
        </div>
    ); 
}