import React from "react";
import { IconProps } from "../Types/Common";
import { useThemeColors } from "../hooks/Store";

function FavoritedIcon({ username, path }: IconProps) {
  const contentColor = useThemeColors((state) => state.contentColor);

  return (
    <>
      {contentColor != "white" && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill={` ${path === `/bookmarks/${username}` ? "white" : "black"}`}
          stroke={` ${contentColor === "white" ? "black" : "white"}`}
          strokeWidth={`${path === `/bookmarks/${username}` ? "3" : "2"}`}
        >
          <g>
            <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"></path>
          </g>
        </svg>
      )}
      {contentColor === "white" && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill={` ${path === `/bookmarks/${username}` ? "black" : "white"}`}
          stroke={` ${contentColor === "white" ? "black" : "white"}`}
          strokeWidth={`${path === `/bookmarks/${username}` ? "3" : "2"}`}
        >
          <g>
            <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"></path>
          </g>
        </svg>
      )}
    </>
  );
}

export default FavoritedIcon;
