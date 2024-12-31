export default function AreaImage({ imagesDevice }) {
    imagesDevice = imagesDevice ?? [
        "https://placehold.co/75x75",
        "https://placehold.co/75x75",
        "https://placehold.co/75x75",
    ];
    
    return (
        <div className="col-xl-5 wow fadeInLeft mb-3" data-wow-delay="0.4s">
            <img src="https://placehold.co/600x400" className="img-fluid w-100 py-3" alt=""/>
            <div className="thumbnail-row d-flex justify-content-start">
                {imagesDevice.map(image => (<img src={image} className="img-fluid p-1" alt="Thumbnail" />))}
            </div>
        </div>
    ); 
}