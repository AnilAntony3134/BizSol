import React from 'react';

import './styles.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-row">
          <div className="site-footer-row-item">
            <h6>About</h6>
            <p className="text-justify">BizSol <i>SIMPLE WANTS TO BE</i> a one stop soltion to all or many of your business queries which could be solved by anyone who could be an expert in the ubject matter and the Companies could incentivize the people for encouraging them and as a token of appreceation for their efforts.</p>
          </div>

          <div className="site-footer-row-item">
            <h6>Try as a</h6>
            <ul className="footer-links">
              <li><a href="#">Business</a></li>
              <li><a href="#">Volunteer</a></li>
              <li><a href="#">Freelancer</a></li>
              <li><a href="#">Contributer</a></li>

            </ul>
          </div>

          <div className="site-footer-row-item">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="http://scanfcode.com/about/">About Us</a></li>
              <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
              <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
              <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
              <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="site-footer-row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2023 All Rights Reserved by 
              <a href="#"> Anil Antony</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a className="dribbble" href="#"><i className="fa fa-dribbble"></i></a></li>
              <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
