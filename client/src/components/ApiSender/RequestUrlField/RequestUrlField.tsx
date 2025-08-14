import { useState } from "react";
import apiHandlers from "../../../services/apiHandlers";
import MethodSelect from "./MethodSelect";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { TextArea } from "../../ui/textarea";

interface RequestUrlFieldProps {
  setHistory: (result: any) => void;
  token: string;
}

const RequestUrlField = ({ setHistory, token }: RequestUrlFieldProps) => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://httpbin.org/get");
  const [bodyContent, setBodyContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendClick = async (method: string, url: string, bodyContent: string) => {
    setIsLoading(true);
    const result = await apiHandlers(method, url, token, bodyContent);
    setHistory(result);
    setIsLoading(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setBodyContent(newValue);
  };

  return (
    <>
      <div className="flex items-center justify-center m-5">
        <MethodSelect setMethod={setMethod} />
        <Input value={url} onChange={(e) => setUrl(e.target.value)} />
        <Button
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
        </Button>
      </div>
      <div className="flex justify-center p-2.5">
        <TextArea value={bodyContent} onChange={handleBodyChange} />
      </div>
    </>
  );
};

export default RequestUrlField;
