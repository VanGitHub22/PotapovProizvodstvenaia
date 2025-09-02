let user = {}
user.name = "John";
user.surname = "Smith";
user.name = "Pete";
delete user.name;

function isEmpty(obj){
  for(let key in obj){
    return false;
  }
  return true;
}


const user1 = {
  name: "John"
};
// это будет работать? // да, мы изменяем свойство, а не константу
user1.name = "Pete";


let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}

let sum = 0;

for(salary in salaries){
  sum += salaries[salary];
}
console.log(sum)



let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);


function multiplyNumeric(men){
  for(key in men){
    if(typeof(men[key]) == "number"){
      men[key] *= 2;
    }
  }
}
console.log(menu)