import React from "react";
import Navbar from "../components/Navbar";

export default function CarouselImg() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        "http://localhost:3000/products/addcarousels",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Images uploaded successfully.");
      } else {
        console.error("Error uploading images.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-12">
        <h1 className="text-xl font-semibold font-content text-primecolor mt-2">
          Upload Carousel Images
        </h1>
      </div>
      <div className="flex justify-center mt-6">
        <div className="flex flex-col">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="shadow-lg p-7 rounded-lg"
          >
            <div>
              <label
                htmlFor="carouselImage1"
                className="text-l font-semibold font-content text-primecolor mr-3"
              >
                Carousel Image 1:
              </label>
              <input
                type="file"
                className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-contetnt  focus:outline-brown"
                id="carouselImage1"
                name="carouselImage1"
                accept="image/*"
                required
              />
            </div>
            <div>
              <label
                htmlFor="carouselImage2"
                className="text-l font-semibold font-content text-primecolor mr-3"
              >
                Carousel Image 2:
              </label>
              <input
                type="file"
                className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-contetnt  focus:outline-brown"
                id="carouselImage2"
                name="carouselImage2"
                accept="image/*"
                required
              />
            </div>
            <div>
              <label
                htmlFor="carouselImage3"
                className="text-l font-semibold font-content text-primecolor mr-3"
              >
                Carousel Image 3:
              </label>
              <input
                type="file"
                className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-contetnt  focus:outline-brown"
                id="carouselImage3"
                name="carouselImage3"
                accept="image/*"
                required
              />
            </div>
            <div>
              <label
                htmlFor="carouselImage4"
                className="text-l font-semibold font-content text-primecolor mr-3"
              >
                Carousel Image 4:
              </label>
              <input
                type="file"
                className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-contetnt  focus:outline-brown"
                id="carouselImage4"
                name="carouselImage4"
                accept="image/*"
                required
              />
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

<></>;
