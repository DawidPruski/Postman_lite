import { SERVER_URL } from "../config/config";

const apiHandlers = async (method: string, url: string, body?: any) => {
  const startTime = Date.now();

  const serverUrl: string = SERVER_URL;
  const serverBody = {
    url: url,
    method: method,
    body: body,
  };

  const response = await fetch(serverUrl + "/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serverBody),
  });

  const responseTime = Date.now() - startTime;

  return {
    time: responseTime,
    url: url,
    method: method,
    response: response,
  };
  // } catch (error: any) {
  //   const responseTime = Date.now() - startTime;
  //   return {
  //     time: responseTime,
  //     url: url,
  //     method: method,
  //     response: response,
  //     error: error,
  //   };
  // }
};

export default apiHandlers;
