import {useConfig} from "../state";
import "./Heart.scss";

export default function Heart () {
  const {heartRate} = useConfig();

    return (
      <div className="heartbeat" style={{animationDuration: `${heartRate * 20}ms`}}/>
    )
}