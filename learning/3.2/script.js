function pow(x, n) // пробелы между свойствами
{
  let result = 1; // пробелы при присваивании

  for(let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?"), 
n = prompt("n?")

if (n <= 0){
  alert(`Степень ${n} не поддерживается, введите целую степень, большую 0`);
} else {
  alert(pow(x, n))
}