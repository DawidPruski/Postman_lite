import { useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import styles from "./Log.module.css";

const Log = ({ title, status, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.collapsible}>
      <button className={styles.collapsibleButton} onClick={toggleCollapsible}>
        {title}
        <span className={styles.status}>
          {status}
          <span>{isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</span>
        </span>
      </button>
      {isOpen && <div className={styles.collapsibleContent}>coś tu jest?</div>}
    </div>
  );
};

export default Log;
