let a = 1, b = 1;
let c = ++a; // 2
let d = b++; // 2



let a1 = 2;
let x1 = 1 + (a1 *= 2); // 5



"" + 1 + 0 // 10
"" - 1 + 0 // -1
true + false // 1
6 / "3" // 2
"2" * "3" // 6
4 + 5 + "px" // 9px
"$" + 4 + 5 // $45
"4" - 2 // 2
"4px" - 2 // NaN
"  -9  " + 5 //   -9  5
"  -9  " - 5 // -14
null + 1 // 1
undefined + 1 // NaN
" \t \n" - 2 // -2



let a2 = prompt("Первое число?", 1);
let b2 = prompt("Второе число?", 2);

alert(Number(a2) + Number(b2)); // 12