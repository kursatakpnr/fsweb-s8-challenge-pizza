import { Link } from 'react-router-dom';

function Success({ orderData }) {
  if (!orderData) {
    return (
      <div className="success-container">
        <div className="success-content">
          <img src="/images/iteration-1-images/logo.svg" alt="Teknolojik Yemekler" className="success-logo" />
          <p className="success-message">Sipariş bulunamadı</p>
          <Link to="/" className="home-button">ANASAYFAYA DÖN</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="success-content">
        <img src="/images/iteration-1-images/logo.svg" alt="Teknolojik Yemekler" className="success-logo" />
        <p className="success-message">lezzetin yolda</p>
        <h1 className="success-title">SİPARİŞ ALINDI!</h1>

        <div className="order-details">
          <h3>Sipariş Detayları</h3>
          
          <div className="order-info-row">
            <span className="order-info-label">İsim:</span>
            <span className="order-info-value">{orderData.isim}</span>
          </div>

          <div className="order-info-row">
            <span className="order-info-label">Pizza:</span>
            <span className="order-info-value">Position Absolute Acı Pizza</span>
          </div>

          <div className="order-info-row">
            <span className="order-info-label">Boyut:</span>
            <span className="order-info-value">{orderData.boyut}</span>
          </div>

          <div className="order-info-row">
            <span className="order-info-label">Hamur:</span>
            <span className="order-info-value">{orderData.hamur}</span>
          </div>

          <div className="order-info-row">
            <span className="order-info-label">Malzemeler:</span>
            <ul className="extras-list">
              {orderData.malzemeler && orderData.malzemeler.map((malzeme, index) => (
                <li key={index}>{malzeme}</li>
              ))}
            </ul>
          </div>

          {orderData.ozel && (
            <div className="order-info-row">
              <span className="order-info-label">Sipariş Notu:</span>
              <span className="order-info-value">{orderData.ozel}</span>
            </div>
          )}

          <div className="order-info-row">
            <span className="order-info-label">Adet:</span>
            <span className="order-info-value">{orderData.adet}</span>
          </div>

          {orderData.fiyat && (
            <>
              <div className="order-info-row">
                <span className="order-info-label">Seçimler Toplamı:</span>
                <span className="order-info-value">{orderData.fiyat.secimler.toFixed(2)}₺</span>
              </div>

              <div className="order-info-row total-row">
                <span className="order-info-label">Toplam Fiyat:</span>
                <span className="order-info-value selections-price">
                  {orderData.fiyat.toplam.toFixed(2)}₺
                </span>
              </div>
            </>
          )}

          {orderData.id && (
            <div className="order-info-row">
              <span className="order-info-label">Sipariş ID:</span>
              <span className="order-info-value">#{orderData.id}</span>
            </div>
          )}

          {orderData.createdAt && (
            <div className="order-info-row">
              <span className="order-info-label">Sipariş Zamanı:</span>
              <span className="order-info-value">
                {new Date(orderData.createdAt).toLocaleString('tr-TR')}
              </span>
            </div>
          )}
        </div>

        <Link to="/" className="home-button">ANASAYFAYA DÖN</Link>
      </div>
    </div>
  );
}

export default Success;
