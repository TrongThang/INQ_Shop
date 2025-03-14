import SpecificationsAdmin from "./specificationAdmin";

export default function ListSpecificationsAdmin ({ attributes = [] }) {
    console.log(attributes)
    return (
        <div className="tab-pane" id="specifications" role="tabpanel" aria-labelledby="specifications-tab">
            <div className="col-xl-10 wow fadeInRight mt-5" data-wow-delay="0.2s">
                <div className="h-100">
                    <div className="accordion" id="accordionExample">
                            {attributes.length > 0
                                ?   attributes.map((attribute, index) => (
                                        <SpecificationsAdmin key={index} attribute={attribute} index={index} />
                                    ))
                            : <h3>
                                Thông tin kỹ thuật về sản phẩm này chưa được cập nhật, vui lòng liên hệ công ty để biết thông tin chi tiết của sản phẩm
                            </h3>
                            }
                    </div>
                </div>
            </div>
        </div>
    );
}