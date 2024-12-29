const Contact = require('../models/Contact');
const Sequelize = require('sequelize');
const getAllContact = async () => {
    return await Contact.findAll();

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

module.exports = {
    checkContactByEmail,
    getAllContact,
    getContact,
    postCreateContact,
    putUpdateContact,
};