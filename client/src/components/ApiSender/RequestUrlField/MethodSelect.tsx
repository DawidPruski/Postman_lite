import { useState } from "react";
import { Select } from "../../ui/select";

interface MethodSelectProps {
  setMethod: (method: string) => void;
}

const MethodSelect = ({ setMethod }: MethodSelectProps) => {
  const [selectedColor, setSelectedColor] = useState("green");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
    setSelectedColor(e.target.options[e.target.selectedIndex].style.color);
  };

  return <Select onChange={handleSelectChange} style={{ color: selectedColor }}></Select>;
};

export default MethodSelect;
