if ("0") {
  alert( 'Привет' );
} // выведет

/*-----------------*/
if(prompt("Какое «официальное» название JavaScript?") == "ECMAScript"){
    alert("Верно");
} else {
    alert("Не знаете? ECMAScript!");
}

/*-----------------*/
let userNum = prompt("Введите число");
if(userNum > 0){
    alert("1");
} else if(userNum < 0){
    alert("-1");
} else {
    alert("0")
}

/*-----------------*/
let result;
a + b < 4 ? result = "Мало" : "Много";

/*-----------------*/
let message =
login == "Сотрудник" ? 'Привет' 
: login == "Директор" ? 'Здравствуйте' 
: login == "" ? 'Нет логина' 
: ''

