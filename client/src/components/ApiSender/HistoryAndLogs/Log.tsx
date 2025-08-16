import { useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
// import styles from "./Log.module.css";

interface LogProps {
  status: string;
  urlAndMethod: string;
  requestHeaders: string;
  requestBody: string;
  responseHeaders: string;
  responseBody: string;
}

const Log = ({ status, urlAndMethod, requestHeaders, requestBody, responseHeaders, responseBody }: LogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mx-2.5 my-2.5 max-w-[calc(100%-20px)]">
      <button
        className="
          flex
          w-full
          p-2.5
          text-[white] text-left
          bg-[rgb(44,44,44)]
          border rounded-tl-2xl border-solid border-transparent
          cursor-pointer transition-all
          justify-between items-center duration-[0.25s] ease-[ease] hover:border-[aqua] active:border-transparent
        "
        onClick={toggleCollapsible}
      >
        {urlAndMethod}
        <span className="flex items-center gap-2 ml-auto">
          {status}
          <span>{isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</span>
        </span>
      </button>
      {isOpen && (
        <div className="bg-[rgba(128,128,128,0.5)] border p-2.5 rounded-[0_0_8px_8px] border-transparent">
          <div>{`Request Headers: ${requestHeaders}`}</div>
          <div>
            Request Body:
            <pre className="whitespace-pre-wrap bg-[rgba(255,255,255,0.048)] ml-12.5 border-[black]">{requestBody}</pre>
          </div>
          <div>{`Response Headers: ${responseHeaders}`}</div>
          <div>
            Response Body:
            <pre className="whitespace-pre-wrap bg-[rgba(255,255,255,0.048)] ml-12.5 border-[black] text-xs">
              {responseBody}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Log;
