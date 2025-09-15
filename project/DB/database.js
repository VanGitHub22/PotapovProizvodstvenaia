let db;
let request = indexedDB.open("Sales", 4);

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

function formatDate(date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}


let closeModal = document.getElementById("closeModal")
closeModal.addEventListener('click', () => {
  document.getElementById('editModal').style.display = 'none';
  document.getElementById('modalOverlay').style.display = 'none';
})

let closeModalAdd = document.getElementById("closeModalAdd")
closeModalAdd.addEventListener('click', () => {
  document.getElementById('addModal').style.display = 'none';
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
    let profit = 0;
    result.sort((a, b) => b.revenue - a.revenue)
    let limitResult = result.slice(0, 7)
    limitResult.forEach(sale => {
      let item = document.createElement("tr")
      item.innerHTML = `
        <td><input placeholder="Наименование товара" name="name" value="${sale.name}" readonly></input></td>
        <td><input placeholder="Цена" name="price" value="${sale.price}" readonly></input></td>
        <td><input placeholder="Себестоимость" name="costPrice" value="${sale.costPrice}" readonly></input></td>
        <td><input placeholder="Дата продажи" name="date" value="${sale.date}" readonly></input></td>
        <td><input placeholder="Количество" name="count" value="${sale.count}" readonly></input></td>
        <td><input placeholder="Выручка" name="revenue" value="${sale.revenue}" readonly></input></td>
        <td><div class="edit_btn"><img src="./img/pen.png" alt=""></div></td>
        <td><div class="delete_btn"><img src="./img/trash.png" alt=""></div></td>
      `
      item.dataset.id = sale.id;
      tbody.appendChild(item)
      profit += sale.revenue
    })
    setupEventListeners();
    document.querySelector(".costPrice").innerHTML = `<p>Прибыль: ${profit}р</p>`
    let columnarGraph = document.querySelector(".columnarGraph")
    columnarGraph.innerHTML = ""
    createColumnGraph(2025)
  }

  request.onerror = function () {
    console.error("Ошибка при загрузке продаж:", request.error);
  };
}


function setupEventListeners(){
  let tbody = document.querySelector('tbody')

   tbody.addEventListener('click', function(e) {
    const row = e.target.closest('tr');
    if (!row) return;

    const id = Number(row.dataset.id);

    if (e.target.closest('.delete_btn')) {
      if (confirm(`Удалить продажу №${id}?`)) {
        deleteSale(id, () => {
          if (document.querySelectorAll('tbody tr').length === 0) {
            document.querySelector('tbody').innerHTML = "<tr><td colspan='8'>Продаж нет</td></tr>";
          }
        });
      }
    }
    if (e.target.closest('.edit_btn')) {
      openEditModal(id);
    }
  });
}

function deleteSale(id, callback) {
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


function openEditModal(id) {
  let transaction = db.transaction(['Sales'], 'readonly');
  let sales = transaction.objectStore('Sales');

  let request = sales.get(id);

  request.onsuccess = function () {
    let sale = request.result;
    document.getElementById('edit-id').value = sale.id;
    document.getElementById('edit-name').value = sale.name;
    document.getElementById('edit-price').value = sale.price;
    document.getElementById('edit-costPrice').value = sale.costPrice;
    document.getElementById('edit-count').value = sale.count;
    document.getElementById('edit-date').value = sale.date;

    document.getElementById('editModal').style.display = 'block';
    document.getElementById('modalOverlay').style.display = 'block';
  };

  request.onerror = function () {
    console.error("Ошибка при получении записи:", request.error);
  };
}

document.getElementById('editForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const id = Number(document.getElementById('edit-id').value);
  const updatedSale = {
    id: id,
    name: document.getElementById('edit-name').value,
    price: Number(document.getElementById('edit-price').value),
    costPrice: Number(document.getElementById('edit-costPrice').value),
    count: Number(document.getElementById('edit-count').value),
    date: document.getElementById('edit-date').value,
    revenue: (Number(document.getElementById('edit-price').value) - Number(document.getElementById('edit-costPrice').value)) * Number(document.getElementById('edit-count').value)
  };

  let transaction = db.transaction(['Sales'], 'readwrite');
  let sales = transaction.objectStore('Sales');

  let request = sales.put(updatedSale);

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
});



let add_btn = document.querySelector(".add_btn")
add_btn.addEventListener("click", () => {
  document.getElementById('addModal').style.display = 'block';
  document.getElementById('modalOverlay').style.display = 'block';
})


