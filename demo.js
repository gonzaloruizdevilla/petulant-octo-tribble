function curry(fn){
    var l = fn.length;
    var temp = function (previousArgs) {
        return function (){
            var newArgs = previousArgs.slice();
            newArgs.push.apply(newArgs, arguments);
            if (newArgs.length >= l) {
                return fn.apply(this, newArgs);
            } else {
                return temp(newArgs);
            }
        }
    }
    return temp([]);
}

Function.prototype.autoCurry = function (){
    return curry(this);
}


var forEach = function forEach(fn, arr) {
    for(i = 0, l = arr.length; i < l; i++ ){
        fn(arr[i], i, l);
    }
}.autoCurry();

var sort = function (fn, arr){
    return arr.sort(fn);
}.autoCurry();

var not = function (fn) {
    return function(){
        return !fn.apply(null, arguments);
    }
}

var take = function (n, arr){
    return arr.slice(0, n);
}.autoCurry();

var reduce = function (fn, startValue, arr) {
    var temp = startValue;
    forEach(function(el){
        temp = fn(temp, el);
    }, arr);
    return temp;
}.autoCurry();


var map = function map(fn, arr) {
    var newArr = [];
    if (arr.map) {
        return arr.map(fn);
    } else {
        forEach(function (el){
            newArr.push(fn(el));
        }, arr);
        return newArr;
    }
}.autoCurry();

Promise.prototype.map = function (fn){
    return this.then(fn);
}


var filter = function filter(fn, arr) {
    var newArr = [];
    forEach(function (el){
        if (fn(el)) newArr.push(el);
    }, arr);
    return newArr;
}.autoCurry();

function compose(){
    var fns = arguments,
        l = fns.length;
    return function (){
        var temp = fns[l - 1].apply(null, arguments);
        for(var i = l -2; i >= 0; i--) {
            temp = fns[i](temp);
        }
        return temp;
    }
}
