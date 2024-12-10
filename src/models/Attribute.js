//Thông tin về 1 thuộc tính của thiết bị 
module.exports = (sequelize, DataTypes) => {
    const Attribute = sequelize.define('Attribute', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idDevice: DataTypes.INTEGER,
        name: DataTypes.STRING(500),
        value: DataTypes.STRING(500),
    });
    
    Attribute.associate = (models) => {
        Attribute.belongsTo(models.Device, { foreignKey: 'idDevice' });
    };
    
    return Attribute;
  };