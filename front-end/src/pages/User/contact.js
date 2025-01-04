import React, { useState } from 'react';
import ModalSearch from '../../component/user/Contact/modalSearch';
import ContactForm from '../../component/user/Contact/contactForm';

function ContactPage() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    title: '',
    content: '',
    status:true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        alert('Contact created successfully');
        setFormData({
          fullname: '',
          email: '',
          title: '',
          content: '',
          status:true
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <main>
      <ModalSearch />
      <ContactForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}

export default ContactPage;