import Specifications from "./specification";

export default function ListSpecifications({ attributes = [] }) {
    console.log('ListSpecifications: ', attributes)
    
    return (
        <div className="tab-pane fade" id="specifications" role="tabpanel" aria-labelledby="specifications-tab">
            <div className="col-xl-10 wow fadeInRight mt-5" data-wow-delay="0.2s">
                <div className="h-100">
                    <div className="accordion" id="accordionExample">
                        {attributes.map((attribute, index) => (
                            <Specifications key={index} attribute={attribute} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}