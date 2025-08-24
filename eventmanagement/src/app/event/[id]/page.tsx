"use client";
import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import {
  cancelUserRegistration,
  deleteEvent,
  get_event_by_id,
  get_participants_by_event,
  registerToEvent,
} from "../../../../lib/apis/eventAPIs";
import {
  EventInterface,
  UserInterface,
} from "../../../../interface/interfaces";
import { useParams } from "next/navigation";
import Button from "../../../../components/Button/Button";
import { useRouter } from "next/navigation";

interface PopUpProps {
  setUserData: React.Dispatch<SetStateAction<{ name: string; email: string }>>;
  handleRegisterEvent: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  setShowDialogue: (para: boolean) => void;
}

interface PopUpMessage {
  setShowRejectParticipant: ({
    show,
    userId,
  }: {
    show: boolean;
    userId: string;
  }) => void;
  setCancelReason: (para: string) => void;
  handleCancelUser: (userId: string) => Promise<void>;
  userId: string;
}

const PopUp = ({
  setUserData,
  handleRegisterEvent,
  setShowDialogue,
}: PopUpProps) => {
  return (
    <div className="w-full h-full border-black border-2 bg-gray-800 rounded-lg shadow-2xl text-white p-6">
      <div
        className="text-right cursor-pointer"
        onClick={() => setShowDialogue(false)}
      >
        ✖
      </div>
      <h1 className="text-center font-bold text-2xl mb-3">Register</h1>
      <form onSubmit={handleRegisterEvent} className="space-y-5">
        <div>
          <label className="block  font-medium mb-1 text-white" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            type="text"
            required
            className="w-full px-4 py-2 border text-white placeholder:text-white/20 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block  font-medium mb-1 text-white" htmlFor="name">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            required
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            className="w-full px-4 py-2 border text-white placeholder:text-white/20 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Johndoe@example.com"
          />
        </div>

        <Button type="submit" text="Register" />
      </form>
    </div>
  );
};

const PopUpMessage = ({
  setShowRejectParticipant,
  setCancelReason,
  handleCancelUser,
  userId,
}: PopUpMessage) => {
  return (
    <div className="w-full h-full border-black border-2 bg-gray-800 rounded-lg shadow-2xl text-white p-6">
      <div
        className="text-right cursor-pointer"
        onClick={() => setShowRejectParticipant({ show: false, userId: "" })}
      >
        ✖
      </div>
      <h1 className="text-center font-bold text-2xl mb-3">Cancellation</h1>
      <form className="space-y-5">
        <div>
          <label className="block  font-medium mb-1 text-white" htmlFor="name">
            Reason For Cancelling This User
          </label>
          <textarea
            id="name"
            name="name"
            rows={4}
            required
            onChange={(e) => setCancelReason(e.target.value)}
            className="w-full px-4 py-2 border text-white placeholder:text-white/20 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <Button
          type="button"
          text="Cancel User"
          onClick={() => handleCancelUser(userId)}
        />
      </form>
    </div>
  );
};

const EventPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [userData, setUserData] = useState({ name: "", email: "" });
  const [showDialogue, setShowDialogue] = useState<boolean>(false);
  const [showRejectParticipant, setShowRejectParticipant] = useState<{
    show: boolean;
    userId: string;
  }>({
    show: false,
    userId: "",
  });

  const [data, setData] = useState<EventInterface>({
    name: "",
    description: "",
    id: "",
    date: "",
    location: "",
    created_at: "",
  });

  const [participants, setParticipants] = useState<Array<UserInterface>>([]);
  const [cancelReason, setCancelReason] = useState("");

  const get_event_data = async () => {
    if (typeof id !== "string") return;
    const { data, error, success } = await get_event_by_id(id);
    if (success) {
      setData(data);
    } else {
      alert(error);
    }
  };

  const get_event_participants = async () => {
    if (typeof id !== "string") return;
    const { data, error, success } = await get_participants_by_event(id);
    if (success) {
      setParticipants(data);
    } else {
      alert(error);
    }
  };

  const handleRegisterEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof id !== "string") return;

    if (!userData.name || !userData.email)
      alert("Please provide all the details");

    const { data, error, success } = await registerToEvent(id, {
      name: userData.name,
      email: userData.email,
    });
    if (success) {
      await get_event_participants();
      setShowDialogue(false);
    } else {
      alert(error);
    }
  };

  const handleCancelUser = async (userId: string): Promise<void> => {
    if (!cancelReason) {
      alert("Please enter a reason to cancel this user");
      return;
    }
    const { data, error, success } = await cancelUserRegistration(
      userId,
      cancelReason
    );

    if (success) {
      await get_event_participants();
      setShowRejectParticipant({ show: false, userId: "" });
    } else {
      alert(error);
    }
  };

  const handleDeleteEvent = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Auth token not found, Please Login!");
    const eventId = data.id;
    const { error, success } = await deleteEvent(eventId, token);
    if (success) {
      router.push("/");
    } else {
      alert(error);
    }
  };

  const formatDate = (): string => {
    const dateObj = new Date(data.date);
    const yy = String(dateObj.getFullYear());
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");

    return `${yy}/${mm}/${dd}`;
  };

  useEffect(() => {
    get_event_data();
    get_event_participants();
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:gap-3 md:justify-start h-screen text-black p-3">
      {showDialogue && (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[350px] md:w-1/2 ">
          <PopUp
            setUserData={setUserData}
            handleRegisterEvent={handleRegisterEvent}
            setShowDialogue={setShowDialogue}
          />
        </div>
      )}
      {showRejectParticipant.show && (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[350px] md:w-1/2 ">
          <PopUpMessage
            setShowRejectParticipant={setShowRejectParticipant}
            setCancelReason={setCancelReason}
            handleCancelUser={handleCancelUser}
            userId={showRejectParticipant.userId}
          />
        </div>
      )}
      <div className="left flex-1">
        <h1 className="text-6xl bg-gray-800 p-3 rounded-lg text-white shadow-lg mb-4">
          {data.name}
        </h1>
        <p className="scrollbar-hide bg-gray-800 p-3 rounded-lg text-white shadow-lg max-h-72 overflow-scroll over">
          {data.description}
        </p>
        <div className="flex gap-6 mt-6 text-center">
          <p className="bg-gray-800 rounded-lg text-white shadow-lg p-3 min-w-[100px]">
            Id: {data.id}
          </p>
          <p className="bg-gray-800 rounded-lg text-white shadow-lg p-3 min-w-[100px]">
            Date: {formatDate()}
          </p>
          <p className="bg-gray-800 rounded-lg text-white shadow-lg p-3 min-w-[100px]">
            location: {data.location}
          </p>
        </div>
        <div className="my-6  max-w-[300px] m-auto">
          <Button text="Register" onClick={() => setShowDialogue(true)} />
        </div>

        <div className="my-6  max-w-[300px] m-auto">
          <Button
            text="Edit Event"
            onClick={() => router.push(`/editEvent/${id}`)}
          />
        </div>
        <div className="my-6 max-w-[300px] m-auto">
          <Button
            text="Delete Event"
            color="bg-red-800"
            onClick={() => handleDeleteEvent()}
          />
        </div>
      </div>
      <div>
        <div>
          <div className="right scrollbar-hide bg-gray-800 rounded-lg text-white shadow-lg p-3 overflow-y-scroll h-96 min-w-[300px]">
            <h1 className="font-bold mb-4 text-center">Participants</h1>

            <div className="participants ">
              {participants.length == 0 && (
                <p>There are not participants yet!</p>
              )}
              {participants.map(
                (user) =>
                  user.status === "active" && (
                    <div
                      key={user.id}
                      className="flex justify-between items-center border bg-gray-900 text-left rounded-lg gap-4 m-2 p-2 max-w-[400px]"
                    >
                      <div>
                        <p> {user.name}</p>
                        <p> {user.email}</p>
                      </div>
                      <p
                        className="cursor-pointer"
                        onClick={() =>
                          setShowRejectParticipant({
                            show: true,
                            userId: user.id,
                          })
                        }
                      >
                        ❌
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="right scrollbar-hide bg-gray-800 rounded-lg text-white shadow-lg p-3 overflow-y-scroll h-96 min-w-[300px] mt-6">
            <h1 className="font-bold mb-4 text-center">Rejected</h1>

            <div className="participants ">
              {participants.length == 0 && (
                <p>There are not participants yet!</p>
              )}
              {participants.map(
                (user) =>
                  user.status !== "active" && (
                    <div
                      key={user.id}
                      className="flex justify-between items-center border bg-gray-900 text-left rounded-lg gap-4 m-2 p-2 max-w-[400px]"
                    >
                      <div>
                        <p> {user.name}</p>
                        <p> {user.email}</p>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
