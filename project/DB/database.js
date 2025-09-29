let line = (el) => {
  return `<td><div class="tableText">${el.name}</div></td>
          <td><div class="tableText">${el.price}</div></td>
          <td><div class="tableText">${el.costPrice}</div></td>
          <td><div class="tableText">${el.date}</div></td>
          <td><div class="tableText">${el.count}</div></td>
          <td><div class="tableText">${el.revenue}</div></td>
          <td><div class="edit_btn" data-id="${el.id}"><img src="./img/pen.png" alt=""></div></td>
          <td><div class="delete_btn" data-id="${el.id}"><img src="./img/trash.png" alt=""></div></td>`
}

let db;
let request = indexedDB.open("Sales", 7);

document.querySelector("#colGraphSelect").addEventListener('change', () => {
    createColumnGraph(Number(colGraphSelect.value))
    createPieGraph(Number(colGraphSelect.value))
})

request.onerror = function(event) {
  console.error("Ошибка базы:", event.target.error);
};

request.onupgradeneeded = function(event) {
  db = event.target.result;
  if(!db.objectStoreNames.contains('Sales')){
    db.createObjectStore('Sales', {keyPath: 'id', autoIncrement: true});
  }
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log("База открыта");
  displaySales("closed")
};

function dateToString(dateDate) {
  let parts = dateDate.split('-')
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

function stringToDate(dateString) {
  let parts = dateString.split('.');
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

function stringFortDate(date){
  let parts = date.split('.');
  return new Date(
    parseInt(parts[2]),
    parseInt(parts[1]) - 1,
    parseInt(parts[0])
  );
}

let add_btn = document.querySelector(".add_btn")
add_btn.addEventListener("click", () => {
  document.getElementById("edith3").innerHTML = "Добавить продажу"
  document.getElementById('editModal').dataset.action = "add"
  document.getElementById('editModal').style.display = 'block';
  document.getElementById('modalOverlay').style.display = 'block';
})

let closeModal = document.getElementById("closeModal")
closeModal.addEventListener('click', () => {
  document.getElementById('editModal').style.display = 'none';
  document.getElementById('modalOverlay').style.display = 'none';
})

function displaySales(pattern){
  let transaction = db.transaction(['Sales'], 'readonly')
  let sales = transaction.objectStore('Sales')
  let request = sales.getAll()
  request.onsuccess = function () {
    let result = request.result
    let tbody = document.querySelector('tbody')
    tbody.innerHTML = '';
    console.log("Обновлено")

    if(result.length === 0){
      tbody.innerHTML = "<tr><td>Продаж нет</td></tr>"
      return
    }
    if(result.length > 7){
      document.querySelector(".more").style.display = "flex";
    } else {
      document.querySelector(".more").style.display = "none";
    }

    let profit = 0;
    result.sort((a, b) => b.revenue - a.revenue)
    let limitResult = result.slice(0, 7)
    result.forEach(sale => profit += sale.revenue )
    
    let usingResult;
    pattern == "closed" ? usingResult = limitResult : usingResult = result
    usingResult.forEach(sale => {
      let item = document.createElement("tr")
      item.innerHTML = line(sale)
      item.dataset.id = sale.id;
      tbody.appendChild(item)
      let edit_Btns = document.querySelectorAll(".edit_btn")
      for(let edit_btn of edit_Btns){
        if(edit_btn.dataset.id == sale.id){
          edit_btn.onclick = function() {
            openModal(sale.id, "edit");
          }
        }
      }
      let delete_Btns = document.querySelectorAll(".delete_btn")
      for(let delete_Btn of delete_Btns){
        if(delete_Btn.dataset.id == sale.id){
          delete_Btn.onclick = function() {
            deleteSale(sale.id, () => {
              displaySales()
            });
          }
        }
      }
    })
    let years = result.reduce((acc, item) => {
      let fulldate = item.date
      let year = fulldate.split('.')
      if(!acc.includes(year[2])){
        acc.push(year[2])
      }
      return acc;
    }, [])
    if (years.length > 0) {
      const defaultYear = Number(years[0]);
      createColumnGraph(defaultYear);
      createPieGraph(defaultYear);
    }
    let colGraphSelect = document.querySelector("#colGraphSelect")
    colGraphSelect.innerHTML = ""
    years.forEach(year => {
      let option = document.createElement('option')
      option.value = year
      option.text = year
      colGraphSelect.append(option)
    })

    
    document.querySelector(".costPrice").innerHTML = `<p>Прибыль: ${profit}р</p>`

  }

  request.onerror = function () {
    console.error("Ошибка при загрузке продаж:", request.error);
  };
}

let more = document.querySelector(".more")
let img = document.querySelector(".more img")
more.addEventListener("click", () => {
  if(more.dataset.open == "closed"){  
    more.dataset.open = "open";
    displaySales("open")
    img.style.rotate = "180deg"
  } else {
    displaySales("closed")
    more.dataset.open = "closed";
    let img = more.querySelector("img")
    img.style.rotate = "0deg"
  }
})


function deleteSale(id, callback) {
  if(confirm(`Удалить продажу №${id}`)){
    let transaction = db.transaction(['Sales'], 'readwrite');
    let sales = transaction.objectStore('Sales');

    let request = sales.delete(id);

    request.onsuccess = function () {
      console.log(`Продажа ${id} удалена`);
      callback();
    };
    
    request.onerror = function () {
      console.error("Ошибка при удалении:", request.error);
      alert("Не удалось удалить запись");
    };
  }
}


function openModal(id, action) {
  let transaction = db.transaction(['Sales'], 'readonly');
  let sales = transaction.objectStore('Sales');

  let request = sales.get(id);
  if(action == "edit"){
    document.getElementById("edith3").innerHTML = "Редактировать продажу"
    request.onsuccess = function () {
      document.getElementById('editModal').dataset.action = "edit"
      let sale = request.result;
      document.getElementById('edit-id').value = sale.id;
      document.getElementById('edit-name').value = sale.name;
      document.getElementById('edit-price').value = sale.price;
      document.getElementById('edit-costPrice').value = sale.costPrice;
      document.getElementById('edit-count').value = sale.count;
      document.getElementById('edit-date').value = stringToDate(sale.date);
  
      document.getElementById('editModal').style.display = 'block';
      document.getElementById('modalOverlay').style.display = 'block';
    };
  } 

  request.onerror = function () {
    console.error("Ошибка при получении записи:", request.error);
  };
}


function mainForm(){
  let Sale;
  const today = new Date()
  const weekAgo = new Date(today);
  const weekPast = new Date(today);
  weekAgo.setDate(today.getDate() - 7);
  weekPast.setDate(today.getDate() + 7);
  if(document.getElementById('editModal').dataset.action == "edit"){
    const id = Number(document.getElementById('edit-id').value);
    const date = new Date(document.getElementById('edit-date').value)
    if(date.getTime() < weekAgo.getTime() || date.getTime() > weekPast.getTime()){
      alert("Дата не дольжна превышать неделю от сегодняшнего дня")
      return
    }
    Sale = {
      id: id,
      name: document.getElementById('edit-name').value,
      price: Number(document.getElementById('edit-price').value),
      costPrice: Number(document.getElementById('edit-costPrice').value),
      count: Number(document.getElementById('edit-count').value),
      date: dateToString(document.getElementById('edit-date').value),
      revenue: (Number(document.getElementById('edit-price').value) - Number(document.getElementById('edit-costPrice').value)) * Number(document.getElementById('edit-count').value)
    };
    
  } else {
    const date = new Date(document.getElementById('edit-date').value)
    if(date.getTime() < weekAgo.getTime() || date.getTime() > weekPast.getTime()){
      alert("Дата не дольжна превышать неделю от сегодняшнего дня")
      return
    }
    Sale = {
      name: document.getElementById('edit-name').value,
      price: Number(document.getElementById('edit-price').value),
      costPrice: Number(document.getElementById('edit-costPrice').value),
      count: Number(document.getElementById('edit-count').value),
      date: dateToString(document.getElementById('edit-date').value),
      revenue: (Number(document.getElementById('edit-price').value) - Number(document.getElementById('edit-costPrice').value)) * Number(document.getElementById('edit-count').value)
    };
  }
  let request;

  if(!/^[а-яА-Я0-9\s]+$/.test(Sale.name)){
    alert("Имя должно содержать только буквы или цифры")
    return
  }
  if(!/^[0-9]+$/.test(Sale.price)){
    if(!Sale.price > 0){
      alert("Цена должна быть числом, которое больше 0")
      return
    }
  }
  if(!/^[0-9]+$/.test(Sale.costPrice)){
    if(!Sale.costPrice > 0){
      alert("Себестоимость должна быть числом, которое больше 0")
      return
    }
  }
  if(!/^[0-9]+$/.test(Sale.count)){
    if(!Sale.count > 0){
      alert("Количество должна быть числом, которое больше 0")
      return
    }
  }

  let form = document.getElementById("editForm")
  form.reset()

  let transaction = db.transaction(['Sales'], 'readwrite');
  let sales = transaction.objectStore('Sales');
  if(document.getElementById('editModal').dataset.action == "edit"){
    request = sales.put(Sale);
  } else {
    
    request = sales.add(Sale);
  }

  request.onsuccess = function () {
    console.log("Продажа обновлена");
    document.getElementById('editModal').style.display = 'none';
    document.getElementById('modalOverlay').style.display = 'none';
    displaySales();
  };

  request.onerror = function () {
    console.error("Ошибка при обновлении:", request.error);
    alert("Не удалось сохранить изменения");
  };
}

document.getElementById('editForm').addEventListener('submit', function (e) {
  e.preventDefault();
  mainForm()
});



let loginForm = document.getElementById("loginForm")
let login = document.getElementById("login");
let password = document.getElementById("password");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let loginValue = document.getElementById("login").value;
  let passwordValue = document.getElementById("password").value;

  if(loginValue == "admin" && passwordValue == "admin"){
    let hieght = window.innerHeight;
    let fullLoginForm = document.querySelector(".login")
    fullLoginForm.style.transform = `translateY(${-hieght}px)`
  } else {
    login.style.borderColor = "#ff0000"
    login.style.animation = "block .3s ease-in"
    password.style.borderColor = "#ff0000"
    password.style.animation = "block .3s ease-in"
    setTimeout(() => {
      login.style.animation = ""
      password.style.animation = ""
    }, 300)
  }
})

