import './FocusingScreen.scss';
import {useSaveState} from "../components/state/appSaveState";
import Button from "../components/ui/Button";
import {useProgressState} from "../components/state/appProgressState";
import {motion} from "framer-motion";
import {screenAnimTransition, screenReducedTransiton} from "../utils/animation";
import {useEffect, useState} from "react";
import BlinkDetector from "../components/BlinkDetector";
import BlinkUI from "../components/BlinkUI";
import Heart from "../components/Heart";
import CameraTextGuide from "../components/CameraTextGuide";
import {IFaceState} from "../types/global";
import HeartAndBreath from "../components/HeartAndBreath";
import FailedPopup from "../components/FailedPopup";

export default function FocusingScreen() {
  const {screen, setProgress} = useProgressState();
  const {useEyeTracking, length, useBreathingGuide, useTextGuide, useCalmMode, setState} = useSaveState();

  const [isCameraReady, setCameraReady] = useState<boolean>(!useEyeTracking);
  const [isStarted, setStarted] = useState<boolean>(false);
  const {catName} = useSaveState();

  const [faceState, setFaceState] = useState<IFaceState>({faceDetected: false, leftEyeOpen: false, rightEyeOpen: false});

  const [failed, setFailed] = useState<boolean>(false);
  const [safePeriod, setSafePeriod] = useState<boolean>(true);

  useEffect(() => {
    if(safePeriod) return;
    if(useEyeTracking && (!faceState.faceDetected || faceState.leftEyeOpen || faceState.rightEyeOpen)) {
      setFailed(true);
    }
  }, [faceState]);

  const handleRetry = () => {
    setStarted(false);
    setFailed(false);
    setSafePeriod(true);
  }

  return (
    <motion.main className={'focusing-screen'}
                 transition={useCalmMode ? screenReducedTransiton : screenAnimTransition}
                 initial={{opacity: 0, scale: 1.2}}
                 animate={{opacity: 1, scale: 1}}
                 exit={{opacity: 0, scale: 1.2}}>

      {useEyeTracking && <BlinkDetector onReady={() => setCameraReady(true)} onStateChange={setFaceState}/>}

      {!isStarted && (
        <>
          {useEyeTracking ?
            <BlinkUI state={faceState} />
            :
            <BlinkUI mode={"nocamera"} state={{faceDetected: true, leftEyeOpen: false, rightEyeOpen: false}}/>
          }
        </>
      )}

      {isStarted ?
        <>
          <HeartAndBreath paused={failed} safePeriodOver={() => setSafePeriod(false)}/>

          {failed && <FailedPopup onRetry={handleRetry} onContinue={() => setFailed(false)}/>}
        </>
        :
        <section className={'focusing-preparation'}>
      {useEyeTracking && <CameraTextGuide isCameraReady={isCameraReady}/>}

          <div className="focusing-goals">
            <div className={'__title'}>Quick guide!</div>
            <div className={'__goal'}>1. Look at the heart <Heart step={1}/> in the center of the screen</div>
            <div className={'__goal'}>2. <b>Don't blink!</b> You can slightly move while breathing</div>
            <div className={'__goal'}>3. <b>Synchronize your breathing</b> with the ring around the heart</div>
            <div className={'__goal'}>
              4. <i>Make {catName} happy</i> by filling the <Heart step={6}/> (will take {length} seconds)
            </div>
          </div>

          <nav className="focusing-nav">
            <Button type={"secondary"} onClick={() => setProgress({screen: "title"})}>BACK</Button>
            <Button type={"primary"} disabled={!isCameraReady} onClick={() => setStarted(true)}>START</Button>
          </nav>

        </section>}

    </motion.main>
  )
}