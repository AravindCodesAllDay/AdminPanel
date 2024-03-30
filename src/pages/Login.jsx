import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img1 from "../assets/Logo01.webp";
import google from "../assets/google.png";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault();

    try {
      if (
        import.meta.env.VITE_LOGIN === username &&
        import.meta.env.VITE_PSWD === password
      ) {
        const loginRes = await fetch(`${import.meta.env.VITE_API}admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }), // Assuming the login API requires username and password
        });

        if (!loginRes.ok) {
          throw new Error("Login failed");
        }

        const loginData = await loginRes.json();
        console.log(loginData);
        const verifyRes = await fetch(
          `${import.meta.env.VITE_API}admin/verify/${loginData.token}`,
          {
            method: "GET", // Adjust the method according to your backend route
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${loginData.token}`, // Assuming your backend expects token in Authorization header
            },
          }
        );

        if (!verifyRes.ok) {
          throw new Error("Token verification failed");
        }

        const verificationData = await verifyRes.json();

        if (verificationData.valid) {
          sessionStorage.setItem("token", loginData.token);
          navigate("/viewproducts");
        } else {
          toast.error("Token verification failed");
        }
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      toast.error("Error during login, try again later");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          //   setProfile(res.data);
          const response = await fetch(
            `${import.meta.env.VITE_API}users/${res.data.email}`
          );
          if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem("id", data._id);
            sessionStorage.setItem("name", data.name);
            nav("/");
          }
        })
        .catch((err) => console.log(err));
    }
    return () => {
      if (user) {
        googleLogout();
      }
    };
  }, [user]);

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
          <div className="bg-white p-8 px-16 rounded-lg shadow-lg w-[440px]">
            <h2 className="text-[#277933] text-2xl mb-6 text-center font-semibold">
              Admin Login
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input-field border-[1px] p-2 rounded border-[#0d5b41]"
              />
              <button
                type="submit"
                className="submit-button bg-[#277933] text-white h-10 p-2 rounded"
              >
                Submit
              </button>
            </form>
            <hr className="my-3" />
            <button
              className="submit-button text-black p-2 border-2 my-2 rounded-full flex items-center w-full justify-center"
              // onClick={login}
              onClick={() => navigate("users")}
            >
              <img src={google} alt="google logo" className="h-6 mr-2" />
              <p className=" font-semibold">Continue with Google</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
