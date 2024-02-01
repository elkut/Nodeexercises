// es6+ Arrow Functions Example #2 - returning object properties
let setValues = (id, name, age) => ({ id: id, name: name, age: age });
let student = setValues(3, "Jane", 24);
console.log(`id: ${student.id} name: ${student.name} age: ${student.age}`);