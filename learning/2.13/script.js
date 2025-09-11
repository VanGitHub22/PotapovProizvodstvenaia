/*let i = 3;

while (i) {
  alert( i-- ); // 1
}


let i1 = 0;
while (++i1 < 5) alert( i1 ); // 1 2 3 4

let i2 = 0;
while (i2++ < 5) alert( i2 ); // 1 2 3 4 5


for (let i = 0; i < 5; i++) alert( i ); // 0 1 2 3 4

for (let i = 0; i < 5; ++i) alert( i ); // 0 1 2 3 4


for(let i = 2; i <= 10; i++){
    i % 2 == 0 ? alert(i) : "" 
}


let iWhile = 0;
while(iWhile < 3){
    alert( `number ${iWhile}!` );
    iWhile++;
}

let number = prompt()
while(number < 100){
    number = prompt("Введите число еще раз")
    if(number == null){
        number = 101;
    }
}*/

let number = prompt();
part:
for(let i = 2; i <= number; i++){
    for(let j = 2; j < i; j++){
        if(i % j == 0){
            continue part;
        }
    }
    alert(i)
}
