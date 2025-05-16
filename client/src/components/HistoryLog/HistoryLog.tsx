import Log from "./Log";

interface HistoryLogItem {
  time: string;
  status: string;
  statusText: string;
  headers: string;
  responseSize: string;
  data: any;
  config: any;
}

interface HistoryLogProps {
  history: HistoryLogItem[];
}

const HistoryLog = ({ history }: HistoryLogProps) => {
  return history.map((i, index) => (
    <Log
      key={index}
      title={`${i.config.method?.toUpperCase()} ${i.data.url}`}
      status={`${i.status} | ${(i.time / 60).toFixed(2)}s`}
      network={`Network placeholder`}
      requestHeaders={`RequestHeaders`}
      requestBody={`RequestBody`}
      responseHeaders={`RequestHeaders`}
      responseBody={`RequestBody`}
      details={`tu coś będzie`}
    />
  ));
};

export default HistoryLog;
