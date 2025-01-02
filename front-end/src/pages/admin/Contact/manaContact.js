import { useState } from "react";
import ContactTable from "../../component/admin/Mana_Contact/contactTable";
import SearchContact from "../../component/admin/Mana_Contact/searchContact";
import HeaderManage from "../../component/Shared/headerManage";

export default function ManaContact() {

    const [contacts, setContacts] = useState([
            {
                id: "NV001",
                username: "tuantu4139",
                lastName: "Trần",
                firstName: "Tuấn",
                cccd: "077123456789",
                email: "trantuan@gmail.com",
                phone: "01234567890",
                gender: "Nam",
                birthDate: "07/10/2004",
                createdDate: "10/12/2024",
                status: "Hoạt động",
            }
        ]);
    
        const handleAdd = () => {
            alert("Thêm nhân viên!");
        };
    
        const handleExport = () => {
            alert("Xuất file!");
        };

    return (
        <>
            <HeaderManage onAdd={handleAdd} onExport={handleExport} />
            <SearchContact />
            <ContactTable contacts={contacts} />
        </>
    );
}