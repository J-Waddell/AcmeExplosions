console.log("hello");

var categories;
var types;
var products;

function loadExplosives(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
}

var promise1 = new Promise(function(resolve, reject) {
    var request1 = new XMLHttpRequest()
    request1.addEventListener("load", function() {
        var list = JSON.parse(request1.responseText).categories;
        resolve(list)
    })
    request1.open("GET", "categories.json")
    request1.send()
})
console.log("type of promise1", typeof promise1)

promise1
 .then(
    function(val) {
        categories = val
        console.log("promise one resolved, ", categories)
        return promise2
    })
 .then(
    function(val) {
        types = val
        console.log("promise two resolved, ", types)
        return promise3
    })
 .then(
    function(val) {
        products = val
        console.log("promise three resolved, ", products)
    })
 .then(findExplosive)
 .then(function() {
    console.log("chaining")
 })

var promise2 = new Promise(function(resolve, reject){
  var request2 = new XMLHttpRequest()
  request2.addEventListener("load", function() {
    var list = JSON.parse(request2.responseText).types
    resolve(list)
  })
  request2.open("GET", "types.json")
  request2.send()
})

var promise3 = new Promise(function(resolve, reject){
  var request3 = new XMLHttpRequest()
  request3.addEventListener("load", function() {
    var list = JSON.parse(request3.responseText).products
    resolve(list)
  })
  request3.open("GET", "products.json")
  request3.send()
})

function findExplosive(){
  var categoriesList = categories[returnRandom(0, 1)].name
  var typesList = types[returnRandom(0)].name
  var productsList = products[returnRandom(0)].name
  console.log(`Categories consist of ${categoriesList} with these types ${typesList}, and the product ${productsList}`)
}
