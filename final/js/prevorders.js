function convertUnixToDate(unix_timestamp) {
    const date = new Date(unix_timestamp)
    return date
}

function displayPreviousOrders(previousOrder, index) {
    if (index < 5) {
        // creates elements
        let card = document.createElement('div')
        let orderDate = document.createElement('h3')
        let orderName = document.createElement('h3')
        let order = document.createElement('p')
        
        // displays order
        previousOrderDate = convertUnixToDate(previousOrder[0])
        orderDate.textContent = previousOrderDate.toDateString()
        orderName.textContent = previousOrder[1]
        order.textContent = `${previousOrder[2]} and ${previousOrder[3]} and ${previousOrder[4]}`
        
        card.setAttribute('id', "previous-order")
        card.appendChild(orderDate)
        card.appendChild(orderName)
        card.appendChild(order)
        document.querySelector("#prevorders").appendChild(card)
    }
}

function displayNoOrders() {
    let card = document.createElement('div')
    let noOrder = document.createElement('a')

    noOrder.textContent = `You've never ordered before! Click here to order!`
    noOrder.setAttribute('href', "fresh.html")
    card.setAttribute('id', "previous-order")
    card.appendChild(noOrder)
    document.querySelector("#prevorders").appendChild(card)
}

previousOrders = JSON.parse(localStorage.getItem("prevorders"))
if (previousOrders == null) {
    displayNoOrders()
} else {
    previousOrders.forEach((previousOrder, index) => displayPreviousOrders(previousOrder, index))    
};
// Allow to close the last order banner in the idex site
const dismiss = document.querySelector('.dismiss');
dismiss.addEventListener('click', closeFunction);

function closeFunction() {
    this.parentElement.style.display = 'none';
}