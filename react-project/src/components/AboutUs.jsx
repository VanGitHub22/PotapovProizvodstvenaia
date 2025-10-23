const AboutUs = () => {
  return (
    <div className="about_us" id="about">
      <div className="container2">
        <h2>О компании</h2>
      </div>
      <div className="container">
        <div className="about_logo"><img src="/img/logo2.png" alt="Логотип компании" /></div>
      </div>
      <div className="container2">
        <div className="about_us_inner">
          <p className="p1">Производственная компания «Строй Маркет» - Ваш надежный поставщикдревесных материалов. Мы занимаем лидирующие позиции в Перми и области по оптовым и розничным поставкам стройматериалов.</p>
          <p className="p2">Основные направления нашей компании:</p>
          <div className="with_-">
            <div className="tire"></div>
            <p>Собственное производство блоков из древесины, ее специальной обработки в лаке и другом материале</p>
          </div>
          <div className="with_-">
            <div className="tire"></div>
            <p>Поставки всех необходимых строительных материалов для комплектации объектов: дома, утепленные дома, бани постройки древесного типа</p>
          </div>
          <p className="p3">Поставки всех необходимых строительных материалов для комплектации объектов: дома, утепленные дома, бани постройки древесного типа</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;