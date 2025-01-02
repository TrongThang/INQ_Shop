import MetricCard from "./metricCard";

export default function AreaMetricCard() {
    return (
        <div className="row">
            <div className="sales-report-area mt-5 mb-5">
                <div className="row">
                    <MetricCard />
                    <MetricCard />
                    <MetricCard />
                </div>
                <div className="col-xl-12 col-ml-12 col-lg-12 mt-5">
                    <div className="card">
                        <div className="card-body">
                            <div id="salesanalytic"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}