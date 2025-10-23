const Transfer = () => {
  return (
    <div className="transfer" id="transfer">
      <div className="container2">
        <div className="transfer_inner1">
          <h2>Доставка</h2>
          <div className="transfer_inner">
            <div className="transfer_left">
              <h3>Условия доставки</h3>
              <h4>Чем крупнее ваш заказ — <br /><span>тем дешевле доставка</span></h4>
              <a href="#">Заказать</a>
            </div>
            <div className="transfer_right">
              <table className="table1">
                <tbody>
                  <tr>
                    <td>Сумма заказа, рублей</td>
                    <td>Доставка, % от заказа</td>
                  </tr>
                </tbody>
              </table>
              <table className="table2">
                <tbody>
                  <tr>
                    <td>менее 50 000</td>
                    <td>17%</td>
                  </tr>
                  <tr>
                    <td>от 50 000 до 100 000</td>
                    <td>14%</td>
                  </tr>
                  <tr>
                    <td>от 100 000 до 500 000</td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <td>более 500 000</td>
                    <td>Индивидуально</td>
                  </tr>
                </tbody>
              </table>
              <a href="#">Заказать</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;