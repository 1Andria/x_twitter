import React from "react";

function CryptoIcon() {
  return (
    <>
      <svg
        width="40"
        height="40"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="#121212"
          stroke="white"
          stroke-width="6"
        />
        <text
          x="50%"
          y="50%"
          font-family="Arial, sans-serif"
          font-size="90"
          fill="#f2a900"
          font-weight="bold"
          text-anchor="middle"
          alignment-baseline="middle"
        >
          ₿
        </text>
      </svg>
    </>
  );
}

export default CryptoIcon;
