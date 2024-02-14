import React from "react";
import Navbar from "../components/Navbar";

const Cart = () => {
  const cartItems = [
    { id: 1, name: "Product 1", price: 10, quantity: 2 },
    { id: 2, name: "Product 2", price: 20, quantity: 1 },
    { id: 3, name: "Product 3", price: 15, quantity: 3 },
  ];

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {cartItems.map((item) => (
              <div className="border p-4">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p>Price: Rs.{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="flex flex-row space-x-8">
                  <a href="#" className="text-light-blue-500 text-sm underline">
                    Delete
                  </a>
                  <a href="#" className="text-light-blue-500 text-sm underline">
                    Share
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="border p-4 mb-4">
              <h2 className="text-lg font-bold">Cart Summary</h2>
              <p>Total Items: {totalItems}</p>
              <p>Total Price: Rs{totalPrice}</p>
            </div>
            <button className="bg-[#40773b] text-white px-4 py-2 rounded-md">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
