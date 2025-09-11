let fruits = ["Яблоки", "Груша", "Апельсин"];

// добавляем новое значение в "копию"
let shoppingCart = fruits;
shoppingCart.push("Банан");

// что в fruits?
alert( fruits.length ); // 4


let styles = ["Джаз", "Блюз"]
styles.push("Рок-н-ролл")
let center = (styles.length - 1) / 2
styles[center] = "Классика"
alert( styles.shift() );
styles.unshift("Рэп", "Регги");
console.log(styles)




let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // a, b, function(){}




function sumInput() {
  let numbers = [];

  while (true) {
    let value = prompt("Введите число", 0);
    if (value === "" || value === null || !isFinite(value)) break;
    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() );




function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // для каждого элемента массива
    partialSum += item; // добавляем значение элемента к partialSum
    maxSum = Math.max(maxSum, partialSum); // запоминаем максимум на данный момент
    if (partialSum < 0) partialSum = 0; // ноль если отрицательное
  }

  return maxSum;
}