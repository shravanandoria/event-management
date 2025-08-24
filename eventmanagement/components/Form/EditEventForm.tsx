"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createEvent, get_event_by_id } from "../../lib/apis/eventAPIs";
import { useRouter } from "next/navigation";
import { editEvent } from "../../lib/apis/eventAPIs";

const EditEventForm = ({ eventId }: { formName: string; eventId?: string }) => {
  const router = useRouter();
  const [userInput, setUserInput] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
  });

  const fetchEventData = async (id: string) => {
    if (!id) return;
    const { data, error, success } = await get_event_by_id(id);
    console.log(data);
    if (success) {
      const formattedDate = data.date
        ? new Date(data.date).toISOString().split("T")[0] // "2025-08-27"
        : "";
      setUserInput({
        name: data.name,
        location: data.location,
        description: data.description,
        date: formattedDate,
      });
    } else {
      alert(error);
    }
  };

  const handleEditEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log({ token });
    if (!token) return alert("Auth token not found, Please Login!");
    if (!eventId) return;
    const { data, error, success } = await editEvent(eventId, userInput, token);
    if (success) {
      router.push(`/event/${eventId}`);
    } else {
      alert(error);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEventData(eventId);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 text-black placeholder:text-black">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Edit Event
        </h2>
        <form onSubmit={handleEditEvent} className="space-y-5">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            Edit Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEventForm;
