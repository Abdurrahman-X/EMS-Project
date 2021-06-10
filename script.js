// PRODUCTS LIST
const products = [{
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
    price: 800000
},
{
    index: 5,
    id: 'p5',
    name: 'Apple Watch',
    price: 95000
},
{
    index: 6,
    id: 'p6',
    name: 'Air Pods',
    price: 75000
},
]

// SELECTORS
var sN = 1;

const intro = document.querySelector('.intro');
const cartIcon = document.querySelector('.cart-icon');
const cartContent = document.querySelector('.cart-content')

cartIcon.addEventListener('click', () => {
  cartContent.style.display = 'block';
    
})


const tableContent = document.querySelector('.table-content');
const cartButtons = document.querySelectorAll('.add-to-cart');
const cartCounter = document.querySelector('span');
const tableHeader = document.querySelector('.table-header');
var cartItemRows = document.getElementsByClassName('.cart-item-row');


for (let i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener('click', addToCart);
}


// ADD ITEM TO CART 
function addToCart(e) {
   let targetButton = e.target;
   const Item = products.find( ({id}) => id === targetButton.parentElement.id);

  
   if (targetButton.innerText === "ADD TO CART") {
       
        if (Item.id === targetButton.parentElement.id) {
         var title = Item.name;
         var price = Item.price;
         var Id  = Item.id;
 
     var cartDetails = `
         <tr class = "cart-item-row" id = ${Id}>
             <td class = "cart-index">${sN++}</td>
             <td class = "cart-title">${title}</td>
             <td class = "cart-price"> ${price}</td>
             <td>
                 <div class="container">
                     <button class = "quantity-btn quantity-btn-minus  ${price} ${Id} ">-</button>
                     <h2 class="root"> 1 </h2>
                     <button class = "quantity-btn quantity-btn-plus ${price} ${Id}">+</button><br>
                 </div>
             </td>
             <td><button class="remove-cart-item" type="button">Remove</button></td>
         </tr>
     
 `;
 
 
         tableContent.innerHTML += cartDetails;
         targetButton.style.backgroundColor = '#FFED96';
         targetButton.innerText = "Remove From Cart"; 
         cartCounter.innerHTML++;
    }
         //targetButton.disabled = true;    
   
    } else{
       //console.log(targetButton.innerText);
       targetButton.style.backgroundColor = '#FF9A3D';
       targetButton.innerText = "Add To Cart"; 
       var removeItem = document.querySelector(`.table-content #${Item.id}`);
       console.log(removeItem);
        removeItem.remove();
    
       //console.log(document.querySelectorAll('.cart-index'));
        let cartIndex = document.querySelectorAll('.cart-index');
        for (let i = 0; i < cartIndex.length; i++) {
            cartIndex[i].innerText = i + 1;
        }
        sN--;
        
   
        cartCounter.innerHTML--;
        updateCartTotal();
   }

        
      
        let incrementButtons = document.querySelectorAll('.quantity-btn-plus');
        //console.log(incrementButtons);
        for (let i = 0; i < incrementButtons.length; i++) {
            incrementButtons[i].addEventListener('click', increment);
    }

        let decrementButtons = document.getElementsByClassName("quantity-btn-minus");
        for (let i = 0; i < decrementButtons.length; i++) {
            decrementButtons[i].addEventListener('click', decrement);
        }

        
        var itemsRemoved = tableContent.getElementsByClassName('remove-cart-item');
        for (let i = 0; i < itemsRemoved.length; i++) {
            itemsRemoved[i].addEventListener('click', removeCartItem);
        }  
    

   updateCartTotal();

}

// INCREMENT QUANTITY
function increment(e) {
    var targetButton = e.target;
            var root = targetButton.parentElement.children[1];
            var rootValue = root.innerText;
            var newQty = parseInt(rootValue) + 1;
            root.innerText = newQty;
            
            let allClasses = targetButton.classList;

           let basePrice;
           let itemId;
            
            for (let i = 0; i < allClasses.length; i++) {
                if (i === 2) {
                    basePrice = parseInt(allClasses[2]);

                }
                if (i === 3) {
                    itemId = allClasses[3];
                } 
                
            }
            
            updatePrice(e, itemId, basePrice)
            updateCartTotal();
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
    //console.log(document.querySelectorAll('.cart-index'));
    let cartIndex = document.querySelectorAll('.cart-index');
    for (let i = 0; i < cartIndex.length; i++) {
        cartIndex[i].innerText = i + 1;
    }
    sN--;
    
   
    cartCounter.innerHTML--;
    updateCartTotal();

}

 // UPDATE INDIVIDUAL PRICES
function updatePrice(e, itemId, basePrice) {
    let targetButton = e.target;
        let targetChild = document.querySelector(`#${itemId} .cart-price`);        
        let targetQuantity = document.querySelector(`#${itemId} .root`);
        //console.log(targetQuantity);
        //console.log(itemId);
        let quantity = targetQuantity.innerText;
        //console.log(quantity);

        console.log(basePrice);
        let newPrice = basePrice * quantity;
        targetChild.innerText = newPrice;
}


