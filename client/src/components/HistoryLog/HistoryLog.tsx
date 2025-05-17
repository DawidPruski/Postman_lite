import Log from "./Log";

interface HistoryLogItem {
  time: string;
  url: string;
  method: string;
  response?: any;
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
          status={`${i.error?.status ? i.error.status : i.error.code} | ${(
            Number(i.time) / 1000
          ).toFixed(2)}s`}
          urlAndMethod={`${i.method?.toUpperCase()} ${i.url}`}
          requestHeaders={i.error?.config?.headers}
          requestBody={
            i.error?.config?.data ? i.error.config.data : "No body included"
          }
          responseHeaders={i.error?.response?.headers ?? ""}
          responseBody={
            i.error?.response?.data ? i.error.response.data : "No response body"
          }
        />
      );
    }

    return (
      <Log
        key={index}
        status={`${i.response?.status || "Unknown"} | ${(
          Number(i.time) / 1000
        ).toFixed(2)}s`}
        urlAndMethod={`${i.method?.toUpperCase()} ${i.url}`}
        requestHeaders={i.response?.config?.headers}
        requestBody={i.response?.config?.data}
        responseHeaders={i.response?.headers}
        responseBody={
          i.response?.data
            ? JSON.stringify(i.response.data, null, 2)
            : "No response body"
        }
      />
    );
  });
};

export default HistoryLog;
