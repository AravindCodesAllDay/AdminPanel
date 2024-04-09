import React, { useState } from "react";

export default function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    photo: null,
    description: "",
    rating: "",
    numOfRating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API}products`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
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
            onSubmit={handleSubmit}
            className="shadow-lg p-7 rounded-lg gap-4"
          >
            {Object.entries(productData).map(([key, value]) => (
              <div key={key} className="flex w-full m-2 items-center">
                <label
                  className="text-l font-semibold font-content text-primecolor"
                  htmlFor={key}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </label>
                <div className="w-full flex justify-end">
                  {key === "photo" ? (
                    <input
                      className="w-96 shadow-md rounded p-2 bg-gray-50 font-content focus:outline-brown"
                      type="file"
                      name={key}
                      onChange={handleImageChange}
                      required
                    />
                  ) : (
                    <input
                      className="w-96 shadow-md rounded p-2 bg-gray-50 font-content focus:outline-brown"
                      type={key === "price" ? "number" : "text"}
                      placeholder={`Enter the ${key}`}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      required
                    />
                  )}
                </div>
              </div>
            ))}
            <button
              type="submit"
              className=" shadow-md rounded py-1 px-2 mt-3 font-bold mx-auto text-primecolor bg-green-800 text-white font-content focus:outline-brown hover:bg-gray-100 hover:text-green-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
