let div = document.body.firstElementChild || document.body.children[0] || document.body.childNodes[1];
let ul = document.body.lastElementChild || document.children[1];
let li = ul.lastChild || document.body.lastElementChild.lastElementChild;





/*Если elem – произвольный узел DOM-элемента…

Правда, что elem.lastChild.nextSibling всегда равен null?   Да, у последнего ребенка нет nextSibling
Правда, что elem.children[0].previousSibling всегда равен null Нет, там может быть родитель ?*/



let table = document.getElementsByTagName("table")[0];

for(let i = 0; i < table.rows.length; i++){
    let row = table.rows[i]
    console.log(row)
    row.cells[i].style.backgroundColor = 'red'
}