/*let obj = {
  name: "John"
}

function A() { return obj }
function B() { return obj }

let a = new A();
let b = new B();

alert( a == b ); // вернет true


function Calculator(){
  this.read = function(){
    this.a = +prompt("введите число а")
    this.b = +prompt("введите число b")
  }
  this.sum = function(){
    return this.a + this.b
  }
  this.mul = function(){
    return Number(this.a) * Number(this.b)
  }
}

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );



*/

let accumulator = new Accumulator(1);

accumulator.read(); 
accumulator.read();

alert(accumulator.value);

function Accumulator(startingValue){
  this.value = startingValue;
  this.read = function(){
    this.value += +prompt("Введите число", 0);
  }
}