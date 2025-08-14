import { SERVER_URL } from "../config/config";

const apiHandlers = async (method: string, url: string, token: string, body?: any) => {
  let response;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (token) {
    myHeaders.append("Authorization", token);
  }
  const startTime = Date.now();

  const serverUrl: string = SERVER_URL;
  const serverBody = {
    url: url,
    method: method,
    body: body,
  };
  const requestBody = JSON.stringify(serverBody);

  try {
    response = await fetch(serverUrl + "/api/requests/send", {
      method: "POST",
      headers: myHeaders,
      body: requestBody,
    });

    const responseTime = Date.now() - startTime;

    const responseBody = await response.json();
    return {
      time: responseTime,
      url: url,
      method: method,
      requestHeaders: myHeaders,
      requestBody: JSON.parse(requestBody),
      responseBody: responseBody,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      time: responseTime,
      url: url,
      method: method,
      requestHeaders: myHeaders,
      requestBody: requestBody,
      response: response,
      error: error,
    };
  }
};

export default apiHandlers;
