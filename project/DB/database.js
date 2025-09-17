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
let request = indexedDB.open("Sales", 4);

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
  displaySales()
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
  document.getElementById('editModal').dataset.action = "add"
  document.getElementById('editModal').style.display = 'block';
  document.getElementById('modalOverlay').style.display = 'block';
})

let closeModal = document.getElementById("closeModal")
closeModal.addEventListener('click', () => {
  document.getElementById('editModal').style.display = 'none';
  document.getElementById('modalOverlay').style.display = 'none';
})

function displaySales(){
  let transaction = db.transaction(['Sales'], 'readonly')
  let sales = transaction.objectStore('Sales')
  let request = sales.getAll()
  request.onsuccess = function () {
    let result = request.result
    let tbody = document.querySelector('tbody')
    tbody.innerHTML = '';

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
    limitResult.forEach(sale => {
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
more.addEventListener("click", () => {
  if(more.dataset.open == "closed"){
    let transaction = db.transaction(['Sales'], 'readonly')
    let sales = transaction.objectStore('Sales')
    let request = sales.getAll()
    request.onsuccess = function () {
      let result = request.result
      let tbody = document.querySelector('tbody')
      tbody.innerHTML = '';
  
      if(result.length === 0){
        tbody.innerHTML = "<tr><td>Продаж нет</td></tr>"
        return
      }
      let profit = 0;
      result.sort((a, b) => b.revenue - a.revenue)
      result.forEach(sale => {
        let item = document.createElement("tr")
        item.innerHTML = line(sale)
        item.dataset.id = sale.id;
        tbody.appendChild(item)
        profit += sale.revenue

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
                if (document.querySelectorAll('tbody tr').length === 0) {
                  document.querySelector('tbody').innerHTML = "<tr><td colspan='8'>Продаж нет</td></tr>";
                }
              });
            }
          }
        }

      })
      
      document.querySelector(".costPrice").innerHTML = `<p>Прибыль: ${profit}р</p>`
      more.dataset.open = "opened";
      let img = more.querySelector("img")
      img.style.rotate = "180deg"
    }
  
    request.onerror = function () {
      console.error("Ошибка при загрузке продаж:", request.error);
    }
  } else {
    displaySales()
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
  let request;
  if(document.getElementById('editModal').dataset.action == "edit"){
    const id = Number(document.getElementById('edit-id').value);
    const Sale = {
      id: id,
      name: document.getElementById('edit-name').value,
      price: Number(document.getElementById('edit-price').value),
      costPrice: Number(document.getElementById('edit-costPrice').value),
      count: Number(document.getElementById('edit-count').value),
      date: dateToString(document.getElementById('edit-date').value),
      revenue: (Number(document.getElementById('edit-price').value) - Number(document.getElementById('edit-costPrice').value)) * Number(document.getElementById('edit-count').value)
    };

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

    request = sales.put(Sale);
  } else {
    const newSale = {
      name: document.getElementById('edit-name').value,
      price: Number(document.getElementById('edit-price').value),
      costPrice: Number(document.getElementById('edit-costPrice').value),
      count: Number(document.getElementById('edit-count').value),
      date: dateToString(document.getElementById('edit-date').value),
      revenue: (Number(document.getElementById('edit-price').value) - Number(document.getElementById('edit-costPrice').value)) * Number(document.getElementById('edit-count').value)
    };

    if(!/^[а-яА-Я0-9\s]+$/.test(newSale.name)){
      alert("Имя должно содержать только буквы или цифры")
      return
    }
    if(!/^[0-9]+$/.test(newSale.price)){
      if(newSale.price < 0){
        alert("Цена должна быть числом, которое больше 0")
        return
      }
    }
    if(!/^[0-9]+$/.test(newSale.costPrice)){
      if(newSale.costPrice < 0){
        alert("Себестоимость должна быть числом, которое больше 0")
        return
      }
    }
    if(!/^[0-9]+$/.test(newSale.count)){
      if(newSale.count < 0){
        alert("Количество должна быть числом, которое больше 0")
        return
      }
    }

    let form = document.getElementById("editForm")
    form.reset()

    let transaction = db.transaction(['Sales'], 'readwrite');
    let sales = transaction.objectStore('Sales');

    request = sales.add(newSale);
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
  }
);


/*Графики через библиотеку ApexCharts*/


let columnChart = null;
let pieChart = null;

function createColumnGraph(year) {
  let transaction = db.transaction(['Sales'], 'readonly');
  let sales = transaction.objectStore('Sales');
  let request = sales.getAll();

  request.onsuccess = function () {
    let result = request.result;
    let salesInChoosedYear = result.filter(sale => {
      let date = stringFortDate(sale.date);
      return date.getFullYear() === year;
    });
    salesInChoosedYear.sort((a, b) => {
      let [dayA, monthA, yearA] = a.date.split('.').map(Number);
      let [dayB, monthB, yearB] = b.date.split('.').map(Number);
      return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
    });

    let limitResult = salesInChoosedYear.slice(0, 7);
    let items = limitResult.map(sale => sale.name);
    let itemsPrices = limitResult.map(sale => sale.revenue);

    const options = {
      chart: { type: 'bar', height: 450 },
      series: [{ name: 'Выручка', data: itemsPrices }],
      xaxis: { categories: items },
      title: { text: `Топ-7 товаров ${year} года`, align: 'center' }
    };
    if (columnChart) {
      columnChart.updateOptions(options, true);
    } else {
      columnChart = new ApexCharts(document.querySelector("#chart"), options);
      columnChart.render();
    }
  };

  request.onerror = function () {
    console.error("Ошибка при загрузке продаж:", request.error);
  };
}

function createPieGraph(year) {
  let transaction = db.transaction(['Sales'], 'readonly');
  let sales = transaction.objectStore('Sales');
  let request = sales.getAll();

  request.onsuccess = function () {
    let result = request.result;
    let salesInChoosedYear = result.filter(sale => {
      let date = stringFortDate(sale.date);
      return date.getFullYear() === year;
    });
    const perMonth = Array(12).fill(0);
    salesInChoosedYear.forEach(sale => {
      let [day, month, year] = sale.date.split('.').map(Number);
      perMonth[month - 1] += sale.revenue;
    });

    const labels = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const colors = ['#45FF4B', '#FFC445', '#FF7745', '#BB45FF', '#FFF945', '#4579FF',
                    '#153483', '#45ffc1', '#451a5e', '#1a0049', '#00420b', '#5c0045'];

    const options2 = {
      chart: { type: 'pie', height: 400 },
      series: perMonth,
      labels: labels,
      colors: colors,
      title: { text: `Доход по месяцам (${year})`, align: 'center' },
      legend: { position: 'bottom' },
      responsive: [{
        breakpoint: 480,
        options: { legend: { position: 'bottom' } }
      }]
    };
    if (pieChart) {
      pieChart.updateOptions(options2, true);
    } else {
      pieChart = new ApexCharts(document.querySelector("#chart2"), options2);
      pieChart.render();
    }
  };

  request.onerror = function () {
    console.error("Ошибка при загрузке продаж:", request.error);
  };
}




