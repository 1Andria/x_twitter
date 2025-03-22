import React from "react";
type ParamsType = {
  params: {
    id: string;
  };
};

function xpage({ params }: ParamsType) {
  const some = params.id;
  return <div>page {some}</div>;
}

export default xpage;
