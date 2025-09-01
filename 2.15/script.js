function checkAge(age) {
  if (age > 18) {
    return true;
  }
  return confirm('Родители разрешили?'); // работает, так как всегда выполняется только один return
}


function checkAge(age) {
    return age > 18 ? true : confirm('Родители разрешили?');
}

function checkAge(age) {
  return (age > 18) || confirm('Родители разрешили?');
}


function min(a, b){
    return a > b ? a : b 
}



function pow(x, n){
    let y = x;
    for(let i = 1; i < n; i++){
        y *= x 
    }
    return y
}

let x = +prompt("x")
let n = +prompt("n")
if(n >= 1 && n % 1 == 0){
    alert(pow(x, n))
} else {
    alert(`Степень должна быть натуральным числом`);
}