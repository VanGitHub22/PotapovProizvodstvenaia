function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Каким будет результат? // Ошибка



let calculator = {
  a: 0,
  b: 0,
  read: function() {
    this.a = prompt("Введите число а");
    this.b = prompt("Введите число b");
  },
  sum: function() {
    return (Number(this.a) + Number(this.b))
  },
  mul: function() {
    return (this.a * this.b)
  }

};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );



let ladder = {
  step: 0,
  up() {
    this.step++;
    return this
  },
  down() {
    this.step--;
    return this
  },
  showStep: function() { // показывает текущую ступеньку
    alert( this.step );
    return this
  }
};