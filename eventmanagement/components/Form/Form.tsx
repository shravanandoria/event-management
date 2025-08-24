"use client";
import React, { FormEvent, useState } from "react";
import { createEvent } from "../../lib/apis/eventAPIs";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Auth token not found, Please Login!");
    const { data, error, success } = await createEvent(userInput, token);
    if (success) {
      router.push("/");
    } else {
      alert(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 text-black placeholder:text-black">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="name"
            >
              Event Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={userInput.name}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Alan Walker concert at bandra"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="description"
            >
              Event Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              value={userInput.description}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Tell us more about the event..."
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="date"
            >
              Event Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              value={userInput.date}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="location"
            >
              Event Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              value={userInput.location}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Place where the event is happening"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
