"use client";
import { useEffect, useState } from "react";
import { get_all_events, getSearchedEvents } from "../../lib/apis/eventAPIs";
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import { EventInterface } from "../../interface/interfaces";

export default function Home() {
  const [events, setEvents] = useState<Array<EventInterface>>([]);
  const [searchInput, setSearchInput] = useState<{
    name: string;
    date: string;
    location: string;
    sort: string;
  }>({ name: "", date: "", location: "", sort: "asc" });
  const [cacheSearchInput, setCacheSearchInput] = useState<any>({});

  const fetch_events = async () => {
    const { success, data, error } = await get_all_events();
    if (success) {
      setEvents(data);
    } else {
      alert(error);
    }
  };

  const handleSearchEvents = async () => {
    if (
      cacheSearchInput[searchInput.name] ||
      cacheSearchInput[searchInput.location] ||
      cacheSearchInput[searchInput.date]
    ) {
      if (cacheSearchInput[searchInput.name]) {
        setEvents(cacheSearchInput[searchInput.name]);
      }
      if (cacheSearchInput[searchInput.location]) {
        setEvents(cacheSearchInput[searchInput.location]);
      }
      if (cacheSearchInput[searchInput.date]) {
        setEvents(cacheSearchInput[searchInput.date]);
      }
      return;
    }

    const { data, error, success } = await getSearchedEvents({
      name: searchInput.name,
      date: searchInput.date,
      location: searchInput.location,
      sort: searchInput.sort,
    });

    if (success) {
      setEvents(data);
      if (searchInput.name) {
        setCacheSearchInput((prev: any) => ({
          ...prev,
          [searchInput.name]: data,
        }));
      }
      if (searchInput.location) {
        setCacheSearchInput((prev: any) => ({
          ...prev,
          [searchInput.location]: data,
        }));
      }
      if (searchInput.date) {
        setCacheSearchInput((prev: any) => ({
          ...prev,
          [searchInput.date]: data,
        }));
      }
    } else {
      alert(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => handleSearchEvents(), 400);
    return () => clearTimeout(timer);
  }, [
    searchInput?.name,
    searchInput?.location,
    searchInput?.date,
    searchInput.sort,
  ]);

  useEffect(() => {
    fetch_events();
  }, []);

  console.log(searchInput);

  return (
    <div>
      <div className="search p-6 max-w-[400px] m-auto space-y-3">
        <Search
          searchInput={searchInput?.name}
          setSearchInput={setSearchInput}
        />
        <div className="m-auto bg-gray-700 p-3 rounded-lg border-2 border-black mb-3">
          <input
            id="location"
            name="location"
            value={searchInput?.location}
            onChange={(e) =>
              setSearchInput((prev: any) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            type="text"
            className="w-full   text-white focus:ring-2 focus:ring-gray-700 focus:outline-none"
            placeholder="📍 Enter location"
          />
        </div>
        <div className="m-auto bg-gray-700 p-3 rounded-lg border-2 border-black mb-3">
          <input
            id="date"
            onChange={(e) =>
              setSearchInput((prev: any) => ({ ...prev, date: e.target.value }))
            }
            name="date"
            type="date"
            className="w-full text-white focus:ring-2 focus:ring-gray-700 focus:outline-none"
          />
        </div>
        <select
          id="sort"
          onChange={(e) =>
            setSearchInput((prev: any) => ({ ...prev, sort: e.target.value }))
          }
          defaultValue={"asc"}
          className="p-3 w-full bg-gray-700 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {events.length == 0 && (
        <div className="text-black text-3xl lg:text-6xl text-center">
          No events are available
        </div>
      )}
      <div className="events mt-6 justify-center gap-6 mx-10 grid md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card
            key={event.id}
            name={event.name}
            description={event.description}
            id={event.id}
            created_at={event.created_at}
            date={event.date}
            location={event.location}
          />
        ))}
      </div>
    </div>
  );
}
