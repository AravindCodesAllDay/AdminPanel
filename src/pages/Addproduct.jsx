import { useState } from "react";
import Navbar from "../components/Navbar";
export default function Addproduct() {
  const [name, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState();
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [rating,setRating] = useState("")
  const[numOfRating,setNumOfRating] = useState("");

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

    const res = await fetch(`http://localhost:3000/products`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
    <Navbar/>
      <div className="flex justify-center mt-12">
        <h1 className="text-xl font-semibold font-content text-primecolor mt-2">
          Add your new product here
        </h1>
      </div>
      <div className="flex justify-center mt-6">
        <div className="flex flex-col">
          <form
            onSubmit={handleSubmission}
            className="shadow-lg p-7 rounded-lg"
          >
            <label
              className="text-l font-semibold font-content text-primecolor mr-3"
              htmlFor="productName"
            >
              Product Name: &nbsp;
            </label>
            <input
              className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content  focus:outline-brown"
              type="text"
              placeholder="Enter the product name:"
              value={name}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <br></br>

            <div className="flex flex-row">
              <label
                className="text-l font-semibold mt-3 font-content text-primecolor"
                htmlFor="productMrp"
              >
                MRP: &nbsp;
              </label>
              <input
                className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content ml-24  focus:outline-brown"
                type="text"
                placeholder="Enter the MRP"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <br></br>
            </div>
            <div className="flex flex-row">
              <label
                className="text-l font-semibold font-content mt-3 text-primecolor"
                htmlFor="productdescription"
              >
                Description: &nbsp;
              </label>
              <input
                className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-9 bg-gray-50 font-content  focus:outline-brown"
                type="text"
                placeholder="Enter the description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-row">
              <label
                className="text-l mt-3 font-semibold font-content text-primecolor "
                htmlFor="productstock"
              >
                Stock: &nbsp;
              </label>
              <input
                className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-12 bg-gray-50 font-content  focus:outline-brown"
                type="text"
                placeholder="Enter the stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
              <br></br>
            </div>
            <div className="flex flex-row">
              <label
                className="text-l mt-3 font-semibold font-content text-primecolor "
                htmlFor="productstock"
              >
                Average Rating: &nbsp;
              </label>
              <input
                className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-12 bg-gray-50 font-content  focus:outline-brown"
                type="text"
                placeholder="Enter the stock"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
              <br></br>
            </div>
            <div className="flex flex-row">
              <label
                className="text-l mt-3 font-semibold font-content text-primecolor "
                htmlFor="productstock"
              >
                Rating Count: &nbsp;
              </label>
              <input
                className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-12 bg-gray-50 font-content  focus:outline-brown"
                type="text"
                placeholder="Enter the stock"
                value={numOfRating}
                onChange={(e) => setNumOfRating(e.target.value)}
                required
              />
              <br></br>
            </div>
            <div className="flex flex-row">
              <label
                className="text-l font-semibold font-content mt-3 text-primecolor"
                htmlFor="productImage"
              >
                Product Image : &nbsp;
              </label>
              <input
                className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-contetnt  focus:outline-brown"
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                required
              />
              <br></br>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 shadow-md rounded py-2 px-3 mt-3 text-primecolor bg-gray-50 font-content focus:outline-brown hover:bg-primecolor hover:text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
