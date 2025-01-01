import React, { useEffect } from 'react';
import $ from 'jquery';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import WOW from 'wowjs';

const Main = () => {
  useEffect(() => {
    // Spinner
    const spinner = () => {
      setTimeout(() => {
        if ($('#spinner').length > 0) {
          $('#spinner').removeClass('show');
        }
      }, 1);
    };
    spinner();

    // Initiate the WOW.js
    new WOW.WOW().init();

    // Sticky Navbar
    const handleScroll = () => {
      if ($(window).scrollTop() > 45) {
        $('.nav-bar').addClass('sticky-top shadow-sm').css('top', '0px');
      } else {
        $('.nav-bar').removeClass('sticky-top shadow-sm').css('top', '-100px');
      }

      // Back to top button
      if ($(window).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    };

    $(window).scroll(handleScroll);

    // Back to top button click action
    $('.back-to-top').click(() => {
      $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
      return false;
    });

    // Initialize Owl Carousel (make sure jQuery is available first)
    $(document).ready(function() {
      $(".header-carousel").owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: true,
        smartSpeed: 500,
        dots: true,
        loop: true,
        nav: true,
        navText: [
          '<i class="bi bi-arrow-left"></i>',
          '<i class="bi bi-arrow-right"></i>'
        ]
      });
    });

    return () => {
      $(window).off('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div id="spinner" className="show">Loading...</div>
      <div className="nav-bar">Navigation</div>
      <div className="header-carousel owl-theme">Carousel goes here</div>
      <div className="back-to-top">Back to Top</div>
    </div>
  );
};

export default Main;
