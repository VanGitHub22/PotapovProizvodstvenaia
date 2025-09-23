var User = /** @class */ (function () {
    function User(_name) {
        this.name = _name;
    }
    return User;
}());
var tom = new User("Том");
var header = this.document.getElementById("header");
header.innerHTML = "Привет " + tom.name;
var x = 10;
function add(a, b) {
    var el = document.querySelector(".test");
    el === null || el === void 0 ? void 0 : el.append("".concat(b, " ").concat(a));
}
add(10, "Привет");
