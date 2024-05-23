import Heart from "./Heart";
import Breathing from "./Breathing";
import {useAnimationFrame} from "framer-motion";
import {useRef, useState} from "react";
import {useSaveState} from "./state/appSaveState";

export default function HeartAndBreath() {
  const timeRef = useRef<number>(0);
  const {length, useBreathingGuide} = useSaveState();
  const [heartStep, setHeartStep] = useState<number>(1);

  const [pause, setPause] = useState<boolean>(false);


  useAnimationFrame((time, delta) => {
    const elapsedSecond = Math.round(time / 1000);

    const newStep = Math.min(6, Math.floor((elapsedSecond - 5) / length * 6) + 1);

    if(!pause) {
      timeRef.current = elapsedSecond;
    }

    if(elapsedSecond >= length) {
      // finish!
    } else {
      setHeartStep(newStep);
    }
    console.log(elapsedSecond);

  });

  return (
    <div className={"focusing-heart"}>
      <Heart step={heartStep}/>
      {useBreathingGuide && <Breathing />}
    </div>
  )
}