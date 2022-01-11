if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  let addToCartButtons = document.getElementsByClassName('addToCart')
  for (let i = 0; i < addToCartButtons.length; i++) {
      let button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
  }
}

function addToCartClicked(event) {
let button = event.target
  let shopItem = button.parentElement.parentElement.parentElement
  let name = shopItem.getElementsByClassName('book-item-list-name')[0].innerText
  let price = shopItem.getElementsByClassName('book-item-list-price')[0].innerText
  addItemToCart(name, price)
  updateCartTotal()
}

function addItemToCart(title, price) {
  let cartRow = document.createElement('div')
  cartRow.classList.add('book-row')
  let cartItems = document.getElementsByClassName('shopping-container')[0]
  let cartItemNames = cartItems.getElementsByClassName('title')
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert("Book " + title + ' is already in the cart')
          return
      }
  }

  var cartRowContents =`
    <ul class="shopping-body">
        <li class="ordernr">1</li>
        <li class="title">${title}</li>
        <li class="quantity">1</li>
    <li class="price">${price}</li>
        <li class="buttons">
          <button class="btn btn-warning">
            <i class="fas fa-minus"></i>
          </button>
          <button class="btn btn-success">
    <i class="fas fa-plus"></i>
          </button>
          <button class="btn btn-danger">
            <i class="fas fa-trash-alt"></i>
          </button>
        </li></ul>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('btn-success')[0].addEventListener('click', QuantityAddClicked)
  cartRow.getElementsByClassName('btn-warning')[0].addEventListener('click', QuantitySubClicked)
}

function removeCartItem(event) {
  let buttonClicked = event.target
  buttonClicked.parentElement.parentElement.parentElement.remove()
  updateCartTotal()
}

function QuantityAddClicked(event) {
let buttonClicked = event.target
let cartRow=buttonClicked.parentElement.parentElement.parentElement.getElementsByClassName('quantity')[0]
let quantity=cartRow.innerText
quantity=parseFloat(quantity)+1
if (quantity <=10){
  cartRow.innerText=quantity
  updateCartTotal()
} else {
  alert("Quantity can't be more than 10")
}
}

function QuantitySubClicked(event) {
let buttonClicked = event.target
let cartRow=buttonClicked.parentElement.parentElement.parentElement.getElementsByClassName('quantity')[0]
let quantity=cartRow.innerText
quantity=parseFloat(quantity)-1
if (quantity >=1){
  cartRow.innerText=quantity
  updateCartTotal()
} else {
  alert("Quantity can't be less than 1")
}
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName('shopping-container')[0]
  let cartRows = cartItemContainer.getElementsByClassName('shopping-body')
  let total = 0
var orderNumber=1
  for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i]
      let priceElement = cartRow.getElementsByClassName('price')[0]		
      let quantityElement = cartRow.getElementsByClassName('quantity')[0]
      let price = priceElement.innerText.replace('$', '')
      let quantity = quantityElement.innerText
      cartRow.getElementsByClassName('ordernr')[0].innerText=orderNumber		
  orderNumber=orderNumber+1
      total = total + (price * quantity)
  }
  document.getElementsByClassName('total')[0].innerText = 'Total $' + total
}