/*let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
  };
  
  let doublePrices = Object.fromEntries(
    // преобразовать в массив, затем map, затем fromEntries (обратно в объект)
    Object.entries(prices).map(([key, value]) => [key, value * 2])
  );
  
  alert(doublePrices.meat); // 8*/





/*let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

alert( sumSalaries(salaries) ); // 650

function sumSalaries(sal){
    /*let sum = 0;
    for(let value of Object.values(sal)){
        sum += value;        
    }
    return sum*/
    /*return Object.values(sal).reduce((a, b) => a + b, 0);
}*/





let user = {
    name: 'John',
    age: 30
};

alert( count(user) ); // 2

function count(elems){
    return Object.keys(elems).length;
}