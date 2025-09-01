alert(undefined ?? NaN ?? null ?? "" ?? " "); // NaN

let city = null;
city ??= "Берлин";
city ??= null;
city ??= "Кёльн";
city ??= "Гамбург";
alert(city); // Берлин



let num1 = 10,
    num2 = 20,
    result;

result ??= num1 ?? num2;