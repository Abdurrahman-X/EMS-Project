// PRODUCTS LIST
var products = [{
    index: 1,
    id: 'p1',
    name: 'Samsung TV',
    price: 500000
},
{
    index: 2,
    id: 'p2',
    name: 'Pixel 4a',
    price: 250000
},
{
    index: 3,
    id: 'p3',
    name: 'PS 5',
    price: 300000
},
{
    index: 4,
    id: 'p4',
    name: 'MacBook Air',
    price: 10
},
{
    index: 5,
    id: 'p5',
    name: 'Apple Watch',
    price: 20
},
{
    index: 6,
    id: 'p6',
    name: 'Air Pods',
    price: 70
},
]
var sN = 1;

var intro = document.querySelector('.intro');
var cartIcon = document.querySelector('.cart-icon');
var cartContent = document.querySelector('.cart-content')
cartIcon.addEventListener('click', () => {
    cartContent.style.display = 'block';
    intro.style.backgroundColor = 'RGBA(255,205,158,0.36)';
    intro.style.backgroundColor = '#FFCD9E';
})


var tableContent = document.querySelector('.table-content');
var cartButtons = document.querySelectorAll('.add-to-cart');
var cartCounter = document.querySelector('span');
const tableHeader = document.querySelector('.table-header');

var tableRows = document.querySelectorAll('td');
console.log(tableRows);
    
for (let i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener('click', addToCart);
}

// ADD ITEM TO CART 
function addToCart(e) {
    
    let targetButton = e.target;
    // for (let i = 0; i < products.length; i++) {
    //     if (targetButton.parentElement.id === products[i].id) {
    //         console.log('found!');
    //     } 
    // }
   const Item = products.find( ({id}) => id === targetButton.parentElement.id);
    //console.log(Item.id);
  
   if (Item.id === targetButton.parentElement.id) {
   
    var title = Item.name;
    var price = Item.price;
    var Id  = Item.id;

    // var itemsInCart = document.getElementsByClassName('cart-title');
    // for (let i = 0; i < itemsInCart.length; i++) {
    //     console.log(itemsInCart.innerText);
    // }
    
    var cartContent = `
        <tr class = "cart-item-row" id = ${Id}>
            <td>${sN++}</td>
            <td class = "cart-title">${title}</td>
            <td class = "cart-price"> ${price}</td>
            <td>
                <div class="container">
                    <button class = "quantity-btn quantity-btn-minus ${price} ${Id} ">-</button>
                    <h2 class="root"> 1 </h2>
                    <button class = "quantity-btn quantity-btn-plus ${price} ${Id}">+</button><br>
                </div>
            </td>
            <td><button class="remove-cart-item" type="button">Remove</button></td>
        </tr>
    
`;

          tableContent.innerHTML += cartContent;
        targetButton.style.backgroundColor = '#FFED96';
        targetButton.innerText = "Remove From Cart"; 
        cartCounter.innerHTML++;
        targetButton.disabled = true;
        

        let incrementButtons = document.querySelectorAll('.quantity-btn-plus');
        //console.log(incrementButtons);
        for (let i = 0; i < incrementButtons.length; i++) {
            incrementButtons[i].addEventListener('click', e => {
            var targetButton = e.target;
            var root = targetButton.parentElement.children[1];
            var rootValue = root.innerText;
            var newQty = parseInt(rootValue) + 1;
            root.innerText = newQty;
                
            //let classes =  document.querySelector('.quantity-btn-plus');
            let allClasses = targetButton.classList;
           //console.log(allClasses);

           let basePrice;
           let itemId;
            
            for (let i = 0; i < allClasses.length; i++) {
                if (i === 2) {
                    basePrice = parseInt(allClasses[2])
                    //console.log(parseInt(allClasses[2]));
                }
                if (i === 3) {
                    itemId = allClasses[3];
                    //console.log(allClasses[3]);
                } 
                
            }
            
            updatePrice(e, itemId, basePrice)
            updateCartTotal();
       });
        
    }

        let decrementButtons = document.getElementsByClassName("quantity-btn-minus");
        for (let i = 0; i < decrementButtons.length; i++) {
            decrementButtons[i].addEventListener('click', decrement);
        }

        // var cartPrices = document.getElementsByClassName('cart-price');
        // for (let i = 0; i < cartPrices.length; i++) {
        //     cartPrices[i].addEventListener('click', updatePrice)
            
        // }

        var itemsRemoved = tableContent.getElementsByClassName('remove-cart-item');
        for (let i = 0; i < itemsRemoved.length; i++) {
            itemsRemoved[i].addEventListener('click', removeCartItem);
        }  
   }   
   
   updateCartTotal();

}

// INCREMENT QUANTITY
function increment(e) {
     var targetButton = e.target;
     //console.log(targetButton);
     var root = targetButton.parentElement.children[1];
     var rootValue = root.innerText;
     var newQty = parseInt(rootValue) + 1;
     root.innerText = newQty;
     
     updatePrice(e)
     updateCartTotal();
     
     //updatePrice(e);
     
     //updateCartTotal();
}


// DECREMENT QUANTITY
function decrement(e) {
    var targetButton = e.target;
    var root = targetButton.parentElement.children[1];
    var rootValue = root.innerText;
    var newQty = parseInt(rootValue) - 1;
    if (newQty < 1){
        alert("You cannot have less than 1 item. If you wish to remove the item, click remove!");
        newQty = 1;
    } else {
        root.innerText = newQty;
    }   

    let allClasses = targetButton.classList;
    let basePrice;
    let itemId;

    for (let i = 0; i < allClasses.length; i++) {
        if (i === 2) {
            basePrice = parseInt(allClasses[2]);
        }

        if (i === 3) {
            itemId = allClasses[3]
        }
    }
    
    updatePrice(e, itemId, basePrice);
    updateCartTotal();
 }

