import {useSaveState} from "../appSaveState";
import "./Heart.scss";

export default function Heart () {
  const {heartRate} = useSaveState();

    return (
      <div className="heartbeat" style={{animationDuration: `${heartRate * 20}ms`}}/>
    )
}