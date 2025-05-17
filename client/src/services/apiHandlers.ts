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

    return {
      time: responseTime,
      url: url,
      method: method,
      response: response,
    };
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    return {
      time: responseTime,
      url: url,
      method: method,
      response: response,
      error: error,
    };
  }
};

export default apiHandlers;
