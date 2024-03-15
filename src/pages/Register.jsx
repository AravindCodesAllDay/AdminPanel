import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../assets/google.svg";
import facebookLogo from "../assets/google.svg";

function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [pswd, setPswd] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault();

    const trimmedPswd = pswd.trim();
    const trimmedConfirmPswd = confirmPswd.trim();

    if (trimmedPswd === trimmedConfirmPswd) {
      try {
        setLoading(true);

        const existsResponse = await fetch(
          `http://localhost:3000/users/${mail}`
        );

        if (existsResponse.status === 200) {
          const data = await existsResponse.json();
          console.log(data);
          toast.error("User already exists");
        } else {
          const data = await existsResponse.json();
          console.log(data);
          const registerResponse = await fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ name, mail, phone, pswd }),
          });

          if (!registerResponse.ok) {
            toast.error(`Registration failed: ${registerResponse.statusText}`);
            console.error(
              `Registration failed: ${registerResponse.statusText}`
            );
            return;
          }

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
      } catch (error) {
        console.error("Error during registration:", error.message);
        toast.error("Error during registration. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Passwords don't match");
    }
  };

  if (showOtp) {
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(
          `http://localhost:3000/users/verifyOTP/${mail}`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ otp }),
          }
        );
        console.log(mail);
        if (res.ok) {
          setVerified(true);
          toast.success("Registration Successful");
          const resp = await res.json();
          console.log(resp);
          // Reset form fields
          setName("");
          setMail("");
          setPhone("");
          setPswd("");
          setConfirmPswd("");
          setTimeout(() => {
            nav("/login");
          }, 5000);
        } else {
          setError(true);
          toast.error("OTP verification failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during OTP verification:", error.message);
        toast.error("Error during OTP verification. Please try again later.");
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="h-screen flex flex-col justify-center items-center bg-gray-100 p-12">
          <Link to="/">
            {/* <img src={img1} alt="Company Logo" className="h-24 m-4" /> */}
          </Link>
          <div className="bg-white p-8 px-12 rounded-md shadow-lg w-[440px] flex flex-col items-center">
            <h2 className="text-[#277933] text-2xl mb-6 font-semibold">
              OTP Verification
            </h2>
            <form
              className="flex flex-col gap-6 w-full"
              onSubmit={handleSubmit}
            >
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

              <p className="text-start">
                <Link to="/policy" className="text-customGreen cursor-pointer">
                  Curelli Privacy Policy
                </Link>
              </p>
              <button
                type="submit"
                className="submit-button bg-[#277933] text-white h-10 p-2 rounded"
              >
                Submit
              </button>
            </form>
            {error && !verified && (
              <>
                <h2 className="text-[#277933] text-sm mb-6 font-semibold">
                  OTP Verification failed...!
                </h2>
              </>
            )}
            {verified && (
              <>
                <h2 className="text-[#277933] text-sm mb-6 font-semibold">
                  OTP Verified!
                </h2>
                <p className="text-[#277933]">
                  You will be redirected to Login in 5 seconds...!!
                </p>
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-gray-100 h-screen">
        <ToastContainer />
        <div className="h-100% flex justify-center items-center bg-gray-100 p-12">
          <div className="bg-white p-8 px-16 rounded-md shadow-lg w-[440px]">
            <h2 className="text-[#277933] text-2xl mb-6 text-center font-semibold">
              Register
            </h2>
            <form onSubmit={handleSubmission} className="flex flex-col gap-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
                className="input-field border-[1px] p-2 rounded border-[#0d5b41]"
              />
              <input
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="Email"
                className="input-field border-[1px] p-2 rounded border-[#0d5b41]"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="input-field border-[1px] p-2 rounded border-[#0d5b41]"
              />
              <input
                type="password"
                value={pswd}
                onChange={(e) => setPswd(e.target.value)}
                placeholder="Password"
                className="input-field border-[1px] p-2 rounded border-[#0d5b41]"
              />
              <input
                type="password"
                value={confirmPswd}
                onChange={(e) => setConfirmPswd(e.target.value)}
                placeholder="Confirm Password"
                className="input-field border-[1px] p-2 rounded border-[#0d5b41]"
              />
              {loading && <p className="text-gray-600">Submitting...</p>}

              <button
                type="submit"
                disabled={loading}
                className={`submit-button bg-green-700 text-white h-10 p-2 rounded ${
                  loading && "cursor-not-allowed opacity-50"
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
            <p className="text-start mt-4">
              By creating an account or logging in, you agree to Curelli Foods{" "}
              <Link
                to="/policy"
                className=" font-semibold cursor-pointer hover:text-[#2a64ba] text-[#277933]"
              >
                Privacy Policy.
              </Link>
            </p>
            <hr className="my-3" />
            {/* Consider conditionally rendering Google and Facebook sign-up options */}
            <p className="text-gray-700 flex justify-center">
              Sign up using Google
            </p>
            <div className="mt-3 flex items-center justify-center">
              <img src={googleLogo} alt="Google logo" className="h-8 mr-2" />
              <img
                src={facebookLogo}
                alt="Facebook logo"
                className=" h-8 mr-2"
              />
            </div>
            <hr className="my-3" />
            <p className="mt-4 text-gray-600 text-center">
              Already a Member?
              <Link
                to="/login"
                className="hover:text-[#2a64ba] text-[#277933] font-semibold cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
