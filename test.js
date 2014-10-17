var x = [1,2,3,4,3,1,8,2,5,7];

var mayorQue = function (a,b){
    return b > a;
}.autoCurry();

var menorQue = not(mayorQue);


var suma = function suma(a, b){
    return a + b;
}.autoCurry();

var multiplica = function multiplica(a, b){
    return a * b;
}.autoCurry();




var mayorQue2TrasSumar3 = compose(mayorQue(2), suma(3));

var filtrarMayorQue2 = filter(mayorQue(2));


var mySuperFn = compose(reduce(multiplica, 1), take(3), sort(mayorQue), map(suma(2)), filter(mayorQue(2)));

console.log(mySuperFn(x));


var pedido = [
    {importe: 100},
    {importe: 140},
    {importe: 120},
    {importe: 10},
    {importe: 700},
    {importe: 1000}
]

var importeTotal = reduce(function (acc, linea){
    return acc + linea.importe},
    0
);

console.log(importeTotal(pedido));




/*
var y = filter(x,mayorQue2)
var z = map(y, suma2);
console.log(z);
console.log(mySuperFn(z));
*/
