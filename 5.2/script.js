let a = +prompt()
let b = +prompt()
alert(a + b)


alert(Math.round(6.35 * 10) / 10);


function readNumber() {
  let num;
  do {
    num = prompt("Введите число", 0);
  } while (!isFinite(num));
  if (num === null || num === '') return null;
  return +num;
}

alert(`Число: ${readNumber()}`);


let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}


function random(min, max) {
  return min + Math.random() * (max - min);
}



function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}