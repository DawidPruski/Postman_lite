import { useState } from "react";
import styles from "./MethodSelect.module.css";

interface MethodSelectProps {
  setMethod: (method: string) => void;
}

const MethodSelect = ({ setMethod }: MethodSelectProps) => {
  const [selectedColor, setSelectedColor] = useState("green");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
    setSelectedColor(e.target.options[e.target.selectedIndex].style.color);
  };

  return (
    <select
      className={styles.methodSelect}
      id="methodSelect"
      defaultValue="GET"
      onChange={handleSelectChange}
      style={{ color: selectedColor }}
    >
      <option value="GET" style={{ color: "green" }}>
        GET
      </option>
      <option value="POST" style={{ color: "yellow" }}>
        POST
      </option>
      <option value="PUT" style={{ color: "cyan" }}>
        PUT
      </option>
      <option value="PATCH" style={{ color: "white" }}>
        PATCH
      </option>
      <option value="DELETE" style={{ color: "red" }}>
        DELETE
      </option>
    </select>
  );
};

export default MethodSelect;
