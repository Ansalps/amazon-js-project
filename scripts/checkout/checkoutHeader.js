import { calculateCartQuantity } from "../../data/cart.js";
export function renderCheckoutHeader(){
    let checkoutHeaderHTML='';
    const cartQuantity = calculateCartQuantity();
     checkoutHeaderHTML+=`
        Checkout (<a class="return-to-home-link js-return-to-home-link"
            href="amazon.html">${cartQuantity} Items</a>)
     `
     document.querySelector('.js-checkout').innerHTML=checkoutHeaderHTML;
}