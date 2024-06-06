import Heart from "./Heart";
import Breathing from "./Breathing";
import {useAnimationFrame} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import {useSaveState} from "./state/appSaveState";
import {useProgressState} from "./state/appProgressState";

export default function HeartAndBreath({paused, safePeriodOver}: { paused: boolean, safePeriodOver: () => void}) {
  const [seconds, setSeconds] = useState<number>(0);
  const {length, useBreathingGuide} = useSaveState();
  const [heartStep, setHeartStep] = useState<number>(1);
  const timeRef = useRef<number>(0);

  const {setProgress} = useProgressState();

  useAnimationFrame((time, delta) => {

    if(!paused) {
      timeRef.current += delta;
      const elapsedSecond = Math.round(timeRef.current / 1000);
      const newStep = Math.min(6, Math.floor((elapsedSecond - 5) / length * 6) + 1);

      setSeconds(elapsedSecond);
      setHeartStep(newStep);
    }
  });

  useEffect(() => {
    if (seconds >= length) {
      setProgress({screen: "finish"});
    }
    if(seconds >= 5) {
      safePeriodOver();
    }
  }, [seconds]);

  return (
    <>
      <div className="focusing-cancel">
        {seconds} / {length}
        <button onClick={() => setProgress({screen: "title"})}>Cancel</button>
      </div>
      <div className={"focusing-heart"}>
        <Heart step={heartStep}/>
        {useBreathingGuide && <Breathing/>}
      </div>
    </>
  )
}