import moment from 'moment';

export default function CardData({ title, data, period, growValue, icon, type = "" }) {
    let timeInfo = null;

    if (period === "day") {
        timeInfo = `${moment().diff(moment().startOf('day'), 'hours')} H`;
    } else if (period === "month") {
        const daysPassed = moment().date(); 
        const hourPassed = `${moment().diff(moment().startOf('day'), 'hours')} H`;

        timeInfo = `${daysPassed} Ngày ${hourPassed}`;
    } else if (period === "year") {
        const monthsPassed = moment().month() + 1; 
        const daysPassed = moment().date(); 

        timeInfo = `${monthsPassed} Tháng ${daysPassed} Ngày`;
    } else {
        timeInfo = "24 H"; // Giá trị mặc định
    }

    return (
        <div className="col-md-3 border border-dark p-0 me-3 text-nowrap">
            <div className="single-report ">
                <div className="s-report-inner pr--20 pt--30">
                    <div className="icon ms-1">
                        <i className={icon}></i>
                    </div>
                    <div className="s-report-title d-flex justify-content-between">
                    <h4 className="header-title mb-0"># { title }</h4>
                        <p> { timeInfo }</p>
                    </div>
                    <div className="d-flex justify-content-between pb-2">
                        <h2>
                            {type === "money" ? `${data?.toLocaleString()} VNĐ` : data}
                        </h2>
                        <div class="d-inline-block float-right font-weight-bold">
                            <span class={`text-${growValue > 0 ? 'success' : 'danger'}`}>
                            <i class={`fa fa-fw fa-arrow-${growValue > 0 ? 'up' : 'down'}`}></i>
                            </span>
                        
                            <span class={`ml-1 text-${growValue > 0 ? 'success' : 'danger'}`}>{
                                Number(growValue).toFixed(1)} %
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}