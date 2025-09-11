Promise.all(promises) // ожидает выполнения всех промисов и возвращает массив с результатами. Если любой из указанных промисов вернёт ошибку, то результатом работы Promise.all будет эта ошибка, результаты остальных промисов будут игнорироваться.
Promise.allSettled(promises) (/*добавлен недавно*/)//ждёт, пока все промисы завершатся и возвращает их результаты в виде массива с объектами, у каждого объекта два свойства:
//status: "fulfilled", если выполнен успешно или "rejected", если ошибка,
//value – результат, если успешно или reason – ошибка, если нет.
Promise.race(promises) // ожидает первый выполненный промис, который становится его результатом, остальные игнорируются.
Promise.any(promises) (/*добавлен недавно*/) // ожидает первый успешно выполненный промис, который становится его результатом, остальные игнорируются. Если все переданные промисы отклонены, AggregateError становится ошибкой Promise.any.
Promise.resolve(value) // возвращает успешно выполнившийся промис с результатом value.
Promise.reject(error) // возвращает промис с ошибкой error.


let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // все промисы успешно завершены
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // покажет 200 для каждой ссылки
    }

    return responses;
  })
  // преобразовать массив ответов response в response.json(),
  // чтобы прочитать содержимое каждого
  .then(responses => Promise.all(responses.map(r => r.json())))
  // все JSON-ответы обработаны, users - массив с результатами
  .then(users => users.forEach(user => alert(user.name)));




