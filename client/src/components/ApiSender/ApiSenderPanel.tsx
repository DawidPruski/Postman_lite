import { useState } from "react";
import styles from "./ApiSenderPanel.module.css";
import HistoryLog from "./HistoryPanel/History";
import RequestUrlField from "./RequestUrlField/RequestUrlField";
import LoginForm from "./LoginForm/LoginForm";

export default function ApiSenderPanel() {
  const [user, setUser] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const handleLogin = () => {
    setUser(true);
  };

  const handleAddResult = (resultObj: any) => {
    setHistory((prev) => [...prev, resultObj]);
  };

  return (
    <>
      {!user && <LoginForm onLogin={handleLogin} />}
      <div className={styles.logo}>
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
      <RequestUrlField setHistory={handleAddResult} />
      <HistoryLog history={history} />
    </>
  );
}
