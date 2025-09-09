/*let dataWidgetName = document.querySelector('[data-widget-name]')
console.log(dataWidgetName.getAttribute('data-widget-name'))*/



let links = document.querySelectorAll('a');
console.log(links)
for(let link of links){
  let href = link.getAttribute('href');
  if (!href) continue; // нет атрибута
  if (!href.includes('://')) continue; // нет протокола
  if (href.startsWith('http://internal.com')) continue; // внутренняя
  link.style.color = 'orange';
}

