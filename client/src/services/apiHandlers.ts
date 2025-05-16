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

    let formattedData;
    try {
      formattedData = JSON.stringify(response.data, null, 2);
    } catch {
      formattedData = response.data.toString();
    }

    return `
    Request: ${method} ${url}
    Status: ${response.status} ${response.statusText}
    Response Time: ${responseTime}ms
    Response Size: ${responseSize}

    Headers:
    ${headers}

    Body:
    ${formattedData}`.trim();
  } catch (error: any) {
    const errorMessage = error.response
      ? `Error: ${error.response.status} ${
          error.response.statusText
        }\n\n${JSON.stringify(error.response.data, null, 2)}`
      : `Error: ${error.message}`;
    return `
    Request: ${method} ${url}
    Status: Failed
    Response Time: ${Date.now() - startTime}ms

    Error:
    ${errorMessage}
    `.trim();
  }
};

export default apiHandlers;
