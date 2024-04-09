import React from "react";

export default function AddCarouselImg() {
  const renderInputField = (labelText, inputName) => (
    <div className="flex gap-3 items-center">
      <label
        htmlFor={inputName}
        className="font-semibold font-content text-primecolor"
      >
        {labelText}:
      </label>
      <input
        type="file"
        className="w-96 shadow-md rounded py-2 px-3 bg-gray-50 font-content focus:outline-brown"
        id={inputName}
        name={inputName}
        accept="image/*"
        required
      />
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch(`${import.meta.env.VITE_API}carousel/`, {
        method: "POST",
        body: formData,
      });

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
      <div className="flex justify-center mt-12">
        <h1 className="text-xl font-semibold font-content text-primecolor">
          Upload Carousel Images
        </h1>
      </div>
      <div className="flex justify-center mt-6">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="shadow-lg p-5 rounded-lg flex flex-col"
        >
          <div className="flex gap-3">
            <div className="flex flex-col gap-5">
              {renderInputField("Laptop Carousel Image 1", "carouselImage1")}
              {renderInputField("Laptop Carousel Image 2", "carouselImage2")}
              {renderInputField("Laptop Carousel Image 3", "carouselImage3")}
              {renderInputField("Laptop Carousel Image 4", "carouselImage4")}
            </div>
            <div className="flex flex-col gap-5">
              {renderInputField(
                "Mobile Carousel Image 1",
                "mobileCarouselImage1"
              )}
              {renderInputField(
                "Mobile Carousel Image 2",
                "mobileCarouselImage2"
              )}
              {renderInputField(
                "Mobile Carousel Image 3",
                "mobileCarouselImage3"
              )}
              {renderInputField(
                "Mobile Carousel Image 4",
                "mobileCarouselImage4"
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className=" shadow-md rounded py-1 px-2 mt-3 font-bold mx-auto text-primecolor bg-green-800 text-white font-content focus:outline-brown hover:bg-gray-100 hover:text-green-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
