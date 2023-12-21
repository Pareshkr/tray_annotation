//React packages import
import React from "react";
import PropTypes from "prop-types";

// material-ui
import { Tooltip } from "@mui/material";

// react-icons
// import { IconBaseProps as IconType } from "react-icons/lib";

function DynamicButton({
  title,
  icon: IconComponent,
  onClick,
  type,
  toolTip,
  iconSize,
}) {
  // Define color based on the type prop
  let buttonColorClass;
  switch (type) {
    case "disabled":
      buttonColorClass = "bg-slate-300 text-gray-400";
      break;
    case "success":
      buttonColorClass =
        "bg-emerald-500 active:bg-emerald-400 hover:bg-emerald-600 text-white";
      break;
    case "error":
      buttonColorClass =
        "bg-red-500 active:bg-red-400 hover:bg-red-600 text-white";
      break;
    default:
      buttonColorClass =
        "bg-white active:bg-white hover:bg-gray-200 text-gray-600";
  }

  let iconSizeClass;
  switch (iconSize) {
    case "lg":
      iconSizeClass = "text-lg";
      break;
    case "xl":
      iconSizeClass = "text-xl";
      break;
    case "2xl":
      iconSizeClass = "text-2xl";
      break;
    case "3xl":
      iconSizeClass = "text-3xl";
      break;
    default:
      iconSizeClass = "text-base";
  }

  return (
    <Tooltip title={`${toolTip}`}>
      <button
        onClick={onClick}
        className={`flex w-24 py-2 justify-center place-items-center rounded-md shadow-md ${buttonColorClass}`}
      >
        {IconComponent && <IconComponent className={`mr-2 ${iconSizeClass}`} />}
        <span>{title}</span>
      </button>
    </Tooltip>
  );
}

DynamicButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func]),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["disabled", "success", "error"]),
  toolTip: PropTypes.string,
  iconSize: PropTypes.string,
};

export default DynamicButton;
