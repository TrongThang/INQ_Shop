import React, { createContext, useState, useContext, useEffect, } from 'react';
const InfoWebsiteContext = createContext();

export const InfoWebsiteProvider = ({ children }) => {
    const [setting, setSetting] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/setting-web')

            if (!response.ok) {
                throw new Error('Không lấy được dữ liệu cài đặt của Website');
            }

            const result = await response.json();
            setSetting(result.data);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);


    
    return (
        <InfoWebsiteContext.Provider value={{
            setting
        }}>
            {children}
        </InfoWebsiteContext.Provider>
    )
}

export const useSettingWeb = () => useContext(InfoWebsiteContext);