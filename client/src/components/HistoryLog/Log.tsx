import { useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import styles from "./Log.module.css";

interface LogProps {
  status: string;
  urlAndMethod: string;
  requestHeaders: string;
  requestBody: string;
  responseHeaders: string;
  responseBody: string;
}

const Log = ({
  status,
  urlAndMethod,
  requestHeaders,
  requestBody,
  responseHeaders,
  responseBody,
}: LogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.collapsible}>
      <button className={styles.collapsibleButton} onClick={toggleCollapsible}>
        {urlAndMethod}
        <span className={styles.status}>
          {status}
          <span>{isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</span>
        </span>
      </button>
      {isOpen && (
        <div className={styles.collapsibleContent}>
          <div>{`Request Headers: ${requestHeaders}`}</div>
          <div>
            Request Body:
            <pre className={styles.collapsibleContentBody}>{requestBody}</pre>
          </div>
          <div>{`Response Headers: ${responseHeaders}`}</div>
          <div>
            Response Body:
            <pre className={styles.collapsibleContentBody}>{responseBody}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Log;
