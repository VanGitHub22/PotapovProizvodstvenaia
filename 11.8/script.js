/*async function loadJson(url) {
    let response = await fetch(url)
    if(response.status == 200){
        let json = await response.json()
        return json
    } else {
        throw new Error(response.status);
    }
}

loadJson('no-such-user.json') // (3)
  .catch(alert); // Error: 404





class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
    let response = await fetch(url)
    if(response.status == 200){
        let json = await response.json()
        return json
    } else {
        throw new Error(response.status);
    }
}

// Запрашивать логин, пока github не вернёт существующего пользователя.
async function demoGithubUser() {
    let user;
    while(true){
        let name = prompt("Введите логин?", "iliakan");
        try{
             user = await loadJson(`https://api.github.com/users/${name}`)
             break;
        } catch (er){
            if(err instanceof HttpError && err.response.status == 404){
                alert("Такого пользователя не существует, пожалуйста, повторите ввод.")
            } else {
                throw er;
            }
        }
    }

    alert(`Полное имя: ${user.name}.`);
    return user;
}

demoGithubUser();*/





async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
    wait().then(result => alert(result))
  // ...что здесь написать?
  // чтобы вызвать wait() и дождаться результата "10" от async–функции
  // не забывайте, здесь нельзя использовать "await"
}

