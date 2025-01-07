import Specifications from "./specification";

export default function ListSpecifications({ attributes = [] }) {
    console.log('ListSpecifications: ', attributes)
    
    return (
        <div class="tab-pane fade" id="specifications" role="tabpanel" aria-labelledby="specifications-tab">
            <div class="col-xl-10 wow fadeInRight mt-5" data-wow-delay="0.2s">
                <div class="h-100">
                    <div class="accordion" id="accordionExample">
                        {attributes.map((attribute, index) => (
                            <Specifications key={index} attribute={attribute} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}