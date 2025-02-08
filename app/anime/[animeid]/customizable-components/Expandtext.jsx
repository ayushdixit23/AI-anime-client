"use client";
import React, { useState } from "react";

const Expandtext = ({
  collapsedNumWords = 80,
  expandButtonText = "show more",
  collapseButtonText = "show less",
  expanded = false,
  children,
}) => {
  const [isexpanded, setIsExpanded] = useState(expanded);

  const displayText = isexpanded
    ? children
    : children.split(" ").splice(0, collapsedNumWords).join(" ") + "...";

  function handelsetIsExpanded() {
    setIsExpanded((curr) => !curr);
  }

  return (
    <div className="w-4/5">
      <span className="text-white">{displayText}</span>
      <button className="text-white" onClick={handelsetIsExpanded}>
        {isexpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
};

export default Expandtext;
