/*alert(sumTo(100))

function sumTo(a){
  if(a == 0){
    return a
  } else {
    return a + sumTo(a - 1) 
  }
}


alert( factorial(5) );

function factorial(a){
  if(a == 1){
    return a
  } else {
    return a * factorial(a - 1)
  }
}




function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757


let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list){
  console.log(list.value)
  if(list.next)
    printList(list.next)
}

printList(list)*/



let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list){
  if(list.next)
    printList(list.next) 
  console.log(list.value)
}

printList(list)