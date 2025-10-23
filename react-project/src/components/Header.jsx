const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header_inner">
          <div className="logo">
            <img src="/img/logo.png" alt="Логотип компании" />
          </div>
          <nav>
            <a href="#products" className="nav_link">Каталог</a>
            <a href="#services" className="nav_link">Услуги</a>
            <a href="#transfer" className="nav_link">Доставка</a>
            <a href="#about" className="nav_link">О компании</a>
            <div className="nav_link">
              <p>Звоните</p>
              <div className="number">
                <img src="/img/phone.png" alt="Телефон" />
                <p>+7-987-654-1232</p>
              </div>
            </div>
          </nav>
          <div className="nav_phone">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;