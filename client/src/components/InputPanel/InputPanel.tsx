import { useState } from "react";
import apiHandlers from "../../services/apiHandlers";
import MethodSelect from "./MethodSelect";
import styles from "./InputPanel.module.css";

interface InputPanelProps {
  setResult: (result: string) => void;
  setBackgroundColor: (color: string) => void;
}

const InputPanel = ({ setResult, setBackgroundColor }: InputPanelProps) => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://httpbin.org/get");
  const [bodyContent, setBodyContent] = useState("");

  const handleSendClick = async (
    method: string,
    url: string,
    bodyContent: string
  ) => {
    const result = await apiHandlers(method, url, bodyContent);
    setResult(result);
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
          type="submit"
          onClick={() => {
            handleSendClick(method, url, bodyContent);
          }}
        >
          Send
        </button>
      </div>
      <div
        className="bodyContainer"
        style={{
          margin: 20,
        }}
      >
        <textarea
          className="bodyTextArea"
          value={bodyContent}
          placeholder="Body goes here..."
          onChange={handleBodyChange}
          maxLength={1000}
          minLength={1000}
        />
      </div>
    </>
  );
};

export default InputPanel;
