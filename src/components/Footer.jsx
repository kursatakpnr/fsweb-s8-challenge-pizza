function Footer() {
  const menuItems = [
    'Terminal Pizza',
    '5 Kişilik Hackathlon Pizza',
    'useEffect Tavuklu Pizza',
    'Beyaz Console Frosty',
    'Testler Geçti Mutlu Burger',
    'Position Absolute Acı Burger',
  ];

  const instagramImages = [
    '/images/iteration-2-images/footer/insta/li-0.png',
    '/images/iteration-2-images/footer/insta/li-1.png',
    '/images/iteration-2-images/footer/insta/li-2.png',
    '/images/iteration-2-images/footer/insta/li-3.png',
    '/images/iteration-2-images/footer/insta/li-4.png',
    '/images/iteration-2-images/footer/insta/li-5.png',
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/images/iteration-2-images/footer/logo-footer.svg" alt="Teknolojik Yemekler" />
            <div className="footer-contact">
              <div className="contact-item">
                <img src="/images/iteration-2-images/footer/icons/icon-1.png" alt="Location" />
                <span>341 Londonderry Road, Istanbul Türkiye</span>
              </div>
              <div className="contact-item">
                <img src="/images/iteration-2-images/footer/icons/icon-2.png" alt="Email" />
                <span>aciktim@teknolojikyemekler.com</span>
              </div>
              <div className="contact-item">
                <img src="/images/iteration-2-images/footer/icons/icon-3.png" alt="Phone" />
                <span>+90 216 123 45 67</span>
              </div>
            </div>
          </div>

          <div className="footer-menu">
            <h4>Hot Menu</h4>
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="footer-instagram">
            <h4>Instagram</h4>
            <div className="instagram-grid">
              {instagramImages.map((image, index) => (
                <img key={index} src={image} alt={`Instagram ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              © 2023 Teknolojik Yemekler.
            </div>
            <div className="footer-social">
              <img src="/images/iteration-2-images/footer/icons/icon-1.png" alt="Twitter" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
