export default function OverviewDevice({device}) {
    return (
        <div className="tab-pane fade show active"
            id="overview" role="tabpanel" a
            ria-labelledby="overview-tab"
        >
            <section
                className="product-overview"
                dangerouslySetInnerHTML={{ __html: device.description }}>
            </section>
        </div>
    );
}