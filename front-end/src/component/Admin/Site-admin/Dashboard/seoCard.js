export default function SEOCard({color, icon}) {
    return (
        <div class="col-md-6 mt-5 mb-3">
            <div class="card">
                <div class={"seo-fact " + color}>
                    <div class="p-4 d-flex justify-content-between align-items-center">
                        <div class="seofct-icon"><i class="fa fa-heart"></i> Yêu thích sản phẩm</div>
                        <h2>2,315</h2>
                    </div>
                    <canvas id="seolinechart1" height="50"></canvas>
                </div>
            </div>
        </div>
    )
}