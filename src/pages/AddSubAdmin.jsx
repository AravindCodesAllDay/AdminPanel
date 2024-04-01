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
    <div className="">
      <form className="border shadow-lg" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <input
          type="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          placeholder="Confirm email"
        />
        <button type="submit">Add Sub-admin</button>
      </form>
    </div>
  );
}
