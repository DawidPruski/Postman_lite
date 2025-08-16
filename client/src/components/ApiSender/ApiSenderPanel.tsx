import { useEffect, useState } from "react";
import HistoryLog from "./HistoryAndLogs/History";
import RequestUrlField from "./RequestUrlField/RequestUrlField";
import LoginForm from "./LoginForm/LoginForm";

export default function ApiSenderPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
  };

  const handleAddResult = (resultObj: any) => {
    setHistory((prev) => [...prev, resultObj]);
  };

  useEffect(() => {
    const loggedPostmanUser = window.localStorage.getItem("loggedPostmanUser");
    if (loggedPostmanUser) {
      const user = JSON.parse(loggedPostmanUser);
      setToken(user.token);
    }
  }, []);

  return (
    <>
      <div className="logo">
        <pre>
          {`
    ________             _____                               ________________
    ___  __ \\______________  /_______ _________ _______      ___  /___(_)_  /_____
    __  /_/ /  __ \\_  ___/  __/_  __ \`__ \\  __ \`/_  __ \\     __  / __  /_  __/  _ \\
    _  ____// /_/ /(__  )/ /_ _  / / / / / /_/ /_  / / /     _  /___  / / /_ /  __/
    /_/     \\____//____/ \\__/ /_/ /_/ /_/\\__,_/ /_/ /_/      /_____/_/  \\__/ \\___/

            `}
        </pre>
      </div>
      {!token && <LoginForm onLogin={handleLogin} />}
      {token && (
        <>
          <RequestUrlField setHistory={handleAddResult} token={token} />
          <HistoryLog history={history} />
        </>
      )}
    </>
  );
}
