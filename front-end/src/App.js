import React from 'react';
import './App.css'
import './resource/css/style.css';
// <!-- Libraries Stylesheet -->
import './resource/lib/animate/animate.min.css'
import './resource/lib/lightbox/css/lightbox.min.css'
import './resource/lib/owlcarousel/assets/owl.carousel.min.css'
// <!-- Customized Bootstrap Stylesheet -->
import './resource/css/bootstrap.min.css'

// <!-- Template Stylesheet -->

import './resource/css/style.css'
import './resource/css/inq.css';

import DeviceCard from './component/Shared/deviceCard';

function App() {
  return (
    <div className='App'>
        <DeviceCard />
    </div>
  );
}

export default App;
