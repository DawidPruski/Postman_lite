import { SERVER_URL } from "../config/config";

const apiHandlers = async (method: string, url: string, body?: any) => {
  const startTime = Date.now();

  const serverUrl: string = SERVER_URL;
  const serverBody = {
    url: url,
    method: method,
    body: body,
  };
  let response;
  const requestHeaders = { "Content-Type": "application/json" };
  const requestBody = JSON.stringify(serverBody);
  try {
    response = await fetch(serverUrl + "/api/send", {
      method: "POST",
      headers: requestHeaders,
      body: requestBody,
    });

    const responseTime = Date.now() - startTime;

    const responseBody = await response.json();
    return {
      time: responseTime,
      url: url,
      method: method,
      requestHeaders: requestHeaders,
      requestBody: JSON.parse(requestBody),
      responseBody: responseBody,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      time: responseTime,
      url: url,
      method: method,
      requestHeaders: requestHeaders,
      requestBody: requestBody,
      response: response,
      error: error,
    };
  }
};

export default apiHandlers;
