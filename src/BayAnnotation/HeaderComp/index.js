import React, { useState } from "react";
import PropTypes from "prop-types";

// material-ui

// project imports
import DynamicButton from "../components/DynamicButton.js";

// react-icons
import { GrUndo } from "react-icons/gr";

function HeaderComp({
  bayNumber,
  brandName,
  onUndo,
  onSave,
  onClose,
  disable,
}) {
  return (
    <div className="w-full flex flex-row bg-stone-300 border-b border-gray-400 py-2.5 justify-between px-3">
      <div className="flex flex-col sm:flex-row space-y-1 space-x-0 sm:space-y-0 sm:space-x-4">
        <span id="rubikFont" className="text-xl self-start sm:self-center">
          Bay {bayNumber} / {brandName}
        </span>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-2">
        <DynamicButton
          title="UNDO"
          icon={GrUndo}
          type={disable ? "disabled" : null}
          onClick={onUndo}
          toolTip={disable ? "No trays available" : "Undo last tray"}
        />
        <DynamicButton
          title="SAVE"
          type="success"
          onClick={onSave}
          toolTip="Save Changes"
        />
        <DynamicButton
          title="CLOSE"
          type="error"
          onClick={onClose}
          toolTip="Close"
        />
      </div>
    </div>
  );
}

HeaderComp.propTypes = {
  bayNumber: PropTypes.number,
  brandName: PropTypes.string,
  onUndo: PropTypes.func,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  disable: PropTypes.bool,
};

export default HeaderComp;
