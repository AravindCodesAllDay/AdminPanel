import React, { useState } from "react";
import axios from "axios";

export default function AddSubAdmin() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      alert("Emails do not match");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API}admin/addsubadmin`,
        { email }
      );
      if (response.status === 200) {
        alert("Sub-admin added successfully");
        setEmail("");
        setConfirmEmail("");
      }
    } catch (error) {
      console.error("Error adding sub-admin:", error.message);
      alert("Error adding sub-admin, please try again later");
    }
  };

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <h2 className="text-2xl font-semibold m-3">Sub-admins</h2>
      <form
        className="border-2 shadow-lg m-3 p-3 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="border-2 shadow m-2"
        />
        <input
          type="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          placeholder="Confirm email"
          className="border-2 shadow m-2"
        />
        <button
          type="submit"
          className=" shadow-md rounded py-1 px-2 mt-3 font-bold mx-auto text-primecolor bg-green-800 text-white font-content focus:outline-brown hover:bg-gray-100 hover:text-green-800"
        >
          Add SubAdmin
        </button>
      </form>
    </div>
  );
}
