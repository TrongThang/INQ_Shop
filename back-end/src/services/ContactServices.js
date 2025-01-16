const Contact = require('../models/Contact');
const Sequelize = require('sequelize');

const getAllContact = async () => {
    return await Contact.findAll({order: [['created_at', 'DESC']]});

};
const getContact = async (data) => {
    const id = data.id
    return await Contact.findByPk(id);
};

const postCreateContact = async (data) => {
    return await Contact.create(data);
};

const putUpdateContact = async (data) => {
    const id = data.id;
    console.log(id)
    const updateContact = await Contact.findByPk(id);
    return await updateContact.update(data);
}

const checkContactByEmail = async (email) => {
    try {
        const result = await Contact.findOne({
            where: {
                email: email
            }
        });
        return result
    } catch (error) {
        console.error("Error checking email:", error);
        throw error;
    }
    
};
const deleteContact = async (id) => {
    try {
        const contact = await Contact.findByPk(id);
        if (contact) {
            await contact.destroy();
            return { message: 'Contact deleted successfully' };
        } else {
            return { message: 'Contact not found' };
        }
    } catch (error) {
        console.error("Error deleting contact:", error);
        throw error;
    }
};
module.exports = {
    checkContactByEmail,
    deleteContact,
    getAllContact,
    getContact,

    postCreateContact,
    
    putUpdateContact,
};