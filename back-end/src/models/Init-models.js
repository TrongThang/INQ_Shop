var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _address_book = require("./address_book");
var _attribute = require("./Attribute");
var _attribute_device = require("./attribute_device");
var _attribute_group = require("./Attribute_group");
var _blog = require("./Blog");
var _cart = require("./Cart");
var _category = require("./Category");
var _contact = require("./Contact");
var _customer = require("./customer");
var _detail_import = require("./detail_import");
var _device = require("./Device");
var _employee = require("./Employee");
var _image_device = require("./Image_device");
var _import_warehouse = require("./import_warehouse");
var _info_website = require("./info_website");
var _liked = require("./liked");
var _notice = require("./Notice");
var _order = require("./Order");
var _order_detail = require("./Order_detail");
var _page = require("./Page");
var _payment_info = require("./Payment_info");
var _permission = require("./Permission");
var _permission_role = require("./Permission_role");
var _review_device = require("./Review_device");
var _role = require("./Role");
var _slideshow = require("./Slideshow");
var _status = require("./Status");
var _warehouse = require("./warehouse");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var address_book = _address_book(sequelize, DataTypes);
  var attribute = _attribute(sequelize, DataTypes);
  var attribute_device = _attribute_device(sequelize, DataTypes);
  var attribute_group = _attribute_group(sequelize, DataTypes);
  var blog = _blog(sequelize, DataTypes);
  var cart = _cart(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var contact = _contact(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var detail_import = _detail_import(sequelize, DataTypes);
  var device = _device(sequelize, DataTypes);
  var employee = _employee(sequelize, DataTypes);
  var image_device = _image_device(sequelize, DataTypes);
  var import_warehouse = _import_warehouse(sequelize, DataTypes);
  var info_website = _info_website(sequelize, DataTypes);
  var liked = _liked(sequelize, DataTypes);
  var notice = _notice(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var order_detail = _order_detail(sequelize, DataTypes);
  var page = _page(sequelize, DataTypes);
  var payment_info = _payment_info(sequelize, DataTypes);
  var permission = _permission(sequelize, DataTypes);
  var permission_role = _permission_role(sequelize, DataTypes);
  var review_device = _review_device(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var slideshow = _slideshow(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);
  var warehouse = _warehouse(sequelize, DataTypes);

  device.belongsToMany(import_warehouse, { as: 'id_import_import_warehouses', through: detail_import, foreignKey: "idDevice", otherKey: "id_import" });
  import_warehouse.belongsToMany(device, { as: 'idDevice_devices', through: detail_import, foreignKey: "id_import", otherKey: "idDevice" });
  notice.belongsTo(account, { as: "idUser_account", foreignKey: "idUser"});
  account.hasMany(notice, { as: "notices", foreignKey: "idUser"});
  attribute_device.belongsTo(attribute, { as: "idAttribute_attribute", foreignKey: "idAttribute"});
  attribute.hasMany(attribute_device, { as: "attribute_devices", foreignKey: "idAttribute"});
  attribute.belongsTo(attribute_group, { as: "idGroupAttribute_attribute_group", foreignKey: "idGroupAttribute"});
  attribute_group.hasMany(attribute, { as: "attributes", foreignKey: "idGroupAttribute"});
  attribute.belongsTo(category, { as: "categoryAttribute", foreignKey: "idCategory"});
  category.hasMany(attribute, { as: "attributes", foreignKey: "idCategory"});
  blog.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(blog, { as: "blogs", foreignKey: "category_id"});
  category.belongsTo(category, { as: "parent", foreignKey: "parentId"});
  category.hasMany(category, { as: "categories", foreignKey: "parentId"});
  device.belongsTo(category, { as: "categoryDevice", foreignKey: "idCategory"});
  category.hasMany(device, { as: "devices", foreignKey: "idCategory"});
  address_book.belongsTo(customer, { as: "idCustomer_customer", foreignKey: "idCustomer"});
  customer.hasMany(address_book, { as: "address_books", foreignKey: "idCustomer"});
  cart.belongsTo(customer, { as: "idCustomer_customer", foreignKey: "idCustomer"});
  customer.hasOne(cart, { as: "cart", foreignKey: "idCustomer"});
  liked.belongsTo(customer, { as: "idCustomer_customer", foreignKey: "idCustomer"});
  customer.hasOne(liked, { as: "liked", foreignKey: "idCustomer"});
  order.belongsTo(customer, { as: "idCustomer_customer", foreignKey: "idCustomer"});
  customer.hasMany(order, { as: "orders", foreignKey: "idCustomer"});
  payment_info.belongsTo(customer, { as: "idCustomer_customer", foreignKey: "idCustomer"});
  customer.hasMany(payment_info, { as: "payment_infos", foreignKey: "idCustomer"});
  review_device.belongsTo(customer, { as: "idCustomer_customer", foreignKey: "idCustomer"});
  customer.hasMany(review_device, { as: "review_devices", foreignKey: "idCustomer"});
  attribute_device.belongsTo(device, { as: "idDevice_device", foreignKey: "idDevice"});
  device.hasOne(attribute_device, { as: "attribute_device", foreignKey: "idDevice"});
  cart.belongsTo(device, { as: "idDevice_device", foreignKey: "idDevice"});
  device.hasMany(cart, { as: "carts", foreignKey: "idDevice"});
  detail_import.belongsTo(device, { as: "idDevice_device", foreignKey: "idDevice"});
  device.hasMany(detail_import, { as: "detail_imports", foreignKey: "idDevice"});
  image_device.belongsTo(device, { as: "idDevice_device", foreignKey: "idDevice"});
  device.hasMany(image_device, { as: "image_devices", foreignKey: "idDevice"});
  liked.belongsTo(device, { as: "idDevice_device", foreignKey: "idDevice"});
  device.hasMany(liked, { as: "likeds", foreignKey: "idDevice"});
  order_detail.belongsTo(device, { as: "id_device", foreignKey: "id"});
  device.hasOne(order_detail, { as: "order_detail", foreignKey: "id" });
  
  review_device.belongsTo(device, {foreignKey: "idDevice", as: 'device'});
  device.hasMany(review_device, { foreignKey: "idDevice", as: 'reviews' });
  
  warehouse.belongsTo(device, { as: "idDevice_device", foreignKey: "idDevice"});
  device.hasOne(warehouse, { as: "warehouse", foreignKey: "idDevice"});
  account.belongsTo(employee, { as: "idPerson_employee", foreignKey: "idPerson"});
  employee.hasOne(account, { as: "account", foreignKey: "idPerson"});
  blog.belongsTo(employee, { as: "author_employee", foreignKey: "author"});
  employee.hasMany(blog, { as: "blogs", foreignKey: "author"});
  import_warehouse.belongsTo(employee, { as: "idEmployee_employee", foreignKey: "idEmployee"});
  employee.hasMany(import_warehouse, { as: "import_warehouses", foreignKey: "idEmployee"});
  order.belongsTo(employee, { as: "idAdmin_employee", foreignKey: "idAdmin"});
  employee.hasMany(order, { as: "orders", foreignKey: "idAdmin"});
  // slideshow.belongsTo(employee, { as: "idEmployee_employee", foreignKey: "idEmployee"});
  // employee.hasMany(slideshow, { as: "slideshows", foreignKey: "idEmployee"});
  detail_import.belongsTo(import_warehouse, { as: "id_import_import_warehouse", foreignKey: "id_import"});
  import_warehouse.hasMany(detail_import, { as: "detail_imports", foreignKey: "id_import"});
  info_website.belongsTo(page, { as: "ID_PAGE_page", foreignKey: "ID_PAGE"});
  page.hasMany(info_website, { as: "info_websites", foreignKey: "ID_PAGE"});
  permission_role.belongsTo(permission, { as: "idPermission_permission", foreignKey: "idPermission"});
  permission.hasMany(permission_role, { as: "permission_roles", foreignKey: "idPermission"});
  account.belongsTo(role, { as: "idRole_role", foreignKey: "idRole"});
  role.hasMany(account, { as: "accounts", foreignKey: "idRole"});
  permission_role.belongsTo(role, { as: "idRole_role", foreignKey: "idRole"});
  role.hasOne(permission_role, { as: "permission_role", foreignKey: "idRole"});

  return {
    account,
    address_book,
    attribute,
    attribute_device,
    attribute_group,
    blog,
    cart,
    category,
    contact,
    customer,
    detail_import,
    device,
    employee,
    image_device,
    import_warehouse,
    info_website,
    liked,
    notice,
    order,
    order_detail,
    page,
    payment_info,
    permission,
    permission_role,
    review_device,
    role,
    slideshow,
    status,
    warehouse,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
