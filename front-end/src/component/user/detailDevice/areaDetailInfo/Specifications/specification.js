export default function Specifications({attribute, index}) {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button border-0" type="button" data-bs-toggle="collapse" data-bs-target={`#${attribute.idAttributeGroup}`} aria-expanded="true" aria-controls={attribute.idAttributeGroup}>
                    { attribute.nameGroup }
                </button>
            </h2>
            <div
                id={attribute.idAttributeGroup}
                className="collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body rounded">
                    <ul className="row">
                        {
                            attribute.attributes.map((item, index) => {
                                if (item.status >= 1) {
                                    return (
                                        <li key={index} className="col-6">
                                            <b>{item.nameAttribute}:</b> <span> {item.value} </span>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}