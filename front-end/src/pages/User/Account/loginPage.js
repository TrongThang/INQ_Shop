import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import LoginPopup from '../../../component/user/Login/formLogin';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [captchaToken, setCaptchaToken] = useState(null);


  const handleLogin = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu nhập sai >= 3 lần và captchaToken là null
    if (failedAttempts >= 3 && !captchaToken) {
      setErrorMessage('Vui lòng xác nhận CAPTCHA trước khi đăng nhập.');
      return;
    }

    try {
      const requestBody = {
        username,
        password,
        type: 'CUS',
        captchaResponse: failedAttempts >= 3 ? captchaToken : null // Gửi CAPTCHA nếu nhập sai >= 3 lần
      };

      const response = await fetch('http://localhost:8081/api/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include'
      });

      const result = await response.json();

      if (response.ok) {
        if (result.success) {
          Cookies.remove('cart');
          toast.success("Đăng nhập thành công!");
          setFailedAttempts(0); // Reset số lần nhập sai
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          setErrorMessage('Token không được trả về từ server');
        }
      } else {
        setFailedAttempts(prev => prev + 1); // Tăng số lần nhập sai
        toast.error(result.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      console.error(err);
      toast.error('Đã xảy ra lỗi trong quá trình đăng nhập');
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <LoginPopup
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        errorMessage={errorMessage}
        failedAttempts={failedAttempts}
        setCaptchaToken={setCaptchaToken}
      />
    </>
  );
}