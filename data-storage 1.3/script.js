let openRequest = indexedDB.open("test", 1);

openRequest.onupgradeneeded = function() {
  // срабатывает, если на клиенте нет базы данных
  // ...выполнить инициализацию...
};

openRequest.onerror = function() {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
  let db = openRequest.result;

  db.onversionchange = function() {
    db.close();
    alert("База данных устарела, пожалуйста, перезагрузите страницу.")
  };

  // ...база данных готова, используйте ее...
};

openRequest.onblocked = function() {
  // это событие не должно срабатывать, если мы правильно обрабатываем onversionchange

  // это означает, что есть ещё одно открытое соединение с той же базой данных
  // и он не был закрыт после того, как для него сработал db.onversionchange
};


db.createObjectStore('books', {keyPath: 'id'}); // создание бд


let openRequest = indexedDB.open("db", 2);

// создаём хранилище объектов для books, если ешё не существует
openRequest.onupgradeneeded = function() {
  let db = openRequest.result;
  if (!db.objectStoreNames.contains('books')) { // если хранилище "books" не существует
    db.createObjectStore('books', {keyPath: 'id'}); // создаём хранилище
  }
};

db.deleteObjectStore('books') // удаление бд





let transaction = db.transaction("books", "readwrite"); // (1)

// получить хранилище объектов для работы с ним
let books = transaction.objectStore("books"); // (2)

let book = {
  id: 'js',
  price: 10,
  created: new Date()
};

let request = books.add(book); // (3)

request.onsuccess = function() { // (4)
  console.log("Книга добавлена в хранилище", request.result);
};

request.onerror = function() {
  console.log("Ошибка", request.error);
};