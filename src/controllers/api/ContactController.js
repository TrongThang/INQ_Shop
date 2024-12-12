const {
    getAllContact,
    getContact,
    postCreateContact,
    putUpdateContact
} = require('../../services/ContactServices.js');

const getAllContactAPI = async (req, res) => {
    try {
        const result = await getAllContact();
        res.status(200).json({
            data: result
        });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "An error occurred while fetching contacts" });
    }
};

const getContactAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getContact(id);
        if (!result) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({
            data: result
        });
    } catch (error) {
        console.error("Error fetching contact:", error);
        res.status(500).json({ message: "An error occurred while fetching contact" });
    }
};

const postCreateContactAPI = async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        if (!data.fullname || !data.title) {
            res.status(400).json({
                message: "fullname and title is"
            })
        }
        const result = await postCreateContact(data);
        res.status(201).json({
            message: "Contact created successfully!",
            data: result
        });
    } catch (error) {
        console.error("Error creating contact:", error.message);
        res.status(500).json({ message: "An error occurred while creating the contact." });
    }
};

const putUpdateContactAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        console.log(id, data)
        const result = await putUpdateContact(id, data);
        res.status(201).json({
            message: "Contact updated successfully!",
            data: result
        });
    } catch (error) {
        console.error("Error updating contact:", error.message);
        res.status(500).json({ message: "An error occurred while updating the contact." });
    }
};

module.exports = {
    getAllContactAPI,
    getContactAPI,
    postCreateContactAPI,
    putUpdateContactAPI,
};
