/*function populate() {
    while(true) {
      let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
      if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
      document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
    }
  }

  window.addEventListener('scroll', populate);

  populate(); // инициализация документа



arrowTop.onclick = function() {
  window.scrollTo(pageXOffset, 0)
}

window.addEventListener('scroll', () => {
  arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight)
})*/


function isVisible(elem) {

  let coords = elem.getBoundingClientRect();
  let windowHeight = document.documentElement.clientHeight;
  let topVisible = coords.top > 0 && coords.top < windowHeight;
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}

function showVisible() {
  for (let img of document.querySelectorAll('img')) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {
      realSrc += '?nocache=' + Math.random();

      img.src = realSrc;

      img.dataset.src = '';
    }
  }
}

window.addEventListener('scroll', showVisible);
showVisible();