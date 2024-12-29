import React from 'react';
import './App.css'
import './resource/css/style.css';
import './resource/css/index.css';
// <!-- Libraries Stylesheet -->
import './resource/lib/animate/animate.min.css'
import './resource/lib/lightbox/css/lightbox.min.css'
import './resource/lib/owlcarousel/assets/owl.carousel.min.css'
  //  <!-- Icon Font Stylesheet -->
// <!-- Customized Bootstrap Stylesheet -->
import './resource/css/bootstrap.min.css'
import './resource/css/index.css'
// <!-- Template Stylesheet -->
import './resource/css/style.css'
import DeviceCard from './component/Shared/deviceCard';

function App() {
  return (
    <div className='App'>
        <DeviceCard />
    </div>
  );
}

export default App;
