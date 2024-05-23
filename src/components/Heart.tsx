import {useSaveState} from "./state/appSaveState";
import "./Heart.scss";

export default function Heart ({step}: {step?: number}) {
  const {heartRate, useCalmMode} = useSaveState();

    return (
      <div className={`heart --step-${step}`} style={{animationDuration: `${useCalmMode ? 0 : heartRate * 20}ms`}}/>
    )
}