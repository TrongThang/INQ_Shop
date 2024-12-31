import Specifications from "./specification";

export default function ListSpecifications() {
    return (
        <div class="tab-pane fade" id="specifications" role="tabpanel" aria-labelledby="specifications-tab">
            <div class="col-xl-10 wow fadeInRight mt-5" data-wow-delay="0.2s">
                <div class="h-100">
                    <div class="accordion" id="accordionExample">
                        <Specifications />
                        <Specifications />
                        <Specifications />
                        <Specifications />
                    </div>
                </div>
            </div>
        </div>
    );
}