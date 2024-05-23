import './TitleScreen.scss';
import {useSaveState} from "../components/state/appSaveState";
import {txtCatNames, txtPatternDropdown, txtPronoun2, txtPronoun3, txtPronounDropdown} from "../utils/lang";
import {TCatPattern} from "../types/global";
import TitleCatOptions from "../components/title/TitleCatOptions";
import Button from "../components/ui/Button";
import {useProgressState} from "../components/state/appProgressState";
import { motion } from "framer-motion";
import {screenAnimTransition, screenReducedTransiton} from "../utils/animation";
import {useEffect} from "react";

export default function TitleScreen() {
  const {isReady, screen, setProgress} = useProgressState();
  const {catName, catPronoun, useEyeTracking, useCalmMode, useBreathingGuide, useTextGuide, setState} = useSaveState();

  useEffect(() => {
    setProgress({isReady: true});
  }, []);

  return (
    <motion.main className={'title-screen'}
                 transition={useCalmMode ? screenReducedTransiton : screenAnimTransition}
                 initial={{ opacity: 0, x: isReady ? "-30%" : "0%"}}
                 animate={{ opacity: 1, x: "0%" }}
                 exit={{ opacity: 0, x: "-30%" }}>
      <h1>{catName}</h1>
      <h2>Needs your attention!</h2>

      <section className={'title-center'}>
        <div>
          <div className="title-menu">
            <p className={'title-text'}>Fixed point gazing meditation<br/>for beginners.</p>

            <p className={'title-text'}>Strengthen your focus by helping <br/> {catName} the cat
              fill {txtPronoun3[catPronoun]}!</p>
            <Button type={"primary"} size={"big"} onClick={() => setProgress({screen: "focusing"})}
                    sub={`With default / last config`}>START</Button>
            <br/>
            <Button type={"secondary"} sub={`experience`}
                    onClick={() => setProgress({screen: "config"})}>CUSTOMIZE</Button>
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