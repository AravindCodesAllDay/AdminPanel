import React, { useState } from "react";

export default function Addproduct() {
  const [name, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState();
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("");
  const [numOfRating, setNumOfRating] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("photo", photo);
    formData.append("rating", rating);
    formData.append("numOfRating", numOfRating);

    const res = await fetch(`${import.meta.env.VITE_API}products`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <div className="flex justify-center mt-12">
        <h1 className="text-xl font-semibold font-content text-primecolor mt-2">
          Add your new product here
        </h1>
      </div>
      <div className="flex justify-center mt-6">
        <div className="flex flex-col">
          <form
            onSubmit={handleSubmission}
            className="shadow-lg p-7 rounded-lg gap-4"
          >
            <div className="flex  justify-center items-center w-full">
              <label
                className="text-l font-semibold font-content text-primecolor justify-start flex"
                htmlFor="productName"
              >
                Product Name: &nbsp;
              </label>
              <input
                className="w-96 shadow-md rounded p-2 bg-gray-50 font-content focus:outline-brown justify-end flex"
                type="text"
                placeholder="Enter the product name:"
                value={name}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className="flex  justify-center items-center w-full m-2">
              <label
                className="text-l font-semibold mt-3 font-content text-primecolor justify-start flex"
                htmlFor="productMrp"
              >
                MRP: &nbsp;
              </label>
              <input
                className="w-96 shadow-md rounded p-2 bg-gray-50 font-content focus:outline-brown justify-end flex"
                type="text"
                placeholder="Enter the MRP"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="flex  justify-center items-center w-full m-2">
              <label
                className="text-l font-semibold font-content mt-3 text-primecolor"
                htmlFor="productdescription"
              >
                Description: &nbsp;
              </label>
              <input
                className="w-96 shadow-md rounded p-2 bg-gray-50 font-content focus:outline-brown"
                type="text"
                placeholder="Enter the description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="flex  justify-center items-center w-full m-2">
              <label
                className="text-l mt-3 font-semibold font-content text-primecolor "
                htmlFor="productstock"
              >
                Stock: &nbsp;
              </label>
              <input
                className="w-96 shadow-md rounded p-2 bg-gray-50 font-content focus:outline-brown"
                type="text"
                placeholder="Enter the stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div className="flex  justify-center items-center w-full m-2">
              <label
                className="text-l mt-3 font-semibold font-content text-primecolor "
                htmlFor="productstock"
              >
                Average Rating: &nbsp;
              </label>
              <input
                className="w-96 shadow-md rounded p-2 bg-gray-50 font-content focus:outline-brown"
                type="text"
                placeholder="Enter Product Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </div>
            <div className="flex  justify-center items-center w-full m-2">
              <label
                className="text-l mt-3 font-semibold font-content text-primecolor "
                htmlFor="productstock"
              >
                Rating Count: &nbsp;
              </label>
              <input
                className="w-96 shadow-md rounded p-2 bg-gray-50 font-content focus:outline-brown"
                type="text"
                placeholder="Enter Total number of Ratings"
                value={numOfRating}
                onChange={(e) => setNumOfRating(e.target.value)}
                required
              />
            </div>
            <div className="flex  justify-center items-center w-full m-2">
              <label
                className="text-l font-semibold font-content mt-3 text-primecolor"
                htmlFor="productImage"
              >
                Product Image : &nbsp;
              </label>
              <input
                className="w-96 shadow-md rounded p-2 bg-gray-50 font-content focus:outline-brown"
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                required
              />
            </div>
            <button
              type="submit"
              className="w-1/2 shadow-md rounded py-2 px-3 mt-3 text-primecolor bg-gray-50 font-content focus:outline-brown hover:bg-primecolor hover:text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
