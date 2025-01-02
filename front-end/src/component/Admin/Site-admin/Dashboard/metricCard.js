export default function MetricCard() {
    return ( 
        <div className="col-md-4">
            <div className="single-report mb-xs-30">
                <div className="s-report-inner pr--20 pt--30 mb-3">
                    <div className="icon">
                        <i className="fa-solid fa-basket-shopping"></i>
                    </div>
                    <div className="s-report-title d-flex justify-content-between">
                        <h4 className="header-title mb-0"># Sản phẩm</h4>
                        <p>24 H</p>
                    </div>
                    <div className="d-flex justify-content-between pb-2">
                        <h2>10.000</h2>
                        <div className="d-inline-block float-right text-success font-weight-bold">
                            <span className="text-success">
                                <i className="fa fa-fw fa-arrow-up"></i>
                            </span>
                            <span className="ml-1 text-success">25%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}