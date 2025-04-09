"use client";
import React from "react";
import { useElementColor } from "../hooks/Store";

function CryptoIcon() {
  const elementColor = useElementColor((state) => state.elementColor);

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
          fill="transparent"
          stroke={`${elementColor}`}
          stroke-width="6"
        />
        <text
          x="50%"
          y="50%"
          font-family="Arial, sans-serif"
          font-size="90"
          fill={`${elementColor}`}
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
