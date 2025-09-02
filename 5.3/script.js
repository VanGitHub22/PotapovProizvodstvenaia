alert(ucFirst("вася") == "Вася");

function ucFirst(word){
  return word = word[0].toUpperCase() + word.slice(1);
}



let checkSpam = (word) => {
  word = word.toLowerCase()
  return word.includes("viagra") || word.includes("xxx")
}
alert(checkSpam('buy ViAgRA now'))
alert(checkSpam('free xxxxx'))
alert(checkSpam("innocent rabbit"))




function truncate(str, maxlength){
  if(str.length > maxlength){
    return str.slice(0, maxlength - 1) + "..."
  } else {
    return str
  }
}

alert(truncate("Вот, что мне хотелось бы сказать на эту тему:", 20))

alert(truncate("Всем привет!", 20))




alert(extractCurrencyValue('$120') === 120); // true

function extractCurrencyValue(value) {
  let num = "";
  for(let i = 0; i < value.length; i++){
    if(parseInt(value[i]) || value[i] == 0){
      num += value[i]
    }
  }
  return Number(num)
}