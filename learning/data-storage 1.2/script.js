//localStorage.setItem('test', 1);
//alert( localStorage.getItem('test') ); // 1

/*for(let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
        continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
    }
    console.log(`${key}:${localStorage.getItem(key)}`); // покажет getItem, setItem и другие встроенные свойства
}*/

let area = document.getElementById("area")
area.value = localStorage.getItem("area")
area.oninput = () => {
    localStorage.setItem("area", area.value)
    console.log(localStorage.getItem('area'))
}