// UPDATE CART TOTAL
function updateCartTotal() {
    
    let total = 0;
    let itemRows = document.getElementsByClassName('cart-item-row');
    //console.log(itemRows);
   
    for (let i = 0; i < itemRows.length; i++) {
        let itemRow = itemRows[i]
        //console.log(itemRow);
        let priceElements = itemRow.getElementsByClassName('cart-price');
        //console.log(priceElements);
        for (let i = 0; i < priceElements.length; i++) {
            priceElement = parseInt(priceElements[i].innerText.replace('₦',''));
            total = total + priceElement
        }
    }
         let cartTotal = document.getElementById('total');
         cartTotal.innerText = `₦${total}`;
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
checkoutForm.addEventListener('click', checkOut);

function onlyNumberKey(evt) {
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
        return setErrorFor(telephone, 'Phone number can only be numbers');
    } else{
        return setSuccessFor(telephone);
    }
        
}
    
    


// CHECKOUT FUNCTION
function checkOut() {
    let allValid;
        let totalPrice = document.querySelector('#total');
        if (parseInt(totalPrice.innerText.replace('₦', '')) === 0) {
            alert('You need to select an item first' );
            return;
        }


    const buyerNameValue = buyerName.value.trim();    
    
    if (buyerNameValue === '' || buyerNameValue === null) {
        setErrorFor(buyerName, 'Please enter your name');
        allValid = false;
        
    } else{
        setSuccessFor(buyerName);
        allValid = true;
    }

    const buyerMailValue = buyerMail.value.trim();
    if (buyerMailValue == '') {
        setErrorFor(buyerMail, 'Please an enter an email');
        allValid = false;
    } else if (!buyerMailValue.includes('@')) {
        setErrorFor(buyerMail, 'Invalid Email');
        allValid = false;
    } else{
        setSuccessFor(buyerMail);
        allValid = true;
    }
   

    const telephoneNum = telephone.value.trim(); 
    if (telephoneNum == '') {
        setErrorFor(telephone, 'Please enter your telephone number');
        allValid = false;
    // } else if (telephoneNum.type !== 'tel') {
    //     setErrorFor(telephone, 'Phone number can only be numbers');
    //     allValid = false;
    } else if (telephoneNum.length < 11) {
        setErrorFor(telephone, 'Phone number cannot be less than 11 characters');
        allValid = false;
    } else if (telephoneNum.length > 11) {
        setErrorFor(telephone, 'Phone number cannot be more than 11 characters');
        allValid = false;
    } 
    else{
        setSuccessFor(telephone);
        allValid = true;
    }
     
    if (allValid == true) {
       
        closeModal();
        payWithPaystack();
        
    }
    
    
}

// NAME VALIDATION
function validateName() {
    
    const buyerNameValue = buyerName.value.trim();    
    if (buyerNameValue === '' || buyerNameValue === null) {
        setErrorFor(buyerName, 'Please enter your name');
       
    } else{
        setSuccessFor(buyerName);
      
    }
}

// MAIL VALIDATION
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

// PHONE NUMBER VALIDATION
function validatePhone() {

    const telephoneNum = telephone.value.trim(); 

    if (telephoneNum == '') {
        setErrorFor(telephone, 'Please enter your telephone number');
      
    //   } else if (telephoneNum.type !== 'tel') {
    //       setErrorFor(telephone, 'Phone number can only be numbers');
         
    } else if (telephoneNum.length < 11) {
         setErrorFor(telephone, 'Phone number cannot be less than 11 characters');
     } else if (telephoneNum.length > 11) {
         setErrorFor(telephone, 'Phone number cannot be more than 11 characters');
         allValid = false;
    }  
    else{
        setSuccessFor(telephone);
       
    }
}

// VALIDATION ERROR
function setErrorFor(input, errorMessage) {
    const formControl = input.parentElement;
	const small = formControl.querySelector('.form-control div');
	formControl.className = 'form-control error';
	small.innerText = errorMessage;
    //error.className = 'error-msg';
}

// VALIDATION SUCCESS
function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}



continueShopping.addEventListener('click', closeModal);



//CLOSE CART
function closeModal() {
    document.querySelector(".cart-content").style.display = "none";
}





// INTEGRATE PAYSTACK
function payWithPaystack() {
    let handler = PaystackPop.setup({
      key: 'pk_test_a230251758fb3ae6afc26dde5f95ca6386f05aeb', // Replace with your public key
      email: document.getElementById("buyer-email").value,
      amount: document.getElementById("total").innerText.replace('₦', '') * 100,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.');
      },
      callback: function(response){
        showSummary()
      }
    });
    handler.openIframe();
  }
        
    
  // SHOW SUMMARY UPON SUCCESSFUL PURCHASE
function showSummary() {
    document.getElementById('summary').style.display = 'flex';
    document.getElementById('summary').style.flexDirection = 'column';
    document.getElementById('summary').style.justifyContent = 'space-around';
    document.querySelector('#customer-name').innerHTML = buyerName.value;
    const Summary = document.querySelector('#summary-content')
    const itemRow = document.querySelectorAll('.cart-item-row');
    


    itemRow.forEach((element, index) => {
       let itemName = element.getElementsByClassName('cart-title')[0].innerText;
    
       let itemQty = element.getElementsByClassName('root')[0].innerText;
      


       let summaryContent = `
    
    <tr>
        <td>${index + 1}</td>
        <td>${itemName}</td>
        <td>${itemQty}</td>
    </tr>
`
Summary.innerHTML += summaryContent;
    });
    
}



// RELOAD PAGE AFTER ACKNOWLEDGING SUMMARY
function reloadPage() {
    window.location.reload();
}





        







