import React from "react";

import { buttonContainerClass } from "./styles";

interface Props {
  icon: JSX.Element;
  onClick: () => void;
}

const IconButton = (props: Props): React.ReactElement => {
  const { icon, onClick } = props;
  return (
    <button className={buttonContainerClass} type="button" onClick={onClick}>
      {icon}
    </button>
  );
};
export default IconButton;
