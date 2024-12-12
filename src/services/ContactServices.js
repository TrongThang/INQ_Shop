const Contact = require('../models/Contact');

const getAllContact = async () => {
    return await Contact.findAll();

};
const getContact = async (id) => {
    return await Contact.findByPk(id);
};

const postCreateContact = async (data) => {
    return await Contact.create(data);
};

const putUpdateContact = async (id, data) => {
    const udateContact = await Contact.findByPk(id);
    return await udateContact.update(data);
}

module.exports = {
    getAllContact,
    getContact,
    postCreateContact,
    putUpdateContact,
};