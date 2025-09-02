let user = {
  name: "John",
  age: 30
};

let clone = {}; // новый пустой объект

// давайте скопируем все свойства user в него
for (let key in user) {
  clone[key] = user[key];
}



let user2 = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// копируем все свойства из permissions1 и permissions2 в user
Object.assign(user2, permissions1, permissions2);


let clone1 = Object.assign({}, user); // полное копирование