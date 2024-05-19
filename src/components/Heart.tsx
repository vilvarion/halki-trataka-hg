import {useAppState} from "../appState";
import "./Heart.scss";

export default function Heart () {
  const {heartRate} = useAppState();

    return (
      <div className="heartbeat" style={{animationDuration: `${heartRate * 20}ms`}}/>
    )
}