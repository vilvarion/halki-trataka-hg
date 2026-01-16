import {ReactElement} from "react";
import "./Button.scss";

interface ButtonProps {
  type: "primary" | "secondary";
  size?: "big" | "normal";
  sub?: string;
  children: string | ReactElement;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ type, size = "normal", sub, children, onClick, disabled }: ButtonProps) {


  return (
    <div>
      <button className={`button --${type} --size-${size}`} onClick={onClick} disabled={disabled}>
        {children}
        {sub && <span>{sub}</span>}
      </button>
    </div>
  )
}