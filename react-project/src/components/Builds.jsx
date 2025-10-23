const buildsData = [
  { id: 1, name: 'Народный дом Invictus', area: '50 М²', price: '1 135 400 Р', img: '/img/build1.png' },
  { id: 2, name: 'Народный дом Phantom', area: '36 М²', price: '1 273 500 Р', img: '/img/build2.png' },
  { id: 3, name: 'Народная баня NB1', area: '14 М²', price: '890 500 Р', img: '/img/build3.png' },
  { id: 4, name: 'Народный дом Forest', area: '32 М²', price: '1 169 500 Р', img: '/img/build4.png' },
  { id: 5, name: 'Народный дом Animex', area: '38 М²', price: '1 335 800 Р', img: '/img/build5.png' },
  { id: 6, name: 'Народный дом Voyage', area: '56 М²', price: '1 273 500 Р', img: '/img/build6.png' },
];

const Builds = () => {
  return (
    <div className="builds">
      <div className="container2">
        <div className="builds_inner">
          <h2>Постройки заказчиков</h2>
          <div className="builds_blocks">
            {buildsData.map((build) => (
              <div key={build.id} className="build">
                <div className="build_img">
                  <div className="info1">
                    <h3>Народный дом - минимальная цена квадратного метра без ухудшения потребительских свойств.</h3>
                    <h4>В результате удалось достичь снижения цены на 30-40% за счет:</h4>
                    <ul>
                      <li>оптимизации раскроя бревна при производстве дома для исключения отходов;</li>
                      <li>рационально рассчитанной крыши (при монтаже металлочерепицы исключены обрезки листов);</li>
                      <li>удешевления логистики за счет комплектовки нескольких домов в одну транспортную единицу;</li>
                    </ul>
                  </div>
                  <img src={build.img} alt={build.name} />
                </div>
                <div className="build_text">
                  <div className="text_up">
                    <h4>{build.name}</h4>
                    <h4>{build.area}</h4>
                  </div>
                  <div className="price">{build.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builds;