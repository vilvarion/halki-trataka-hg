import Heart from "./Heart";
import Breathing from "./Breathing";
import {useAnimationFrame} from "framer-motion";
import {useRef, useState} from "react";
import {useSaveState} from "./state/appSaveState";
import {useProgressState} from "./state/appProgressState";
import Button from "./ui/Button";

export default function HeartAndBreath() {
  const timeRef = useRef<number>(0);
  const {length, useBreathingGuide} = useSaveState();
  const [heartStep, setHeartStep] = useState<number>(1);

  const {setProgress} = useProgressState();
  const [pause, setPause] = useState<boolean>(false);


  useAnimationFrame((time, delta) => {
    const elapsedSecond = Math.round(time / 1000);

    const newStep = Math.min(6, Math.floor((elapsedSecond - 5) / length * 6) + 1);

    if(!pause) {
      timeRef.current = elapsedSecond;
    }

    if(elapsedSecond >= length) {
      setProgress({screen: "finish"});

    } else {
      setHeartStep(newStep);
    }
    console.log(elapsedSecond);

  });

  return (
    <>
      <div className="focusing-cancel">
        {timeRef.current} / {length}
        <button onClick={() => setProgress({screen: "title"})}>Cancel</button>
      </div>
      <div className={"focusing-heart"}>
        <Heart step={heartStep}/>
        {useBreathingGuide && <Breathing/>}
      </div>
    </>
  )
}