login.addEventListener("input", () => {
  login.style.borderColor = "#cacaca"
  password.style.borderColor = "#cacaca"
})

password.addEventListener("input", () => {
  login.style.borderColor = "#cacaca"
  password.style.borderColor = "#cacaca"
})


let exit = document.querySelector(".exit")

exit.addEventListener("click", () => {
  loginForm.reset()
  let fullLoginForm = document.querySelector(".login")
  fullLoginForm.style.transform = `translateY(${0}px)`
})



/*Графики через библиотеку ApexCharts*/


let barChart = null;   // экземпляр столбчатого графика
let pieChart = null;   // экземпляр кругового графика

function createColumnGraph(year) {
  const transaction = db.transaction(['Sales'], 'readonly');
  const sales = transaction.objectStore('Sales');
  const request = sales.getAll();

  request.onsuccess = function () {
    const result = request.result;
    const salesInChoosedYear = result.filter(sale => {
      const date = stringFortDate(sale.date);
      return date.getFullYear() === year;
    });

    // Сортировка по дате
    salesInChoosedYear.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('.').map(Number);
      const [dayB, monthB, yearB] = b.date.split('.').map(Number);
      return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
    });

    // Берём топ-7 товаров
    const limitResult = salesInChoosedYear.slice(0, 7);
    const items = limitResult.map(sale => sale.name);
    const revenues = limitResult.map(sale => sale.revenue);

    const ctx = document.getElementById('chart').getContext('2d');

    // Настройки цветов (можно генерировать или задать)
    const backgroundColors = items.map(() => randomColor());

    if (barChart) {
      // Обновляем данные существующего графика
      barChart.data.labels = items;
      barChart.data.datasets[0].data = revenues;
      barChart.data.datasets[0].backgroundColor = backgroundColors;
      barChart.options.plugins.title.text = `Топ-7 товаров ${year} года`;
      barChart.update(); // перерисовка
    } else {
      // Создаём новый график
      barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: items,
          datasets: [{
            label: 'Выручка (₽)',
            data: revenues,
            backgroundColor: backgroundColors,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Топ-7 товаров ${year} года`
            },
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Выручка'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Товары'
              }
            }
          }
        }
      });
    }
  };

  request.onerror = () => {
    console.error("Ошибка при загрузке продаж:", request.error);
  };
}

function createPieGraph(year) {
  const transaction = db.transaction(['Sales'], 'readonly');
  const sales = transaction.objectStore('Sales');
  const request = sales.getAll();

  request.onsuccess = function () {
    const result = request.result;
    const salesInChoosedYear = result.filter(sale => {
      const date = stringFortDate(sale.date);
      return date.getFullYear() === year;
    });

    // Доход по месяцам
    const perMonth = Array(12).fill(0);
    salesInChoosedYear.forEach(sale => {
      const [day, month, year] = sale.date.split('.').map(Number);
      perMonth[month - 1] += sale.revenue;
    });

    const labels = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const colors = labels.map(() => randomColor());

    const ctx2 = document.getElementById('chart2').getContext('2d');

    if (pieChart) {
      // Обновляем данные
      pieChart.data.labels = labels;
      pieChart.data.datasets[0].data = perMonth;
      pieChart.options.plugins.title.text = `Доход по месяцам (${year})`;
      pieChart.update();
    } else {
      // Создаём круговой график
      pieChart = new Chart(ctx2, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Выручка',
            data: perMonth,
            backgroundColor: colors,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Доход по месяцам (${year})`
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }
  };

  request.onerror = () => {
    console.error("Ошибка при загрузке продаж:", request.error);
  };
}
function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}




