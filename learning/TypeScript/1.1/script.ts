class User{
    name : string;
    constructor(_name:string){
          
        this.name = _name;
    }
}
const tom : User = new User("Том");
const header = this.document.getElementById("header");
header!.innerHTML = "Привет " + tom.name;

let x: number = 10;

function add(a: number=20, b?: string){
    let el = document.querySelector(".test")
    el?.append(`${b} ${a}`)
}

add(10, "Привет")


function hello (){
    console.log("Hello TypeScript");
};
 
const message: ()=>void = hello;
message();


const sum = (x: number, y: number) => {
    x *= 2;
    return x + y;
};
 
const result = sum(15, 35); // 65
console.log(result);


let id : number | string;
id = "1345dgg5";
console.log(id); // 1345dgg5
id = 234;
console.log(id);  // 234


let list: number[] = [10, 20, 30]; // массив
let colors: string[] = ["red", "green", "blue"];
console.log(list[0]);
console.log(colors[1]);

const people: ReadonlyArray<string> = ["Tom", "Bob", "Sam"];


let user: [string, number] = ["Tom", 36]; // картеж
console.log(user[1]); // 36
user[1] = 37;
console.log(user[1]); // 37


function addNumbers(firstNumber: number, ...numberArray: number[]): number { // функция принимала набор однотипных параметров, то используется знак многоточия
      
    let result = firstNumber;
    for (let i = 0; i < numberArray.length; i++) {
        result+= numberArray[i];
    }
    return result;
}
  
let num1 = addNumbers(3, 7, 8);
console.log(num1); // 18
  
let num2 = addNumbers(3, 7, 8, 9, 4);
console.log(num2); // 31


enum Season {
  Winter,
  Spring,
  Summer,
  Autumn
}
Season.Winter // 0
Season.Summer // 2

enum Season {
  Winter = "Зима",
  Spring = "Весна"
}

Season.Winter // "Зима"

function greet(time: Season) {
  if (time === Season.Morning) console.log("Доброе утро");
}