// DELETE CART ITEMS
function removeCartItem(e) {
    var targetButton = e.target;
    var targetItem = targetButton.parentElement.parentElement;
    var productItems = document.getElementsByClassName('product-item');
    
    for (let i = 0; i < productItems.length; i++) {
        if (targetItem.id === productItems[i].id) {
            productItems[i].getElementsByClassName('add-to-cart')[0].style.backgroundColor = "#FF9A3D";
            productItems[i].getElementsByClassName('add-to-cart')[0].innerText = "Add To Cart";
            productItems[i].getElementsByClassName('add-to-cart')[0].disabled = false;
        }        
    }
    targetButton.parentElement.parentElement.remove();
    cartCounter.innerHTML--;
    sN--;

    updateCartTotal();

}

 
function updatePrice(e, itemId, basePrice) {
    let targetButton = e.target;
        let targetChild = document.querySelector(`#${itemId} .cart-price`);
        //console.log(targetChild);
        //console.log(`#${itemId}`);

        //let Price = parseInt(targetChild.innerText);
        //console.log(Price);
        
        let targetQuantity = document.querySelector(`#${itemId} .root`);
        //console.log(targetQuantity);
        //console.log(itemId);
        let quantity = targetQuantity.innerText;
        //console.log(quantity);

        let newPrice = basePrice * quantity;
        targetChild.innerText = newPrice;
}


// UPDATE CART ITEM PRICES
function updateCartTotal() {
    
    let total = 0;
    let itemRows = document.getElementsByClassName('cart-item-row');
    //console.log(itemRows);
   
    for (let i = 0; i < itemRows.length; i++) {
        let itemRow = itemRows[i]
        //console.log(itemRow);
        let priceElements = itemRow.getElementsByClassName('cart-price');
        for (let i = 0; i < priceElements.length; i++) {
            priceElement = parseInt(priceElements[i].innerText);
            total = total + priceElement
        }
        // let quantityElements = itemRow.getElementsByClassName('root');
        // for (let i = 0; i < quantityElements.length; i++) {
        //     quantityElement = quantityElements[i];
        //     //console.log(quantityElement);
            
        // }
        // let Price = parseInt(priceElement.innerText);
        // let quantity = quantityElement.innerText;
        
        //let newPrice = quantity;
        //console.log(newPrice);
        //total = total + newPrice;
    }
         //console.log(total);
         let cartTotal = document.getElementById('total');
         cartTotal.innerText = `${total}`;
}

// CHECKOUT FORM
const continueShopping = document.getElementById('continue-shopping');
const checkoutForm = document.getElementById('checkout')
const form = document.getElementById('form')
const buyerName = document.getElementById('buyer-name');
// console.log(userName.value);
const buyerMail = document.getElementById('buyer-email');
const telephone = document.getElementById('buyer-number');
const error = document.getElementsByClassName('error-msg');


function validateName() {
    const buyerNameValue = buyerName.value.trim();     
    if (buyerNameValue == '' || buyerNameValue == null) {
        setErrorFor(buyerName, 'Please enter your name');
    } else{
        setSuccessFor(buyerName);
    }
}

function validateMail() {
    
    
    const buyerMailValue = buyerMail.value.trim();
    if (buyerMailValue == '') {
        setErrorFor(buyerMail, 'Please an enter an email');
    } else if (!buyerMailValue.includes('@')) {
        setErrorFor(buyerMail, 'Invalid Email');
    } else{
        setSuccessFor(buyerMail);
        
    }
}

function validatePhone() {
    
    const telephoneNum = telephone.value.trim(); 
    if (telephoneNum == '') {
        setErrorFor(telephone, 'Please enter your telephone number');
    // } else if (typeof(telephoneNum != 'number')) {
    //     setErrorFor(telephone, 'Phone number can only be numbers');
    } else if (telephoneNum.length < 11 || telephoneNum.length > 11) {
        setErrorFor(telephone, 'Phone number cannot be less than 11 characters');
    } else{
        setSuccessFor(telephone);
       
    }
}


function setErrorFor(input, errorMessage) {
    const formControl = input.parentElement;
	const small = formControl.querySelector('.form-control div');
	formControl.className = 'form-control error';
	small.innerText = errorMessage;
    //error.className = 'error-msg';
}
function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}



checkoutForm.addEventListener('click', checkOut);

function checkOut() {

    validateName();
    validateMail();
    validatePhone();    

   
    
    if (validateName && validateMail && validatePhone) {
       //console.log(true);
       let totalPrice = document.querySelector('#total');
       if (parseInt(totalPrice.innerText) === 0) {
        alert('You need to select an item first' );
     }
    }

    

    //payWithPaystack();
    // closeModal()
}

continueShopping.addEventListener('click', closeModal);

function closeModal() {
    document.querySelector(".cart-content").style.display = "none"
}

    



       
// function payWithPaystack() {

//     let handler = PaystackPop.setup({
//       key: 'pk_test_a230251758fb3ae6afc26dde5f95ca6386f05aeb', // Replace with your public key
//       email: document.getElementById("buyer-email").value,
//       amount: document.getElementById("total").innerText * 100,
//       ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
//       // label: "Optional string that replaces customer email"
//       onClose: function(){
//         alert('Window closed.');
//       },
//       callback: function(response){
//         let message = 'Payment complete! Reference: ' + response.reference;
//         alert(message);
//       }
//     });
//     handler.openIframe();
//   }
        
    










        







