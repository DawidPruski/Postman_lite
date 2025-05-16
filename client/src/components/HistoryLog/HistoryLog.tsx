import Log from "./Log";
const HistoryLog = ({ title, status, details }) => {
  return (
    <>
      <Log title={title} status={status} children={details} />
    </>
  );
};

export default HistoryLog;
