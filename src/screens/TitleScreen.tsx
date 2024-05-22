import './TitleScreen.scss';
import {useSaveState} from "../appSaveState";
import {txtCatNames, txtPatternDropdown, txtPronoun2, txtPronoun3, txtPronounDropdown} from "../utils/lang";
import {TCatPattern} from "../types/global";
import TitleCatOptions from "../components/title/TitleCatOptions";
import Button from "../components/ui/Button";
import {useProgressState} from "../appProgressState";
import { motion } from "framer-motion";
import {screenAnimTransition} from "../utils/animation";
import {useEffect} from "react";

export default function TitleScreen() {
  const {isReady, screen, setProgress} = useProgressState();
  const {catName, catPronoun, useEyeTracking, useBreathingGuide, useTextGuide, setState} = useSaveState();

  const handleStart = () => {
    setProgress({screen: useEyeTracking ? "camera" : "meditation"});
  }

  useEffect(() => {
    setProgress({isReady: true});
  }, []);

  return (
    <motion.main className={'title-screen'}
                 transition={screenAnimTransition}
                 initial={{ opacity: 0, x: isReady ? "-30%" : "0%"}}
                 animate={{ opacity: 1, x: "0%" }}
                 exit={{ opacity: 0, x: "-30%" }}>
      <h1>{catName}</h1>
      <h2>Needs your attention!</h2>

      <section className={'title-center'}>
        <div>
          <div className="title-menu">
            <p className={'title-text'}>Strengthen your focus by helping <br/> {catName} the cat
              fill {txtPronoun3[catPronoun]}!</p>
            <Button type={"primary"} size={"big"} onClick={handleStart} sub={`With default / last config`}>START</Button>
            <br/>
            <Button type={"secondary"} sub={`experience`} onClick={() => setProgress({screen: "config"})}>CUSTOMIZE</Button>
          </div>
        </div>
        <div>
          <img src={'/sprites/halki-intro.png'} alt={'cat'}/>
          <TitleCatOptions/>
        </div>
      </section>
    </motion.main>
  )
}