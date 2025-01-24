export class A {
    cluck() {
        console.log("Hello World");
    }
}
class MyClass {
    constructor(data) {
        this.requiredVar = data.requiredVar;
        this.optionalVar1 = data.optionalVar1;
        this.optionalVar2 = data.optionalVar2;
    }
}
// Can create with only required variable
const obj1 = new MyClass({ requiredVar: "hello" });
// Or with some optional variables
const obj2 = new MyClass({
    requiredVar: "hello",
    optionalVar1: 42
});
//# sourceMappingURL=class.js.map