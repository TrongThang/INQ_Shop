import React, { useEffect, useState } from 'react';
import ModalSearch from '../../component/user/Contact/modalSearch';
import ContactForm from '../../component/user/Contact/contactForm';

function ContactPage() {
  useEffect(() => {
    document.title = 'Liên hệ | INQ';
  }, []);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    title: '',
    content: '',
    status: true
  });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; 

    if (!emailPattern.test(formData.email)) {
      setToastMessage('Email không hợp lệ. Vui lòng kiểm tra lại.');
      setShowToast(true);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8081/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        setToastMessage('Thông tin đã được gửi thành công.');
        setShowToast(true);
        setFormData({
          fullname: '',
          email: '',
          title: '',
          content: '',
          status: true
        });
      } else {
        setToastMessage('Có lỗi xảy ra khi gửi form.');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setToastMessage('Có lỗi xảy ra khi gửi form.');
      setShowToast(true);
    }
  };

 
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000); 

      return () => clearTimeout(timer); 
    }
  }, [showToast]);

  return (
    <main>
      <ModalSearch />
      <ContactForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-container position-fixed top-0 end-0 p-3">
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header bg-primary text-white">
              <strong className="me-auto">Thông báo</strong>
              {/* <button 
                type="button" 
                className="btn-close btn-close-white" 
                aria-label="Close" 
                onClick={() => setShowToast(false)}
              >
              </button> */}
            </div>
            <div className="toast-body">
              {toastMessage}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ContactPage;
