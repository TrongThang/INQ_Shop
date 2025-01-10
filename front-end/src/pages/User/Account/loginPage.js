import LoginPopup from '../../../component/user/Login/formLogin';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  
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
        if (result.token) {
          const token = result.token;
          console.log('Token:', token); // Hiển thị token ra console
          localStorage.setItem('authToken', token); // Lưu token vào localStorage
         
          window.location.reload(); // Tải lại trang
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
