import { useState } from "react";
import apiHandlers from "../../services/apiHandlers";
import MethodSelect from "./MethodSelect";
import styles from "./InputPanel.module.css";

interface InputPanelProps {
  setHistory: (result: any) => void;
}

const InputPanel = ({ setHistory }: InputPanelProps) => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://httpbin.org/get");
  const [bodyContent, setBodyContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendClick = async (
    method: string,
    url: string,
    bodyContent: string
  ) => {
    setIsLoading(true);
    const result = await apiHandlers(method, url, bodyContent);
    setHistory(result);
    setIsLoading(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setBodyContent(newValue);
  };

  return (
    <>
      <div className={styles.sendPanel}>
        <MethodSelect setMethod={setMethod} />
        <input
          className={styles.inputUrl}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className={styles.sendButton}
          style={{
            color: isLoading ? "grey" : "white",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
          type="submit"
          disabled={isLoading}
          onClick={() => {
            handleSendClick(method, url, bodyContent);
          }}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
      <div className={styles.bodyContainer}>
        <textarea
          className={styles.bodyTextArea}
          value={bodyContent}
          placeholder="Body goes here..."
          onChange={handleBodyChange}
        />
      </div>
    </>
  );
};

export default InputPanel;
