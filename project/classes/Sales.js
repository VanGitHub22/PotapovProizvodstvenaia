export class Sale {
  constructor(data) {
    this.id = data.id || null;
    this.name = data.name; // Наименование товара
    this.salePrice = Number(data.salePrice); // Цена продажи
    this.costPrice = Number(data.costPrice); // Себестоимость
    this.quantity = Number(data.quantity); // Количество
    this.date = data.date || new Date().toISOString().split('T')[0]; // Дата
  }

  // Прибыль с одной единицы
  get profitPerUnit() {
    return this.salePrice - this.costPrice;
  }

  // Общая прибыль
  get totalProfit() {
    return this.profitPerUnit * this.quantity;
  }

  // Выручка
  get revenue() {
    return this.salePrice * this.quantity;
  }
}
