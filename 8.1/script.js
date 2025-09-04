/*let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// walk взят из прототипа
rabbit.walk(); 
alert(rabbit.eats)




let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

// модифицирует rabbit.isSleeping
rabbit.walk();
rabbit.sleep();
animal.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (нет такого свойства в прототипе)







let animal = {
  jumps: null
};

let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? true

delete rabbit.jumps;

alert( rabbit.jumps ); // ? null

delete animal.jumps;

alert( rabbit.jumps ); // ? undefined



let head = {
  glasses: 1,
};

let table = {
  pen: 3,
  __proto__: head
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table
};

let pockets = {
  money: 2000,
  __proto__: bed
};




let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

console.log(Object.entries(animal))

rabbit.eat(); // rabbit, так как тут this это rabbit
console.log(Object.entries(rabbit))

*/

let hamster = {
  stomach: [],

  eat(food) {
    this.stomach = [food];
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Этот хомяк нашёл еду
speedy.eat("apple");
alert( speedy.stomach ); // apple

// У этого хомяка тоже есть еда. Почему? Исправьте
alert( lazy.stomach ); // apple 