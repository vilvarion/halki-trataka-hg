import {ReactElement} from "react";

interface props {
  type: "primary" | "secondary"
  size?: "big" | "normal"
  sub?: string,
  children: string | ReactElement
}

export default function Button({ type, size = "normal", sub, children }: props) {




  return (
    <div>
      <button>{children}</button>
    </div>
  )
}