"use client";
import React, { useState } from "react";

const Expandtext = ({
  collapsedNumWords = 40,
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
    <div>
      <span className="text-white">{displayText}</span>
      <button className="text-white" onClick={handelsetIsExpanded}>
        {isexpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
};

export default Expandtext;
