import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const { mail } = useParams();
  const handleSubmission = async () => {
    const res = await fetch(`http://localhost:3000/users/verifyOTP/${mail}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ otp }),
    });
    if (res.ok) {
        const data = await res.json();
        console.log(data)
    }
  };
  return (
    <>
      <form onSubmit={handleSubmission}>
        <label htmlFor="Otp">Enter the OTP:</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          id=""
        />
        <input type="submit" />
      </form>
    </>
  );
}
