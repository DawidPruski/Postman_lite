/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const apiHandlers = async (method: string, url: string, body?: any) => {
  const startTime = Date.now();
  let response;
  try {
    switch (method) {
      case "GET":
        response = await axios.get(url);
        break;
      case "POST":
        response = await axios.post(url, body);
        break;
      case "PUT":
        response = await axios.put(url, body);
        break;
      case "PATCH":
        response = await axios.patch(url);
        break;
      case "DELETE":
        response = await axios.delete(url);
        break;
      default:
        throw new Error("Unsupported method");
    }

    const responseTime = Date.now() - startTime;
    const responseSize = response.headers["content-length"]
      ? `${response.headers["content-length"]} bytes`
      : "Unknown";

    const headers = Object.entries(response.headers)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    console.log(response);
    return {
      time: responseTime,
      status: response.status,
      statusText: response.statusText,
      headers: headers,
      responseSize: responseSize,
      data: response.data,
      config: response.config,
    };
  } catch (error: any) {
    return {
      error: error?.message || "Unknown error",
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data
        ? JSON.stringify(error.response.data, null, 2)
        : "",
    };
  }
};

export default apiHandlers;
