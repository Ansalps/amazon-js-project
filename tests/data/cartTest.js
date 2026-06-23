import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
  updateDeliveryOption
} from '../../data/cart.js';



describe('test suite: addToCart', () => {

  beforeEach(()=>{
   spyOn(Storage.prototype,'setItem');
});

    it('adds an existing product to the cart',()=>{
       
        spyOn(Storage.prototype, 'getItem').and.callFake(()=>{
          return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }])
        }
      
    );
    
   // spyOn(Storage.prototype, 'setItem');

    console.log(localStorage.getItem('cart')); // should print []

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }]))
    expect(cart.length).toEqual(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    });

  it('adds a new product to the cart', () => {
    
    spyOn(Storage.prototype, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    }
      
    );
    
   // spyOn(Storage.prototype, 'setItem');

    console.log(localStorage.getItem('cart')); // should print []

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('cart',JSON.stringify([
      {"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1,"deliveryOptionId":"1"}]))
    expect(cart.length).toEqual(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });

});

describe('test suite: remove a product from cart',()=>{
  beforeEach(()=>{
   spyOn(Storage.prototype,'setItem');
  });
  it('removes a product from cart',()=>{
    spyOn(Storage.prototype,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    })
    console.log(localStorage.getItem('cart')); 
    loadFromStorage();
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]))
    expect(cart.length).toEqual(0);
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
     //expect(cart[0].productId).toEqual(undefined);
    // expect(cart[0].quantity).toEqual(2);
    
  });

  it('does nothing if product is not in the cart', () => {
    spyOn(Storage.prototype, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
    console.log(localStorage.getItem('cart')); 
    removeFromCart('does-not-exist');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });

  it('update delivery option',()=>{
    spyOn(Storage.prototype,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    })
    loadFromStorage();

    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',3)
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
     expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual(3);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: 3
    }]));
    
  });

  it('does nothing if the product is not in the cart', () => {
    spyOn(Storage.prototype, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    updateDeliveryOption('does-not-exist', '3');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('does nothing if the delivery option does not exist', () => {
    spyOn(Storage.prototype, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-not-exist');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
})