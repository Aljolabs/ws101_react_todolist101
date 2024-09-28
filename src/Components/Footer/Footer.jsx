import React from 'react';
import { FaGoogle, FaFacebookMessenger, FaInstagram, FaFacebook, FaGithub, FaDiscord, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <div className="Footer">
      <footer className="footer">
        <p className="footer__title">Mark Aljo Quindoza</p>
        <div className="footer__social">
          <a href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWsmBGmWwKmkLcBsjbbfPzkmGrZMlNmlVLHdpRxDQrcxmTlKBwjdxJRVlnZdzmDqjFDLHdFxv" className="footer__icon">
            <FaGoogle />
          </a>
          <a href="https://www.facebook.com/messages/t/100010417996297" className="footer__icon">
            <FaFacebookMessenger />
          </a>
          <a href="https://www.instagram.com/" className="footer__icon">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100010417996297" className="footer__icon">
            <FaFacebook />
          </a>
          <a href="https://github.com/Aljolabs" className="footer__icon">
            <FaGithub />
          </a>
          <a href="https://discord.com/" className="footer__icon">
            <FaDiscord />
          </a>
          <a href="https://www.linkedin.com/login" className="footer__icon">
            <FaLinkedin />
          </a>
          <a href="https://www.youtube.com/" className="footer__icon">
            <FaYoutube />
          </a>
        </div>
        <p className="footer__copy">&#169; Developed by Mark Aljo Quindoza. All rights reserved 2024.</p>
      </footer>
    </div>
  );
}

export default Footer;