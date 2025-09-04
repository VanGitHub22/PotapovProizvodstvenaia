/*let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

sayHi(); // что будет показано: "John" или "Pete"? // Pete


function makeWorker() {
  let name1 = "Pete";

  return function() {
    alert(name1);
  };
}

let name1 = "John";

// создаём функцию
let work = makeWorker();

// вызываем её
work(); // что будет показано? // Pete






function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

alert( counter2() ); // 0
alert( counter2() ); // 1






function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counterNew = new Counter();

alert( counterNew.up() ); // 1
alert( counterNew.up() ); // 2
alert( counterNew.down() ); // 1





let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

sayHi(); // ошибка, функция существует только внутри if





function sum(a){
  return (function (b) { return a + b })
}

alert(sum(1)(2))


let x = 1;

function func() {
  console.log(x); // Cannot access 'x' before initialization

  let x = 2;
}

func();






function inBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6


function inArray(arr) {
  return function(x) {
    return arr.includes(x);
  };
}
alert( arr.filter(inArray([1, 2, 10])) ); // 1,2







let users = [
  { name: "Иван", age: 20, surname: "Иванов" },
  { name: "Пётр", age: 18, surname: "Петров" },
  { name: "Анна", age: 19, surname: "Каренина" }
];

users.sort(byField('name'));
users.sort(byField('age'));

function byField(fieldName){
  return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
}*/





function makeArmy() {

  let shooters = [];

  for (let i = 0; i < 10; i++) {
    let shooter = function() { // функция shooter
      alert( i ); // должна выводить порядковый номер
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

// все стрелки выводят 10 вместо их порядковых номеров (0, 1, 2, 3...)
army[0](); // 10 от стрелка с порядковым номером 0
army[1](); // 10 от стрелка с порядковым номером 1
army[2](); // 10 ...и т.д.