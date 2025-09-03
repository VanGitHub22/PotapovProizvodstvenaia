/*let Feb_12_2012 = new Date(2012, 1, 20, 3, 12)
alert(Feb_12_2012)



let date = new Date(2012, 0, 3);  // 3 января 2012 года
alert( getWeekDay(date) );        // нужно вывести "ВТ"

function getWeekDay(d){
    let days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
    return days[d.getDay()]
}





let date = new Date(2012, 0, 3);  // 3 января 2012 года
alert( getLocalDay(date) ); 

function getLocalDay(d){
    return d.getDay()+1
}





let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)

function getDateAgo(date, day) {
    let dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() - day);
    return dateCopy.getDate();
  }




function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28



function getSecondsToday(){
    let date = new Date()
    let nowHour = date.getHours()
    let nowMinute = date.getMinutes()
    let nowSecond = date.getSeconds()
    return `${nowHour}:${nowMinute}:${nowSecond} | ${(nowHour * 24 * 60) + (nowMinute * 60) + nowSecond}` 
}

alert(getSecondsToday())

function getSecondsToTomorrow(){
    let date = new Date()
    let nowHour = 24 - date.getHours()
    let nowMinute = 60 - date.getMinutes()
    let nowSecond = 60 - date.getSeconds()
    return `${nowHour}:${nowMinute}:${nowSecond} | ${(nowHour * 24 * 60) + (nowMinute * 60) + nowSecond}` 
}

alert(getSecondsToTomorrow())*/



function formatDate(date) {
    let diff = new Date() - date; // разница в миллисекундах
  
    if (diff < 1000) { // меньше 1 секунды
      return 'прямо сейчас';
    }
  
    let sec = Math.floor(diff / 1000); // преобразовать разницу в секунды
  
    if (sec < 60) {
      return sec + ' сек. назад';
    }
  
    let min = Math.floor(diff / 60000); // преобразовать разницу в минуты
    if (min < 60) {
      return min + ' мин. назад';
    }
  
    // отформатировать дату
    // добавить ведущие нули к единственной цифре дню/месяцу/часам/минутам
    let d = date;
    d = [
      '0' + d.getDate(),
      '0' + (d.getMonth() + 1),
      '' + d.getFullYear(),
      '0' + d.getHours(),
      '0' + d.getMinutes()
    ].map(component => component.slice(-2)); // взять последние 2 цифры из каждой компоненты
  
    // соединить компоненты в дату
    return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
  }
  
  alert( formatDate(new Date(new Date - 1)) ); // "прямо сейчас"
  
  alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 сек. назад"
  
  alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 мин. назад"
  
  // вчерашняя дата вроде 31.12.2016, 20:00
  alert( formatDate(new Date(new Date - 86400 * 1000)) );