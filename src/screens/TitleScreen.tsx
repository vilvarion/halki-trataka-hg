import {useEffect} from "react";
import {motion} from "framer-motion";

import {useProgressState} from "../components/state/appProgressState";
import {useSaveState} from "../components/state/appSaveState";
import {screenAnimTransition, screenReducedTransition} from "../utils/animation";
import {txtPronoun3} from "../utils/lang";
import Button from "../components/ui/Button";
import TitleCatOptions from "../components/title/TitleCatOptions";
import './TitleScreen.scss';

export default function TitleScreen() {
  const {isReady, setProgress} = useProgressState();
  const {catName, catPronoun, useCalmMode} = useSaveState();

  useEffect(() => {
    setProgress({isReady: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.main className={'title-screen'}
                 transition={useCalmMode ? screenReducedTransition : screenAnimTransition}
                 initial={{ opacity: 0, x: isReady ? "-30%" : "0%"}}
                 animate={{ opacity: 1, x: "0%" }}
                 exit={{ opacity: 0, x: "-30%" }}>
      <h1>{catName}</h1>
      <h2>Needs your attention!</h2>

      <section className={'title-center'}>
        <div className="title-menu">
          <p className={'title-text'}>Fixed point gazing meditation<br/>for beginners.</p>
          <p className={'title-text'}>Strengthen your focus by helping <br/> {catName} the cat
            fill {txtPronoun3[catPronoun]}!</p>

          <div className={'title-buttons'}>
            <Button type={"primary"} size={"big"} onClick={() => setProgress({screen: "focusing"})}
                    sub={`With default / last config`}>START</Button>
            <Button type={"secondary"} sub={`your experience`}
                    onClick={() => setProgress({screen: "config"})}>CUSTOMIZE</Button>
          </div>
        </div>
        <div>
          <img src={'/sprites/halki-intro.png'} className={`title-halki`} alt={'cat'}/>
          <TitleCatOptions/>
        </div>
      </section>
    </motion.main>
  )
}