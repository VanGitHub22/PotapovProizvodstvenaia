/*let user = { name: "John", years: 30 };

// ваш код должен быть с левой стороны:
// ... = user

let {name, years: age, isAdmin = false} = user;

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false*/




let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250,
    "Watson": 500
  };

function findMaxName(){
    let max = 0;
    let maxName = null;
    for (let [key, value] of Object.entries(salaries)) {
        max = Math.max(max, value)
        if(max <= value) maxName = key
    }
    return maxName
}
console.log(findMaxName())
