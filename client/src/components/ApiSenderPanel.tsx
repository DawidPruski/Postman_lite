import { useState } from "react";
import styles from "./ApiSenderPanel.module.css";
import HistoryLog from "./HistoryLog/index";
import InputPanel from "./InputPanel/index";

export default function ApiSenderPanel() {
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [history, setHistory] = useState<any[]>([]);

  const handleAddResult = (resultObj: any) => {
    setHistory((prev) => [...prev, resultObj]);
    history.map((i) => {
      console.log(`${i.status} ${i.statusText} ${i.time} ${i.data}`);
    });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap"
        rel="stylesheet"
      ></link>
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
      <InputPanel
        setHistory={handleAddResult}
        setBackgroundColor={setBackgroundColor}
      />
      <HistoryLog history={history} />
    </>
  );
}
