class ImportWarehouseCreateRequest {
    constructor({
        supplier_id, employee_id, warehouse_id, import_date, file_authenticate, total_money, prepaid, remaining, note
    }) {
        this.supplier_id = supplier_id
        this.employee_id = employee_id
        this.warehouse_id = warehouse_id
        this.import_date = import_date
        this.file_authenticate = file_authenticate
        this.total_money = total_money
        this.prepaid = prepaid
        this.remaining = remaining
        this.note = note
    }
}

class ImportWarehouseUpdateRequest {
    constructor({
        id, supplier_id, employee_id, warehouse_id, import_date, file_authenticate, total_money, prepaid, remaining, note 
    }) {
        this.id = id
        this.supplier_id = supplier_id
        this.employee_id = employee_id
        this.warehouse_id = warehouse_id
        this.import_date = import_date
        this.file_authenticate = file_authenticate
        this.total_money = total_money
        this.prepaid = prepaid
        this.remaining = remaining
        this.note = note
    }
}

class ImportWarehouseDeleteRequest {
    constructor({ id }) {
        this.id = id
    }
}

module.exports = {
    ImportWarehouseCreateRequest,
    ImportWarehouseUpdateRequest,
    ImportWarehouseDeleteRequest
}
