/*function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

//Rabbit.prototype = {}; // alert всё равно true, значение меняется только после создания rabbit
//Rabbit.prototype.eats = false; // alert будет false, так как изменено значение ссылки
//delete rabbit.eats; // alert будет true, так как у объекта rabbit нет свойства eats
delete Rabbit.prototype.eats; // alert будет undefined, так как свойство удалено из прототипа

alert( rabbit.eats ); // true*/



function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (сработало!)


function User2(name) {
  this.name = name;
}
User2.prototype = {}; // (*)

let user3 = new User2('John');
let user4 = new user3.constructor('Pete');

alert( user4.name ); // undefined