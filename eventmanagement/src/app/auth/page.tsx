"use client";
import { FormEvent, useState } from "react";
import { login, signup } from "../../../lib/apis/authAPIs";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    if (!signupData.name || !signupData.email || !signupData.password)
      return alert("Please provide all the values");

    const { data, error, success } = await signup(
      signupData.name,
      signupData.email,
      signupData.password
    );

    if (success) {
      console.log(data)
      alert("Your account has been created now you can login!");
      window.location.replace("/");
    } else {
      alert(error);
    }
  };

  const handleLogin = async () => {
    if (!signupData.email || !signupData.password)
      return alert("Please provide all the values");

    const { data, error, success } = await login(
      signupData.email,
      signupData.password
    );

    if (success) {
      alert("You have successfully logged in!");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.replace("/");
    } else {
      console.log(error);
      alert(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLogin) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                name="name"
                type="text"
                onChange={(e) =>
                  setSignUpData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                required
                className="w-full text-black mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) =>
                setSignUpData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              required
              className="w-full text-black mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) =>
                setSignUpData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              required
              className="w-full text-black mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default page;
