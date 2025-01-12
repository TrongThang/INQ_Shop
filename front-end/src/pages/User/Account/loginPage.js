import LoginPopup from '../../../component/user/Login/formLogin';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

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
          localStorage.setItem('authToken', token); 
          Cookies.remove('cart');
          setTimeout(() => {
            window.location.reload(); // Tải lại trang
          },  500);
          toast.success("Đăng nhập thành công!");
        } else {
          setErrorMessage('Token không được trả về từ server');
        }
      } else {
        toast.error(result.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      console.error(err);
      toast.error('Đã xảy ra lỗi trong quá trình đăng nhập');
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
