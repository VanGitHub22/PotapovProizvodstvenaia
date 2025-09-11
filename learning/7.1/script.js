/*let object1 = {
  name: "John"
}

//alert(JSON.stringify(Object.getOwnPropertyDescriptor(object1, 'name')))

Object.defineProperty(object1, "age", {value: 22, writable: true, configurable: true})

//alert(JSON.stringify(Object.getOwnPropertyDescriptor(object1, 'age')))

Object.defineProperty(object1, "age", {value: 35, writable: false, enumerable: true, configurable: true}) 

alert(JSON.stringify(Object.getOwnPropertyDescriptor(object1, "age")))


et user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
  enumerable: false
});

// Теперь наше свойство toString пропало из цикла:
for (let key in user) alert(key); // name

let user = {

}

Object.defineProperties(user, {
  name: { value: "John", writable: true, enumerable: false, configurable: true },
  surname: { value: "Smith", writable: true, enumerable: true, configurable: true },
  // ...
});

alert(Object.entries(user))

let user = {

}

Object.defineProperties(user, {
  name: { value: "John", writable: true, enumerable: false, configurable: true },
  surname: { value: "Smith", writable: true, enumerable: true, configurable: true },
  // ...
});

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user));
console.log(JSON.stringify(Object.getOwnPropertyDescriptors(clone)))*/