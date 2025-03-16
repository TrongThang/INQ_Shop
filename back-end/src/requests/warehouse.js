class WarehouseCreateRequest {
    constructor({ name }) {
        this.name = name
    }
}

class WarehouseUpdateRequest {
    constructor({ id, name }) {
        this.id = id
        this.name = name
    }
}

class WarehouseDeleteRequest {
    constructor({ id }) {
        this.id = id
    }
}

module.exports = {
    WarehouseCreateRequest,
    WarehouseUpdateRequest,
    WarehouseDeleteRequest
}
