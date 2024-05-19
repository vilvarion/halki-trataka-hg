import './TitleScreen.scss';
import {useAppState} from "../appState";
import {txtCatNames, txtPatternDropdown, txtPronoun2, txtPronoun3, txtPronounDropdown} from "../utils/lang";
import {TCatPattern} from "../types/global";
import TitleCatOptions from "../components/title/TitleCatOptions";
import Button from "../components/ui/Button";

export default function TitleScreen() {

  const {catName, catPronoun, setState} = useAppState();


  return (
    <div className={'title-screen'}>
      <h1>{catName}</h1>
      <h2>Needs your attention!</h2>
      <p>Strengthen your focus by helping {catName} the cat fill {txtPronoun3[catPronoun]}!</p>


      <TitleCatOptions/>


      <div className="title-menu">
        <Button type={"primary"} size={"big"} sub={`With default / last config`}>CONTINUE</Button>
        <Button type={"secondary"}>CUSTOMIZE</Button>
      </div>
    </div>
  )
}