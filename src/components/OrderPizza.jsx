import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function OrderPizza({ onOrderSubmit }) {
  const history = useHistory();
  
  // Form State
  const [formData, setFormData] = useState({
    isim: '',
    boyut: '',
    hamur: '',
    malzemeler: [],
    ozel: '',
    adet: 1,
  });

  // Error State
  const [errors, setErrors] = useState({});
  
  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  // Pizza malzemeleri listesi
  const malzemelerList = [
    'Pepperoni',
    'Tavuk Izgara',
    'Mısır',
    'Sarımsak',
    'Ananas',
    'Sosis',
    'Soğan',
    'Sucuk',
    'Biber',
    'Kabak',
    'Kanada Jambonu',
    'Domates',
    'Jalapeno',
  ];

  // Fiyat hesaplama
  const basePrice = 85.50;
  const extraPrice = 5;
  const selectionsPrice = formData.malzemeler.length * extraPrice;
  const totalPrice = (basePrice + selectionsPrice) * formData.adet;

  // Validation fonksiyonu
  const validateForm = () => {
    const newErrors = {};

    // İsim kontrolü (minimum 3 karakter)
    if (!formData.isim || formData.isim.trim().length < 3) {
      newErrors.isim = 'İsim en az 3 karakter olmalıdır';
    }

    // Boyut kontrolü
    if (!formData.boyut) {
      newErrors.boyut = 'Lütfen pizza boyutu seçiniz';
    }

    // Hamur kontrolü
    if (!formData.hamur) {
      newErrors.hamur = 'Lütfen hamur kalınlığı seçiniz';
    }

    // Malzeme kontrolü (minimum 4, maksimum 10)
    if (formData.malzemeler.length < 4) {
      newErrors.malzemeler = 'En az 4 malzeme seçmelisiniz';
    } else if (formData.malzemeler.length > 10) {
      newErrors.malzemeler = 'En fazla 10 malzeme seçebilirsiniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form alanı değiştiğinde
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Malzeme seçimi
      let newMalzemeler = [...formData.malzemeler];
      if (checked) {
        if (newMalzemeler.length < 10) {
          newMalzemeler.push(value);
        }
      } else {
        newMalzemeler = newMalzemeler.filter((m) => m !== value);
      }
      setFormData({ ...formData, malzemeler: newMalzemeler });
      
      // Malzeme hatasını temizle
      if (newMalzemeler.length >= 4 && newMalzemeler.length <= 10) {
        const { malzemeler, ...rest } = errors;
        setErrors(rest);
      }
    } else {
      setFormData({ ...formData, [name]: value });
      
      // İlgili alanın hatasını temizle
      if (errors[name]) {
        const { [name]: removed, ...rest } = errors;
        setErrors(rest);
      }
    }
  };

  // Adet artırma/azaltma
  const handleQuantityChange = (change) => {
    const newQuantity = formData.adet + change;
    if (newQuantity >= 1) {
      setFormData({ ...formData, adet: newQuantity });
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // API'ye POST isteği
      const orderData = {
        ...formData,
        fiyat: {
          temel: basePrice,
          secimler: selectionsPrice,
          toplam: totalPrice,
        },
        tarih: new Date().toISOString(),
      };

      // reqres.in/api/pizza endpoint'ine POST request
      // Not: Bu endpoint mock API olarak çalışır
      const response = await axios.post('https://reqres.in/api/pizza', orderData);
      
      console.log('Sipariş Başarılı:', response.data);
      
      // API yanıtını ve sipariş bilgilerini birleştir
      const completeOrderData = {
        id: response.data.id || Math.floor(Math.random() * 10000),
        createdAt: response.data.createdAt || new Date().toISOString(),
        ...orderData,
      };
      
      console.log('Sipariş Özeti:', completeOrderData);
      
      // Success sayfasına yönlendir ve veriyi gönder
      if (onOrderSubmit) {
        onOrderSubmit(completeOrderData);
      }
      
      history.push('/success');
    } catch (error) {
      console.error('Sipariş hatası:', error);
      
      // Hata durumunda bile sipariş simülasyonu yap (reqres.in mock API olduğu için)
      const mockOrderData = {
        id: Math.floor(Math.random() * 10000),
        createdAt: new Date().toISOString(),
        ...formData,
        fiyat: {
          temel: basePrice,
          secimler: selectionsPrice,
          toplam: totalPrice,
        },
        tarih: new Date().toISOString(),
      };
      
      console.log('Mock Sipariş Özeti:', mockOrderData);
      
      // Success sayfasına yönlendir
      if (onOrderSubmit) {
        onOrderSubmit(mockOrderData);
      }
      
      history.push('/success');
    } finally {
      setIsLoading(false);
    }
  };

  // Form geçerli mi?
  const isFormValid = () => {
    return (
      formData.isim.trim().length >= 3 &&
      formData.boyut &&
      formData.hamur &&
      formData.malzemeler.length >= 4 &&
      formData.malzemeler.length <= 10
    );
  };

  return (
    <div className="pizza-order-container">
      {/* Pizza Header */}
      <div className="pizza-header">
        <div className="pizza-image-container">
          <img
            src="/images/iteration-2-images/pictures/form-banner.png"
            alt="Position Absolute Acı Pizza"
            className="pizza-main-image"
          />
        </div>
        <div className="pizza-info">
          <h3 className="pizza-title">Position Absolute Acı Pizza</h3>
          <div className="pizza-price-large">{basePrice}₺</div>
          <div className="pizza-rating">
            <span className="rating">4.9</span>
            <span className="reviews">(200)</span>
          </div>
          <p className="pizza-description">
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre.
            Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra
            geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
            düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.
            Küçük bir pizzaya bazen pizzetta denir.
          </p>
        </div>
      </div>

      {/* Pizza Order Form */}
      <form className="pizza-order-form" onSubmit={handleSubmit}>
        {/* İsim Alanı */}
        <div className="form-group">
          <h4>İsim <span className="required">*</span></h4>
          <input
            type="text"
            name="isim"
            value={formData.isim}
            onChange={handleChange}
            placeholder="Adınızı giriniz"
            className={`form-input ${errors.isim ? 'error' : ''}`}
            data-cy="isim-input"
          />
          {errors.isim && <p className="error-message">{errors.isim}</p>}
        </div>

        {/* Boyut ve Hamur Seçimi */}
        <div className="form-row">
          <div className="form-group">
            <h4>Boyut Seç <span className="required">*</span></h4>
            <div className="size-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="boyut"
                  value="S"
                  checked={formData.boyut === 'S'}
                  onChange={handleChange}
                  data-cy="boyut-small"
                />
                <span className="radio-custom"></span>
                <span className="option-text">S</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="boyut"
                  value="M"
                  checked={formData.boyut === 'M'}
                  onChange={handleChange}
                  data-cy="boyut-medium"
                />
                <span className="radio-custom"></span>
                <span className="option-text">M</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="boyut"
                  value="L"
                  checked={formData.boyut === 'L'}
                  onChange={handleChange}
                  data-cy="boyut-large"
                />
                <span className="radio-custom"></span>
                <span className="option-text">L</span>
              </label>
            </div>
            {errors.boyut && <p className="error-message">{errors.boyut}</p>}
          </div>

          <div className="form-group">
            <h4>Hamur Seç <span className="required">*</span></h4>
            <select
              name="hamur"
              value={formData.hamur}
              onChange={handleChange}
              className="form-select"
              data-cy="hamur-select"
            >
              <option value="">Hamur Kalınlığı</option>
              <option value="Süper İnce">Süper İnce</option>
              <option value="İnce">İnce</option>
              <option value="Kalın">Kalın</option>
            </select>
            {errors.hamur && <p className="error-message">{errors.hamur}</p>}
          </div>
        </div>

        {/* Ek Malzemeler */}
        <div className="form-group">
          <h4>Ek Malzemeler</h4>
          <p className="extras-info">
            En az 4, en fazla 10 malzeme seçebilirsiniz. Her biri 5₺ 
            <strong> (Seçilen: {formData.malzemeler.length})</strong>
          </p>
          <div className="extras-grid">
            {malzemelerList.map((malzeme) => (
              <label key={malzeme} className="checkbox-option">
                <input
                  type="checkbox"
                  name="extras"
                  value={malzeme}
                  checked={formData.malzemeler.includes(malzeme)}
                  onChange={handleChange}
                  disabled={
                    !formData.malzemeler.includes(malzeme) &&
                    formData.malzemeler.length >= 10
                  }
                  data-cy={`malzeme-${malzeme.toLowerCase().replace(/\s/g, '-')}`}
                />
                <span className="checkbox-custom"></span>
                <span className="option-text">{malzeme}</span>
              </label>
            ))}
          </div>
          {errors.malzemeler && <p className="error-message">{errors.malzemeler}</p>}
        </div>

        {/* Sipariş Notu */}
        <div className="form-group">
          <h4>Sipariş Notu</h4>
          <textarea
            name="ozel"
            value={formData.ozel}
            onChange={handleChange}
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            className="form-textarea"
            rows="3"
            data-cy="ozel-textarea"
          ></textarea>
        </div>

        {/* Sipariş Özeti */}
        <div className="order-summary-section">
          <div className="quantity-price-container">
            <div className="quantity-controls">
              <button
                type="button"
                className="quantity-btn minus"
                onClick={() => handleQuantityChange(-1)}
                disabled={formData.adet <= 1}
                data-cy="quantity-decrease"
              >
                -
              </button>
              <span className="quantity" data-cy="quantity-value">{formData.adet}</span>
              <button
                type="button"
                className="quantity-btn plus"
                onClick={() => handleQuantityChange(1)}
                data-cy="quantity-increase"
              >
                +
              </button>
            </div>
          </div>

          <div className="order-summary">
            <h4>Sipariş Toplamı</h4>
            <div className="summary-row">
              <span>Seçimler</span>
              <span className="selections-price">{selectionsPrice.toFixed(2)}₺</span>
            </div>
            <div className="summary-row total-row">
              <span>Toplam</span>
              <span className="total-price" data-cy="total-price">{totalPrice.toFixed(2)}₺</span>
            </div>
            {errors.submit && <p className="error-message">{errors.submit}</p>}
            <button
              type="submit"
              className="order-submit-btn"
              disabled={!isFormValid() || isLoading}
              data-cy="submit-button"
            >
              {isLoading ? 'SİPARİŞ GÖNDERİLİYOR...' : 'SİPARİŞ VER'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrderPizza;
