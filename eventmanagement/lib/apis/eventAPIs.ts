import axios from "axios";
import { FetchDataInterface } from "../../interface/interfaces";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const get_all_events = async (): Promise<FetchDataInterface> => {
  try {
    const res = await axios.get(`${BASE_API_URL}/api/events`);
    const data = await res.data;
    return { success: true, data, error: undefined };
  } catch (error: any) {
    return { success: false, data: undefined, error: error.response.data };
  }
};

export const getSearchedEvents = async ({
  name,
  date,
  location,
  sort,
}: {
  name: string;
  date?: string;
  location?: string;
  sort?: string;
}): Promise<FetchDataInterface> => {
  console.log({ name, date, location });
  try {
    const res = await axios.get(
      `${BASE_API_URL}/api/events/search?name=${name}&date=${date}&location=${location}&sort=${sort}`
    );
    const data = await res.data;
    return { success: true, data, error: undefined };
  } catch (error: any) {
    return {
      success: false,
      data: undefined,
      error: error.response.data,
    };
  }
};

export const get_event_by_id = async (
  id: string
): Promise<FetchDataInterface> => {
  try {
    const res = await axios.get(`${BASE_API_URL}/api/events/${id}`);
    const data = await res.data;
    return { success: true, data, error: undefined };
  } catch (error: any) {
    return {
      success: false,
      data: undefined,
      error: error.response.data,
    };
  }
};

export const get_participants_by_event = async (
  id: string
): Promise<FetchDataInterface> => {
  try {
    const res = await axios.get(`${BASE_API_URL}/api/events/${id}/users`);
    const data = await res.data;
    return { success: true, data, error: undefined };
  } catch (error: any) {
    return {
      success: false,
      data: undefined,
      error: error.response.data,
    };
  }
};

export const createEvent = async (eventData: any, token: string) => {
  try {
    const res = await axios({
      url: `${BASE_API_URL}/api/events`,
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: { ...eventData },
    });
    const data = await res.data;
    return { success: true, data: data, error: undefined };
  } catch (error: any) {
    return {
      success: false,
      data: undefined,
      error: error.response,
    };
  }
};

export const editEvent = async (
  eventId: string,
  eventData: any,
  token: string
) => {
  try {
    const res = await axios({
      url: `${BASE_API_URL}/api/events/${eventId}`,
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      data: { ...eventData },
    });
    const data = await res.data;
    return { success: true, data: data, error: undefined };
  } catch (error: any) {
    return {
      success: false,
      data: undefined,
      error: error.response.data,
    };
  }
};

export const registerToEvent = async (
  id: string,
  userData: { name: string; email: string }
) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/api/events/${id}/users`, {
      ...userData,
    });
    const data = await res.data;
    return { success: true, data: data, error: undefined };
  } catch (error: any) {
    return {
      success: false,
      data: undefined,
      error: error.response.data,
    };
  }
};

export const cancelUserRegistration = async (
  userId: string,
  reason: string
) => {
  try {
    const res = await axios.delete(`${BASE_API_URL}/api/users/${userId}`, {
      data: { reason },
    });
    const data = await res.data;
    return { success: true, data: data, error: undefined };
  } catch (error: any) {
    return {
      success: false,
      data: undefined,
      error: error.response.data,
    };
  }
};

export const deleteEvent = async (eventId: string, token: string) => {
  try {
    // const res = await axios.delete(`${BASE_API_URL}/api/events/${eventId}`);

    const res = await axios({
      url: `${BASE_API_URL}/api/events/${eventId}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.data;
    return { success: true, data: data, error: undefined };
  } catch (error: any) {
    return {
      success: false,
      data: undefined,
      error: error.response.data,
    };
  }
};
