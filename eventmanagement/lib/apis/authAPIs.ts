import axios from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signup = async (name: string, email: string, password: string) => {
  try {
    console.log({ name, email, password });
    const res = await axios({
      url: `${BASE_API_URL}/api/signup`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { name, email, password },
    });

    const data = await res.data;
    console.log({ data });
    return { success: true, data, error: undefined };
  } catch (error: any) {
    return {
      success: false,
      data: undefined,
      error: error.response.data.error,
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await axios({
      url: `${BASE_API_URL}/api/login`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { email, password },
    });

    const data = await res.data;
    return { success: true, data, error: undefined };
  } catch (error: any) {
    return {
      success: false,
      data: undefined,
      error: error.response.data.error,
    };
  }
};
