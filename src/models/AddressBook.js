//Danh sách các địa chỉ của một khách hàng
module.exports = (sequelize, DataTypes) => {
    const AddressBook = sequelize.define("AddressBook", {
        idCustomer: DataTypes.STRING(12),
        address: DataTypes.STRING(500),
        phone: DataTypes.STRING(15),
        nameRecipient: DataTypes.STRING(500),
        defaultAddress: DataTypes.BOOLEAN,
    });

    AddressBook.associate = (models) => {
        AddressBook.belongsTo(models.Customer, { foreignKey: "idCustomer" });
    };

    return AddressBook;
};
