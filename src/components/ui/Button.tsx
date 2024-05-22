import {ReactElement} from "react";
import "./Button.scss";

interface props {
  type: "primary" | "secondary"
  size?: "big" | "normal"
  sub?: string,
  children: string | ReactElement
  onClick?: () => void
}

export default function Button({ type, size = "normal", sub, children, onClick }: props) {


  return (
    <div>
      <button className={`button --${type} --size-${size}`} onClick={onClick}>
        {children}
        {sub && <span>{sub}</span>}
      </button>
    </div>
  )
}