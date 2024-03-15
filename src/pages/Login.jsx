import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img1 from "../assets/curelli_logo.webp";
import google from "../assets/google.svg";

const Login = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [pswd, setPswd] = useState("");
  const [desktopCarousels, setDesktopCarousels] = useState([]);
  const [mobileCarousels, setMobileCarousels] = useState([]);

  const handleSubmission = async (e) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_LOGIN, import.meta.env.VITE_PSWD);
    console.log(username, pswd);
    try {
      if (
        import.meta.env.VITE_LOGIN == username &&
        import.meta.env.VITE_PSWD == pswd
      ) {
        const getToken = async () => {
          const res = await fetch(
            `http://localhost:3000/users/admin/${
              import.meta.env.VITE_SECRET_KEY
            }`
          );
          const data = await res.json();
          sessionStorage.setItem("token", data.token);
          nav("/home");
        };
        getToken();
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      toast.error("Error during login, try again later");
    }
  };

  useEffect(() => {
    const fetchMobileImages = async () => {
      try {
        const res = await fetch(`http://localhost:3000/carousels`);
        const data = await res.json();

        const mobileImages = [];
        const desktopImages = [];

        data.forEach((element) => {
          if (element.mobile) {
            mobileImages.push(element);
          } else {
            desktopImages.push(element);
          }
        });

        setMobileCarousels(mobileImages);
        setDesktopCarousels(desktopImages);

        console.log(desktopImages, mobileImages);
      } catch (error) {
        console.error("Error fetching mobile images:", error);
      }
    };

    fetchMobileImages();
  }, []);

  return (
    <>
      <div className="bg-gray-100 h-screen">
        <ToastContainer />
        <div className="flex flex-row bg-gray-100 justify-center">
          <Link to="/">
            <img
              className="relative h-[100px] object-cover"
              alt="Image"
              src={img1}
            />
          </Link>
        </div>
        <div className="h-100% flex justify-center items-center bg-gray-100 p-12">
          <div className="bg-white p-8 px-16 rounded-md shadow-lg w-[440px]">
            <h2 className="text-[#277933] text-2xl mb-6 text-center font-semibold">
              Login
            </h2>
            <form onSubmit={handleSubmission} className="flex flex-col gap-6">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email"
                className="input-field border-[1px] p-2 rounded border-[#0d5b41]"
              />
              <input
                type="password"
                value={pswd}
                onChange={(e) => setPswd(e.target.value)}
                placeholder="Password"
                className="input-field border-[1px] p-2 rounded border-[#0d5b41]"
              />
              <Link to="/otp">Forgot Password?</Link>
              <button
                type="submit"
                className="submit-button bg-[#277933] text-white h-10 p-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
