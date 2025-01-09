import LoginPopup from '../../../component/user/Login/formLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginSuccessToast from '../../../component/user/Notification/LoginSuccessToast';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch('http://localhost:8081/api/account/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, type: 'CUS' }),
        });

        const result = await response.json();

        if (response.ok) {
          if (result.data && result.data.token) {
            const token = result.data.token;
            console.log('Token:', token); // Hiển thị token ra console
            localStorage.setItem('authToken', token); // Lưu token vào localStorage
            setShowToast(true); // Hiển thị thông báo đăng nhập thành công
            navigate('/'); // Điều hướng đến trang chủ
          } else {
            setErrorMessage('Token không được trả về từ server');
          }
        } else {
          setErrorMessage(result.message || 'Đăng nhập thất bại');
        }
      } catch (err) {
        console.error(err);
        setErrorMessage('Đã xảy ra lỗi trong quá trình đăng nhập');
      }
    };

    useEffect(() => {
        document.title = 'Đăng nhập | INQ'
      }, []);
    
    return (
        <>
            <LoginPopup
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                errorMessage={errorMessage}
            />
        </>
    );
}
