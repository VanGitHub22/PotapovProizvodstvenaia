/*function handler() {
    alert( "..." );
    return false;
  }


contents.onclick = function(event) {

  function handleLink(href) {
    let isLeaving = confirm(`Leave for ${href}?`);
    if (!isLeaving) return false;
  }

  let target = event.target.closest('a');

  if (target && contents.contains(target)) {
    return handleLink(target.getAttribute('href'));
  }
};*/



thumbs.onclick = function(event) {
  let thumbnail = event.target.closest('a');

  if (!thumbnail) return;
  showThumbnail(thumbnail.href, thumbnail.title);
  event.preventDefault();
}

function showThumbnail(href, title) {
  largeImg.src = href;
  largeImg.alt = title;
}