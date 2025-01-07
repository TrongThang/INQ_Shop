import React, { createContext, useState, useContext, } from 'react';
const InfoWebsiteContext = createContext();

export const InfoWebsiteProvider = ({ children }) => {
    const fetchData = async () => {
        const data = await fetch('http://localhost:8081/api/setting-web')

        return await data
    }


    const [setting, setSetting] = useState([fetchData()])

    
    return (
        <InfoWebsiteContext.Provider value={{
            setting
        }}>
            {children}
        </InfoWebsiteContext.Provider>
    )
}

export const useSettingWeb = () => useContext(InfoWebsiteContext);