export default function SEOCard({color, icon}) {
    return (
        <div className="col-md-6 mt-5 mb-3">
            <div className="card">
                <div className={"seo-fact " + color}>
                    <div className="p-4 d-flex justify-content-between align-items-center">
                        <div className="seofct-icon"><i className="fa fa-heart"></i> Yêu thích sản phẩm</div>
                        <h2>2,315</h2>
                    </div>
                    <canvas id="seolinechart1" height="50"></canvas>
                </div>
            </div>
        </div>
    )
}