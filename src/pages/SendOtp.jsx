import React, { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/Logo_02.png";
import { useNavigate } from "react-router-dom";

export default function SendOtp() {
  const [mail, setMail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showOtp) {
      const res = await fetch(`http://localhost:3000/users/verifyOTP/${mail}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });
      if (res.ok) {
        const data = await res.json();
        setVerified(true);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } else {
      const res = await fetch(`http://localhost:3000/users/sendOTP`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ mail }),
      });

      if (res.ok) {
        setShowOtp(true);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 p-12">
      <Link to="/">
        <img src={img1} alt="Company Logo" className="h-24 m-4" />
      </Link>
      <div className="bg-white p-8 px-12 rounded-md shadow-lg w-[440px] flex flex-col items-center">
        <h2 className="text-[#277933] text-2xl mb-6 font-semibold">
          OTP Verification
        </h2>
        <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="input-field border-[1px] p-2 rounded border-customGreen"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            disabled={showOtp}
            required
          />
          {showOtp && (
            <React.Fragment>
              <label htmlFor="otpInput" className="sr-only">
                Enter OTP
              </label>
              <input
                type="text"
                id="otpInput"
                placeholder="Enter OTP"
                className="input-field border-[1px] p-2 rounded border-customGreen"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <hr className="" />
              <p className="text-customGreen flex justify-center">
                OTP is sent to your above mail Id
              </p>
            </React.Fragment>
          )}

          <p className="text-start">
            <Link to="/policy" className="text-customGreen cursor-pointer">
              Curelli Privacy Policy
            </Link>
          </p>
          <button
            type="submit"
            className="submit-button bg-[#277933] text-white h-10 p-2 rounded"
          >
            {showOtp ? "Submit" : "Next"}
          </button>
        </form>
        {verified && (
          <>
            <h2 className="text-[#277933] text-sm mb-6 font-semibold">
              OTP Verified!
            </h2>
            <p className="text-[#277933]">
              You will be redirectd to Login in 5 seconds...!!
            </p>
          </>
        )}
      </div>
    </div>
  );
}
