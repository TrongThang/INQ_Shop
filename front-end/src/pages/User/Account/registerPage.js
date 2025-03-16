import { useState } from 'react';
import RegisterPopup from '../../../component/user/Register/formRegister';
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {
    const [firtName, setFirtName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [comfirmPassword, setComfirmPassword] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const requestbody = {
                firtName, lastName,
                username, password,
                email, phone,
                gender, comfirmPassword,
                type: "CUS"
            }
            const response = await fetch('http://localhost:8081/api/account/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestbody)
            })

            const result = await response.json();

            if (response.ok) {
                if (result.success) {
                    toast.success("Đăng ký thành công!");
                }
            }
            else {
                toast.error(result.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            console.error(error);
            toast.error('Đã xảy ra lỗi trong quá trình đăng ký');
        }
    }
    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <RegisterPopup
                setfirtname={firtName}
                setlastname={lastName}
                setusername={username}
                setpassword={password}
                setemail={email}
                setphone={phone}
                setgender={gender}
                setcomfirmpassword={comfirmPassword}
            />
        </>
    );
}