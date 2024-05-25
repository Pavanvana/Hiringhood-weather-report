import React from "react";
import cn from "classnames";
import { getButtonStyles } from "./styles";
import "./index.css";

interface Props {
  buttonText: string;
  onClick?: () => void;
  size: string;
  className?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  status?: boolean;
}

const Button = (props: Props): React.ReactElement => {
  const {
    buttonText,
    onClick,
    className,
    disabled,
    size,
    type = "button",
    status,
  } = props;

  const loader = () => <div className="spinner" />;

  const renderButtonText = () => {
    if (status) {
      return loader();
    }
    return buttonText;
  };

  return (
    <button
      onClick={onClick}
      className={cn(getButtonStyles(size), className)}
      disabled={disabled}
      type={type}
    >
      {renderButtonText()}
    </button>
  );
};
export default Button;
