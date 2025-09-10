ul.onclick = function(e){
  if(e.target.tagName != "LI") return;

  if(e.ctrlKey || e.metaKey){
    toggleSelect(e.target)
  } else {
    singleSelect(e.target)
  }
}

ul.onmousedown = function() {
  return false;
};

function toggleSelect(li){
  li.classList.toggle('selected')
}

function singleSelect(li){
  let selected = ul.querySelectorAll('.selected');
  for(let el of selected){
    el.classList.remove('selected')
  }
  li.classList.add('selected')
}