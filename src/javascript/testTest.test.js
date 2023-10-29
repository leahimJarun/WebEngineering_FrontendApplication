//test TEST not real one
import Cart from './testTest';

describe('My Cart tests', () => {
    test("The addToCart function can add an item to the cart", () => {
        const cart = new Cart();
        cart.addToCart('cheesecake');
        expect(cart.items[0]).toEqual('cheesecake');
    });
})