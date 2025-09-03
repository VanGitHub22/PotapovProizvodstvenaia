/*let recipeMap = new Map([
    ["огурец", 500],
    ["помидор", 350],
    ["лук",    50]
]);

// перебор по ключам (овощи)
for (let vegetable of recipeMap.keys()) {
    alert(vegetable); // огурец, помидор, лук
}

// перебор по значениям (числа)
for (let amount of recipeMap.values()) {
    alert(amount); // 500, 350, 50
}

// перебор по элементам в формате [ключ, значение]
for (let entry of recipeMap) { // то же самое, что и recipeMap.entries()
    alert(entry); // огурец,500 (и так далее)
}







function unique(arr) {
    let set = new Set(arr)
    return Array.from(set)
  }
  
  let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
  ];
  
  alert( unique(values) ); // Hare,Krishna,:-O



let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" или "PAN,cheaters,era"

function aclean(arr){
    let map = new Map()

    for(let word of arr){
        let sorted = word.toLowerCase().split("").sort().join("")
        map.set(sorted, word)
    }
    console.log(map)
    return Array.from(map.values())
}*/






let map = new Map();

map.set("name", "John");

let keys = Array.from(map.keys());

// Error: keys.push is not a function
// Ошибка: keys.push -- это не функция
keys.push("more");