const productsData = [
  { id: 1, name: 'Дуб спрессованный', description: 'Применяется для утепленных домов', price: 'От 12 руб/м' },
  { id: 2, name: 'Ель спресованная', description: 'Более легкий аналог дуба', price: 'От 10 руб/м' },
  { id: 3, name: 'Береза спресованная', description: 'Хороший вариант для летнего домика', price: 'От 9 руб/м' },
  { id: 4, name: 'Ель спресованная', description: 'Применяется для утепленных домов', price: 'От 12 руб/м' },
];

const OurProducts = () => {
  return (
    <div className="our_product" id="products">
      <div className="container2">
        <div className="our_product_inner">
          <h2>Наша продукция</h2>
          <div className="products">
            {productsData.map((product) => (
              <div key={product.id} className="product">
                <div className="prod_text">
                  <h3>{product.name}</h3>
                  <h4>{product.description}</h4>
                  <h4>{product.price}</h4>
                </div>
                <div className="product_img">
                  <img src={`./img/dub${product.id}.png`} alt={product.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProducts;