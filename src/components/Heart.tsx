import {useSaveState} from "./state/appSaveState";
import "./Heart.scss";

interface HeartProps {
  step?: number;
}

export default function Heart({step}: HeartProps) {
  const {heartRate, useCalmMode} = useSaveState();

    return (
      <div className={`heart --step-${step}`} style={{animationDuration: `${useCalmMode ? 0 : heartRate * 20}ms`}}/>
    )
}