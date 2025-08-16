import Log from "./Log";

interface HistoryLogItem {
  time: string;
  url: string;
  method: string;
  requestHeaders: any;
  requestBody: any;
  responseBody?: any;
  error?: any;
}

interface HistoryLogProps {
  history: HistoryLogItem[];
}

const HistoryLog = ({ history }: HistoryLogProps) => {
  return history.map((i, index) => {
    if (i.error) {
      return (
        <Log
          key={index}
          status={`${i.error?.status ? i.error.status : i.error.code} | ${(Number(i.time) / 1000).toFixed(2)}s`}
          urlAndMethod={`${i.method?.toUpperCase()} ${i.url}`}
          requestHeaders={i.error?.config?.headers}
          requestBody={i.error?.config?.data ? i.error.config.data : "No body included"}
          responseHeaders={i.error?.response?.headers ?? ""}
          responseBody={i.error?.response?.data ? i.error.response.data : "No response body"}
        />
      );
    }
    return (
      <Log
        key={index}
        status={`${i.responseBody?.statusCodeValue || "Unknown"} | ${(Number(i.time) / 1000).toFixed(2)}s`}
        urlAndMethod={`${i.method?.toUpperCase()} ${i.url}`}
        requestHeaders={i.requestHeaders?.["Content-Type"]}
        requestBody={i.requestBody?.body}
        responseHeaders={i.responseBody?.body?.headers ? JSON.stringify(i.responseBody.body.headers, null, 2) : "No response headers"}
        responseBody={i.responseBody?.body ? JSON.stringify(i.responseBody.body, null, 2) : "No response body"}
      />
    );
  });
};

export default HistoryLog;
