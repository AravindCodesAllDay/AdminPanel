import React from "react";
import Navbar from "../components/Navbar";

const WishlistPage = () => {
  // Dummy wishlist data
  const wishlistItems = [
    { id: 1, name: "Product 1", price: "Rs.10.99" },
    { id: 2, name: "Product 2", price: "Rs.24.99" },
    { id: 3, name: "Product 3", price: "Rs.32.50" },
  ];

  return (
    <>
    <Navbar/>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white p-4 shadow rounded">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.price}</p>
              <button className="mt-2 px-4 py-2 bg-[#40773b] text-white rounded hover:bg-[#30512d]">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
