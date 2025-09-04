/*function printNumbers(from, to){
    let a = from;
    let interval = setInterval(() => {
        if(a <= to){
            alert(a)
            a++
        } else {
            clearInterval(interval)
        }
    }, 1000, from, to)
} // setInterval

printNumbers(1, 10)

function printNumbersRek(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

printNumbersRek(5, 10); */



let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// предположим, что время выполнения этой функции >100 мс
for(let j = 0; j < 100000000; j++) {
  i++;
}
