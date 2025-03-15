const sequelize = require("../config/database")
const { ERROR_CODES } = require("../docs/contants")
const { default: get_error_response } = require("../helpers/response")
const { executeSelectData, check_reference_existence } = require("../helpers/sql_query")
const { isExistId, validate_name, validate_number } = require("../helpers/validate")
const Warehouse = require("../models/Warehouse")
const ImportWarehouse = require("../models/ImportWarehouse")
const {
    ImportWarehouseCreateRequest, ImportWarehouseUpdateRequest, ImportWarehouseDeleteRequest 
} = require('../requests/warehouse')

const get_import_warehouse = (filters = null, limit = null, page = null, order = null, sort = null) => {
    get_table = 'import_warehouse'

    get_attr =
    `import_number, import_id, import_date,
    supplier.name AS supplier, employee.name AS employee, warehouse.name AS warehouse, 
    file_authenticate, total_money, prepaid, remaining, note
    `

    query_join = `
        LEFT JOIN supplier ON supplier.id = import_warehouse.supplier_id
        LEFT JOIN employee ON supplier.id = import_warehouse.supplier_id
        LEFT JOIN warehouse ON supplier.id = import_warehouse.supplier_id
    `
    
    result = executeSelectData({ table: get_table, strGetColumn: get_attr,filters: filters, limit: limit, page: page, order: order, sort: sort, queryJoin: query_join})

    return result
} 

const post_import_warehouse = async (importWarehouseCreateRequest) => {
    const transaction = await sequelize.transaction();

    try {
        let error = null;

        if (!await isExistId(id = importWarehouseCreateRequest.supplier_id)) {
            return get_error_response(ERROR_CODES.SUPPLIER.NOT_FOUND, 406)
        }

        if (!await isExistId(id = importWarehouseCreateRequest.employee_id)) {
            return get_error_response(ERROR_CODES.EMPLOYEE.NOT_FOUND, 406)
        }

        if (!await isExistId(id = importWarehouseCreateRequest.warehouse_id)) {
            return get_error_response(ERROR_CODES.WAREHOUSE.NOT_FOUND, 406)
        }
        
        // TO DO
        // CHECK FILE - SIZE, EXTENSION, MULTIPLE OR ONE

        // CHECK DATE - import_date
        // END TO DO
        
        const total_money = importWarehouseCreateRequest.total_money
        const prepaid = importWarehouseCreateRequest.prepaid

        error = validate_number(number = total_money);
        if (error) {
            await transaction.rollback();
            return error;
        }

        error = validate_number(number = importWarehouseCreateRequest.prepaid, end = total_money);
        if (error) {
            await transaction.rollback();
            return error;
        }
        

        const new_import_invoce = await Warehouse.create(...importWarehouseCreateRequest, { transaction });

        let total_amount = 0
        for (detail_import in importWarehouseCreateRequest) {
            let result = await add_detail_import_warehouse(import_invoice_id = new_import_invoce.id, detail_import = detail_import)
            
            total_amount += result
        }
        await transaction.commit();
        return get_error_response(ERROR_CODES.IMPORT_WAREHOUSE.SUCCESS);
    } catch (error) {
        await transaction.rollback();
        return get_error_response(ERROR_CODES.IMPORT_WAREHOUSE.CREATE_FAILED, status_code = 406);
    }
}

