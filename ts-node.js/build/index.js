"use strict";
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.greet = function () {
        console.log("\uC548\uB155\uD558\uC138\uC694! \uC800\uB294 " + this.name);
    };
    return Person;
}());
var seungHwan = new Person("seungHwan");
seungHwan.greet();
