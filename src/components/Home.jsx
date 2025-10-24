import { Link } from 'react-router-dom';
import Footer from './Footer';

function Home() {
  const menuCategories = [
    { icon: '🍲', text: 'YENİ! Kore' },
    { icon: '🍕', text: 'Pizza' },
    { icon: '🍔', text: 'Burger' },
    { icon: '🍟', text: 'Kızartmalar' },
    { icon: '🍖', text: 'Fast food' },
    { icon: '🥤', text: 'Gazlı İçecek' },
  ];

  const foodCategories = [
    { id: 1, icon: '/images/iteration-2-images/icons/1.svg', name: 'Ramen', active: false },
    { id: 2, icon: '/images/iteration-2-images/icons/2.svg', name: 'Pizza', active: true },
    { id: 3, icon: '/images/iteration-2-images/icons/3.svg', name: 'Burger', active: false },
    { id: 4, icon: '/images/iteration-2-images/icons/4.svg', name: 'French fries', active: false },
    { id: 5, icon: '/images/iteration-2-images/icons/5.svg', name: 'Fast food', active: false },
    { id: 6, icon: '/images/iteration-2-images/icons/6.svg', name: 'Soft drinks', active: false },
  ];

  const foodItems = [
    {
      id: 1,
      name: 'Terminal Pizza',
      image: '/images/iteration-2-images/pictures/food-1.png',
      rating: 4.9,
      reviews: 200,
      price: 60,
    },
    {
      id: 2,
      name: 'Position Absolute Acı Pizza',
      image: '/images/iteration-2-images/pictures/food-2.png',
      rating: 4.9,
      reviews: 200,
      price: 60,
    },
    {
      id: 3,
      name: 'useEffect Tavuklu Burger',
      image: '/images/iteration-2-images/pictures/food-3.png',
      rating: 4.9,
      reviews: 200,
      price: 60,
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-banner">
          <img src="/images/iteration-1-images/home-banner.png" alt="Teknolojik Yemekler - Pizza Banner" />
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-content">
                <img src="/images/iteration-1-images/logo.svg" alt="Teknolojik Yemekler" className="hero-logo" />
                <p className="hero-subtitle">fırsat kaçırma</p>
                <h1 className="hero-title">
                  <span className="code-text">KOD ACIKTIRIR</span>
                  <span className="pizza-text">PİZZA, DOYURUR</span>
                </h1>
                <Link to="/order" className="hero-cta-button">ACIKTIM</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav-section">
        <div className="container">
          <div className="nav-menu">
            {menuCategories.map((category, index) => (
              <span key={index} className="nav-item">
                <span className="emoji">{category.icon}</span> {category.text}
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="container">
          {/* Pizza Cards Section */}
          <section className="menu-section">
            <div className="menu-grid">
              {/* Special Offers */}
              <div className="special-offers">
                <div className="offer-card large">
                  <div className="card-content">
                    <h3>Özel<br />Lezzetus</h3>
                    <p>Position:Absolute Acı Burger</p>
                    <Link to="/order" className="order-btn">SİPARİŞ VER</Link>
                  </div>
                </div>
                <div className="offer-cards-small">
                  <div className="offer-card small">
                    <div className="card-content">
                      <h4>Hackathlon<br />Burger Menü</h4>
                      <Link to="/order" className="order-btn">SİPARİŞ VER</Link>
                    </div>
                  </div>
                  <div className="offer-card small dark">
                    <div className="card-content">
                      <h4>
                        <span className="red-text">Çoooook</span>{' '}
                        <span className="black-text">hızlı<br />npm gibi kurye</span>
                      </h4>
                      <Link to="/order" className="order-btn">SİPARİŞ VER</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Menu */}
          <section className="popular-menu">
            <p className="section-subtitle">en çok paketlenen menüler</p>
            <h2>Acıktıran Kodlara Doyuran Lezzetler</h2>
            <div className="menu-categories">
              <div className="category-icons">
                {foodCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`category-icon ${category.active ? 'active' : ''}`}
                  >
                    <img src={category.icon} alt={category.name} />
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="food-grid">
              {foodItems.map((food) => (
                <div key={food.id} className="food-card large-card">
                  <img src={food.image} alt={food.name} />
                  <div className="food-content">
                    <h3>{food.name}</h3>
                    <div className="food-info">
                      <div className="rating-section">
                        <span className="rating">{food.rating}</span>
                        <span className="reviews">({food.reviews})</span>
                      </div>
                      <span className="price">{food.price}₺</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