const add_detail_import_warehouse = async (import_invoice, detail_import) => {
    const transaction = await sequelize.transaction();
    try {
        // {device_id, import_price, sale_price, discount, amount}
        if (!await isExistId(id = detail_import.device_id, model = DetailImport)) {
            return get_error_response(ERROR_CODES.DETAIL_IMPORT.NOT_FOUND)
        }

        error = check_detail_import(detail_import = detail_import)
        if (error) return error
        
        let amount = detail_import.import_price * detail_import.quantity * (1 - round(detail_import.discount / 100))
        
        if (amount !== detail_import.amount)
            return get_error_response(ERROR_CODES.DETAIL_IMPORT.AMOUNT_INVALID)

        if (detail_import.is_gift) {
            // detail_import.import_price = 0 
            // detail_import.sale_price = 0 
            // detail_import.discount = 0 
            // detail_import.amount = 0 

            check_is_gift = detail_import.import_price === 0 && detail_import.sale_price === 0 && detail_import.discount === 0 && detail_import.amount === 0;

            if (!check_is_gift) return get_error_response(ERROR_CODES.DETAIL_IMPORT.NOT_GIFT)
        }

        const new_detail_import = await DetailImport.create(
            { ...detail_import, import_id: import_invoice },
            { transaction })

        await transaction.commit();
        return new_detail_import.amount
    } catch (error) {
        await transaction.rollback();
        return get_error_response(ERROR_CODES.IMPORT_WAREHOUSE.CREATE_FAILED, status_code = 406);
    }
}

// const put_import_warehouse = async (importWarehouseUpdate) => {
//     const transaction  = await sequelize.transaction();
//     try {
//         import_invoice = ImportWarehouse.findByPk(importWarehouseUpdate.id)

//         if (!import_invoice) return get_error_response(ERROR_CODES.IMPORT_WAREHOUSE.NOT_FOUND)

//         if (!await isExistId(id = importWarehouseCreateRequest.supplier_id)) {
//             return get_error_response(ERROR_CODES.SUPPLIER.NOT_FOUND, 406)
//         }

//         if (!await isExistId(id = importWarehouseCreateRequest.employee_id)) {
//             return get_error_response(ERROR_CODES.EMPLOYEE.NOT_FOUND, 406)
//         }

//         if (!await isExistId(id = importWarehouseCreateRequest.warehouse_id)) {
//             return get_error_response(ERROR_CODES.WAREHOUSE.NOT_FOUND, 406)
//         }

//         let error = check_detail_import(detail_import)
//         if (error) return error

//         total_amount = 0
//         for (detail_import in importWarehouseUpdate.list_detailImport) {
//             // if (detail_import.)
//             let result = add_detail_import_warehouse(import_invoice = importWarehouseUpdate.id, detail_import = detail_import)
            
//             total_amount = total_amount + result
//         }

        
//     } catch (error) {
//         await transaction.rollback();
//         return get_error_response(ERROR_CODES.IMPORT_WAREHOUSE.UPDATED_FAILED, status_code = 406);
//     }
// }

function check_detail_import(detail_import) {
    let error = validate_number(number = detail_import.quantity, start = 1, end = 100)
    if (error) return error

    error = validate_number(number = detail_import.import_price)
    if (error) return error

    error = validate_number(number = detail_import.sale_price)
    if (error) return error
    
    error = validate_number(number = detail_import.discount, end = 100)
    if (error) return error

    error = validate_number(number = detail_import.amount)
    if (error) return error

    return null
}

async function get_counter_detail_product_in_day (import_date, device_id) {
    query = `SELECT count(*) 
            FROM import_warehouse
            LEFT JOIN 
                detail_import ON detail_import.import_id = import_warehouse.id
            WHERE DATE(import_date) = :import_date
                AND detail_import.device_id = :device_id
            FOR UPDATE
            `
    const [data] = await sequelize.query(query,
        {
            replacements: { device_id: device_id },
            type: Sequelize.QueryTypes.SELECT
        }
    );

    return data.total
}

function generate_bill_code(number_bill, type) {
    bill_code = `${type}-${number_bill.toString().padStart(6, '0')}`
    return bill_code
}

async function get_last_record_number_bill_in_year(model, import_date) {
    year_import = new Date(import_date).getFullYear()

    query = `SELECT count(*) 
            FROM import_warehouse
            LEFT JOIN 
                detail_import ON detail_import.import_id = import_warehouse.id
            WHERE YEAR(import_date) = :year_import
                AND detail_import.device_id = :device_id
            FOR UPDATE
            `
    
    const [data] = await sequelize.query(query,
        {
            replacements: { year_import: year_import },
            type: Sequelize.QueryTypes.SELECT
        }
    );

    return data.total
}
module.exports = {
    get_warehouse, post_warehouse, put_warehouse, delete_warehouse
}