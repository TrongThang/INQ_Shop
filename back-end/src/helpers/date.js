const { FORMAT } = require('../docs/format_contants')

function format_date(str_date, format) {
    date = new Date(str_date)
    day = date.getDay()
    month = date.getMonth()
    year = date.getFullYear()

    switch (format) {
        case FORMAT.YYYYMMDD:
            return `${year}${month}${day}`
    
        default:
            break;
    }
}

module.exports = {
    format_date
}