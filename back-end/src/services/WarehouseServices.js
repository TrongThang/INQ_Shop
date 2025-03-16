const sequelize = require("../config/database")
const { ERROR_CODES } = require("../docs/contants")
const { default: get_error_response } = require("../helpers/response")
const { executeSelectData, check_reference_existence } = require("../helpers/sql_query")
const { isExistId, validate_name } = require("../helpers/validate")
const Warehouse = require("../models/Warehouse")
const ImportWarehouse = require("../models/ImportWarehouse")
const {
    WarehouseCreateRequest, WarehouseUpdateRequest, WarehouseDeleteRequest 
} = require('../requests/warehouse')

const get_warehouse = (filters = null, limit = null, page = null, order = null, sort = null) => {
    get_table = 'warehouse'

    get_attr = `name, address`
    
    result = executeSelectData({ table: get_table, strGetColumn: get_attr,filters: filters, limit: limit, page: page, order: order, sort: sort })

    return result
} 

const post_warehouse = async (warehouseCreateRequest) => {
    const transaction = await sequelize.transaction();

    try {
        const error = validate_name(warehouseCreateRequest.name, Warehouse);
        if (error) {
            await transaction.rollback();
            return error;
        }

        const new_warehouse = await Warehouse.create(warehouseCreateRequest, { transaction });

        await transaction.commit();
        return new_warehouse;
    } catch (error) {
        await transaction.rollback();
        return get_error_response(ERROR_CODES.WAREHOUSE.CREATE_FAILED, status_code = 406);
    }
}

const put_warehouse = async (warehouseUpdateRequest) => {
    const transaction = await sequelize.transaction();

    try {
        const warehouse = await Warehouse.findByPk(id, { transaction });
        if (!warehouse) {
            await transaction.rollback();
            return get_error_response(ERROR_CODES.WAREHOUSE.NOT_FOUND, status_code = 406);
        }

        const error = validate_name(warehouseUpdateRequest.name, Warehouse);
        if (error) {
            await transaction.rollback();
            return error;
        }

        const [updateCount] = await Warehouse.update(warehouseUpdateRequest, {
            where: { id: id },
            transaction 
        });

        if (updateCount === 0) {
            await transaction.rollback();
            return get_error_response(ERROR_CODES.WAREHOUSE.UPDATE_FAILED);
        }

        await transaction.commit();
        return get_error_response(ERROR_CODES.WAREHOUSE.SUCCESS);
    } catch (error) {
        await transaction.rollback();
        return get_error_response(ERROR_CODES.WAREHOUSE.UPDATED_FAILED, status_code = 406);
    }
}

const delete_warehouse = async (id) => {
    const transaction = await sequelize.transaction();

    try {
        const warehouse = await Warehouse.findByPk(id, { transaction });
        if (!warehouse) {
            await transaction.rollback();
            return get_error_response(ERROR_CODES.WAREHOUSE.NOT_FOUND, status_code = 406);
        }
        
        result_check = await check_reference_existence(model = ImportWarehouse, column_name = 'warehouse_id', value = id, error_code = ERROR_CODES.WAREHOUSE.REFERENCE_IMPORT_INVOICE)
        if (result_check) {
            return result_check
        }

        const deletedCountWarehouse = await Warehouse.destroy({
            where: { id: id },
            transaction
        });

        const deletedCountImportWarehouse = ImportWarehouse.destroy({
            where: { warehouse_id: id },
            transaction
        });
        
        if (deletedCountWarehouse === 0) {
            await transaction.rollback();
            return get_error_response(ERROR_CODES.WAREHOUSE.DELETED_FAILED);
        }

        await transaction.commit();
        return get_error_response(ERROR_CODES.WAREHOUSE.SUCCESS);
    } catch (error) {
        await transaction.rollback();
        return get_error_response(ERROR_CODES.WAREHOUSE.DELETED_FAILED, status_code = 406);
    }
}
    
module.exports = {
    get_warehouse, post_warehouse, put_warehouse, delete_warehouse
}