document.getElementById('addForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const newSale = {
    name: document.getElementById('add-name').value,
    price: Number(document.getElementById('add-price').value),
    costPrice: Number(document.getElementById('add-costPrice').value),
    count: Number(document.getElementById('add-count').value),
    date: document.getElementById('add-date').value,
    revenue: (Number(document.getElementById('add-price').value) - Number(document.getElementById('add-costPrice').value)) * Number(document.getElementById('add-count').value)
  };

  let transaction = db.transaction(['Sales'], 'readwrite');
  let sales = transaction.objectStore('Sales');

  let request = sales.add(newSale);

  request.onsuccess = function () {
    console.log("Продажа добавлена");
    document.getElementById('addModal').style.display = 'none';
    document.getElementById('modalOverlay').style.display = 'none';
    displaySales();
  };

  request.onerror = function () {
    console.error("Ошибка при обновлении:", request.error);
    alert("Не удалось сохранить изменения");
  };
});

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
        item.innerHTML = `
          <td><input placeholder="Наименование товара" name="name" value="${sale.name}" readonly></input></td>
          <td><input placeholder="Цена" name="price" value="${sale.price}" readonly></input></td>
          <td><input placeholder="Себестоимость" name="costPrice" value="${sale.costPrice}" readonly></input></td>
          <td><input placeholder="Дата продажи" name="date" value="${sale.date}" readonly></input></td>
          <td><input placeholder="Количество" name="count" value="${sale.count}" readonly></input></td>
          <td><input placeholder="Выручка" name="revenue" value="${sale.revenue}" readonly></input></td>
          <td><div class="edit_btn"><img src="./img/pen.png" alt=""></div></td>
          <td><div class="delete_btn"><img src="./img/trash.png" alt=""></div></td>
        `
        item.dataset.id = sale.id;
        tbody.appendChild(item)
        profit += sale.revenue
        let date = sale.date
      })
      setupEventListeners();
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


function createColumnGraph(year){
  let transaction = db.transaction(['Sales'], 'readonly')
  let sales = transaction.objectStore('Sales')
  let request = sales.getAll()

  request.onsuccess = function () {
    let result = request.result
    let salesInChoosedYear = result.filter(sale => {
      let date = stringToDate(sale.date);
      return date.getFullYear() === year;
    });
    salesInChoosedYear.sort((a, b) => {
      let [dayA, monthA, yearA] = a.date.split('.').map(Number);
      let [dayB, monthB, yearB] = b.date.split('.').map(Number);

      let dateA = new Date(yearA, monthA - 1, dayA);
      let dateB = new Date(yearB, monthB - 1, dayB);

      return dateA - dateB;
    });
    let limitResult = salesInChoosedYear.slice(0, 7)

    let max = 0
    let dates = []

    limitResult.forEach(sale => {
      if(sale.revenue > max){
        max = sale.revenue
      }
      dates.push(sale.date)
    })

    let AllPoints = document.querySelectorAll(".points .point")
    let g = 1
    AllPoints.forEach((point => {
      point.innerHTML = `${Math.round(max * g)} -`
      g -= 0.14
    }))

    let AllDate = document.querySelectorAll(".dates .date")
    let j = 0
    AllDate.forEach((date => {
      if(dates[j] !== undefined){
        date.innerHTML = dates[j]
      } else {
        date.innerHTML = ""
      }
      j++
    }))
    

    let colGraphElements = ["green", "orange", "red", "purple", "yellow", "blue", "darkblue"]
    let i = 0;
    let columnarGraph = document.querySelector(".columnarGraph")
    columnarGraph.innerHTML = ""
    limitResult.forEach(sale => {
      let percent = sale.revenue / (max / 100) 
      let graphBlock = document.createElement("div")
      graphBlock.classList.add(colGraphElements[i]) 
      graphBlock.style.height = 350 * (percent / 100) + "px"
      columnarGraph.appendChild(graphBlock)
      i++
    })
  }

  request.onerror = function () {
    console.error("Ошибка при загрузке продаж:", request.error);
  };
}


function stringToDate(dateString) {
  let parts = dateString.split('.');
  return new Date(
    parseInt(parts[2]),
    parseInt(parts[1]) - 1,
    parseInt(parts[0])
  );
}


let colGraphSelect = document.querySelector("#colGraphSelect")
colGraphSelect.addEventListener('change', () => {
  let value = colGraphSelect.value
  createColumnGraph(Number(value))
})