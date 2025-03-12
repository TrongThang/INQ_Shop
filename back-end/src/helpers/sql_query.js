const { Op } = require('sequelize');
const math = require('mathjs');
const { get_error_response } = require('../helpers/response')
function buildWhereQuery(filter, table = null) {
    let filterObj;
    try {
        filterObj = JSON.parse(filter);
    } catch (e) {
        throw new Error('Invalid filter JSON');
    }

    const sqlConditions = [];
    if (filterObj.length > 0) {
        filterObj.forEach(item => {
            let { field, condition, value } = item;

            if (table === 'san_pham' && field === 'ten') {
                field = `${table}.ten`;
            }

            const fieldsWithTen = [
                'loai_san_pham',
                'don_vi_tinh',
                'loai_giam_gia',
                'thoi_gian_bao_hanh',
                'nha_phan_phoi',
                'kho',
                'chuc_vu'
            ];
            if (fieldsWithTen.includes(field)) {
                field = `${field}.ten`;
            }

            switch (condition) {
                case 'contains':
                    if (value) {
                        sqlConditions.push(`(${field} IS NOT NULL AND ${field} LIKE '%${value}%')`);
                    } else {
                        sqlConditions.push(`(${field} LIKE '%%' OR ${field} IS NULL)`);
                    }
                    break;
                case 'notcontains':
                    if (value) {
                        sqlConditions.push(`(${field} IS NOT NULL AND ${field} NOT LIKE '%${value}%')`);
                    } else {
                        sqlConditions.push(`(${field} NOT LIKE '%%')`);
                    }
                    break;
                case 'startswith':
                    if (value) {
                        sqlConditions.push(`(${field} IS NOT NULL AND ${field} LIKE '${value}%')`);
                    } else {
                        sqlConditions.push(`(${field} LIKE '%%' OR ${field} IS NULL)`);
                    }
                    break;
                case 'endswith':
                    if (value) {
                        sqlConditions.push(`(${field} IS NOT NULL AND ${field} LIKE '%${value}')`);
                    } else {
                        sqlConditions.push(`(${field} LIKE '%%' OR ${field} IS NULL)`);
                    }
                    break;
                case '=':
                    sqlConditions.push(`${field} = '${value}'`);
                    break;
                case '<>':
                    sqlConditions.push(`${field} <> '${value}'`);
                    break;
                case '<':
                    sqlConditions.push(`${field} < ${value === '' ? 0 : value}`);
                    break;
                case '>':
                    sqlConditions.push(`${field} > ${value === '' ? 0 : value}`);
                    break;
                case '<=':
                    sqlConditions.push(`${field} <= ${value === '' ? 0 : value}`);
                    break;
                case '>=':
                    sqlConditions.push(`${field} >= ${value === '' ? 0 : value}`);
                    break;
            }
        });
    }

    return sqlConditions.length > 0 
        ? `WHERE ${sqlConditions.join(' AND ')} AND ${table}.deleted_at IS NULL`
        : `WHERE ${table}.deleted_at IS NULL`;
}

async function executeSelectData({
    table,
    strGetColumn,
    filter = null,
    limit = null,
    page = null,
    sort = null,
    order = null,
    queryJoin = null
}) {
    // Xây dựng WHERE clause
    const buildWhere = filter ? buildWhereQuery(filter, table) : `WHERE ${table}.deleted_at IS NULL`;

    // Xử lý limit, page và offset
    const parsedLimit = limit ? parseInt(limit) : null;
    const parsedPage = page ? parseInt(page) : null;
    const skip = parsedLimit && parsedPage ? parsedLimit * (parsedPage - 1) : 0;

    // Xử lý ORDER BY
    const optOrder = order ? order.toUpperCase() : '';
    const buildSort = sort ? `ORDER BY ${table}.${sort} ${optOrder}` : '';
    const buildLimit = parsedLimit ? `LIMIT ${parsedLimit}` : '';
    const buildOffset = skip ? `OFFSET ${skip}` : '';

    // Xử lý các cột thời gian
    const queryGetTime = `${table}.created_at as CreatedAt, ${table}.updated_at as UpdatedAt, ${table}.deleted_at as DeletedAt`;

    // Xây dựng câu SQL chính
    const query = `
        SELECT ${queryJoin ? `${table}.` : ''}id as ID, ${strGetColumn}, ${queryGetTime}
        FROM ${table}
        ${queryJoin || ''}
        ${buildWhere}
        ${buildSort}
        ${buildLimit}
        ${buildOffset}
    `.trim();

    // Xây dựng câu SQL đếm tổng
    const totalCountQuery = `
        SELECT COUNT(*) AS total 
        FROM ${table}
        ${queryJoin || ''} 
        ${buildWhere}
    `.trim();

    console.log('query:', query);
    console.log('totalCountQuery:', totalCountQuery);

    const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
    
    const total_result = await sequelize.query(totalCountQuery, { type: Sequelize.QueryTypes.SELECT });
    const total_count = total_result[0].total;
    const total_page = Math.ceil(total_count / limit);

    const responseData = { data, total_page: total_page };

    return { query, totalCountQuery };
}

async function check_reference_existence(model, column_name, value, error_code) {
    const record = await model.findOne({
        where: {
            [column_name]: value,
            deletedAt: null 
        }
    });

    if (record) {
        return {
            status: 401,
            error: get_error_response(error_code = error_code, status_code = 406)
        };
    }
    
    return null;
};

module.exports = {
    executeSelectData,
    check_reference_existence
}