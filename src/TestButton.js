import { React, useState } from "react";

const TestButton = ({ onToggle }) => {
  const [toggleValue, setToggleValue] = useState(false);

  const handleToggle = () => {
    const newValue = !toggleValue;
    setToggleValue(newValue);
    // Call the onToggle function provided by the parent to update its value
    onToggle(newValue);
  };
  return (
    <button
      onClick={handleToggle}
      className="w-28 h-12 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 rounded-md shadow-lg font-semibold text-white"
    >
      Change
    </button>
  );
};

export default TestButton;
