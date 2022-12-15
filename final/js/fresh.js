const fruitlist = 'json/fruit.json'
const fruitSelect1 = document.querySelector('#first-fruit')
const fruitSelect2 = document.querySelector('#second-fruit')
const fruitSelect3 = document.querySelector('#third-fruit')
const orderButton = document.querySelector('#order-button')
const inputName = document.querySelector('#input-name')
const inputEmail = document.querySelector('#input-email')
const inputPhone = document.querySelector('#input-phone')
let fruits = {}

function convertUnix(unix_timestamp) {
    const date = new Date(unix_timestamp)
    return date
}
//Calls the oprions to select
function addFruitOptions(fruit) {
    let addingOption1 = document.createElement('option');
    addingOption1.setAttribute('value', fruit.name);
    addingOption1.textContent = `${fruit.name}`;
    fruitSelect1.appendChild(addingOption1);
    let addingOption2 = document.createElement('option');
    addingOption2.setAttribute('value', fruit.name);
    addingOption2.textContent = `${fruit.name}`;
    fruitSelect2.appendChild(addingOption2);
    let addingOption3 = document.createElement('option');
    addingOption3.setAttribute('value', fruit.name);
    addingOption3.textContent = `${fruit.name}`;
    fruitSelect3.appendChild(addingOption3);

}

function findFruit(fruitName) {
    for (let fruitLoop in fruits) {
        if (fruits[fruitLoop].name == fruitName) {
            return fruits[fruitLoop]
        }
    }
}
function createOrder() {
    if (inputName.value != null && inputEmail.value != null && inputPhone.value != null) {
        // create order object
        let orderObject = []
        let date = Date.now()
        orderObject.push(date)
        let name = inputName.value
        orderObject.push(name)
        let fruit1Name = fruitSelect1.value
        let fruit1 = findFruit(fruit1Name)
        orderObject.push(fruit1Name)
        let fruit2Name = fruitSelect2.value
        let fruit2 = findFruit(fruit1Name)
        orderObject.push(fruit2Name)
        let fruit3Name = fruitSelect3.value
        let fruit3 = findFruit(fruit1Name)
        orderObject.push(fruit3Name)
        let totalCarbs = fruit1.nutritions.carbohydrates + fruit2.nutritions.carbohydrates + fruit3.nutritions.carbohydrates
        orderObject.push(totalCarbs.toFixed(2))
        let totalProtein = fruit1.nutritions.protein + fruit2.nutritions.protein + fruit3.nutritions.protein
        orderObject.push(totalProtein.toFixed(2))
        let totalFat = fruit1.nutritions.fat + fruit2.nutritions.fat + fruit3.nutritions.fat
        orderObject.push(totalFat.toFixed(2))
        let totalSugar = fruit1.nutritions.sugar + fruit2.nutritions.sugar + fruit3.nutritions.sugar
        orderObject.push(totalSugar.toFixed(2))
        let totalCal = fruit1.nutritions.sugar + fruit2.nutritions.sugar + fruit3.nutritions.sugar
        orderObject.push(totalCal.toFixed(2))

        
        localStorage.setItem("last-order", JSON.stringify(orderObject))

        let previousOrders = JSON.parse(localStorage.getItem("prevorders"))
        if (previousOrders == null) {
            previousOrders = []
        }
        previousOrders.unshift(orderObject)
        localStorage.setItem("prevorders", JSON.stringify(previousOrders))
    }
}
function displayLastOrder() {
    let lastOrder = JSON.parse(localStorage.getItem("last-order"))
    if  (lastOrder == null) {
        let card = document.createElement('div')
        let orderName = document.createElement('h3')

        orderName.textContent = `This is your first order!`
        card.appendChild(orderName)
        document.querySelector("#order").appendChild(card)

    } else {
        // create elements
        let card = document.createElement('div')
        let orderDate = document.createElement('h3')
        let orderName = document.createElement('h3')
        let order = document.createElement('p')
        let nutrition = document.createElement('p')
        

        // display order
        previousOrderDate = convertUnix(lastOrder[0])
        orderDate.textContent = previousOrderDate.toDateString()
        orderName.textContent = lastOrder[1]
        order.textContent = `${lastOrder[2]} and ${lastOrder[3]} and ${lastOrder[4]}`
        nutrition.textContent = `Carbs:${lastOrder[5]}  Protien:${lastOrder[6]}  Fat:${lastOrder[7]} 
        Sugar:${lastOrder[8]} Cal:${lastOrder[9]}`
        
        card.setAttribute('id', "previous-order")
        card.appendChild(orderDate)
        card.appendChild(orderName)
        card.appendChild(order)
        card.appendChild(nutrition)
        document.querySelector("#order").appendChild(card)
    }
}

fetch(fruitlist)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        fruits = jsonObject
        jsonObject.forEach(addFruitOptions)
});

orderButton.addEventListener('click', createOrder)

displayLastOrder()