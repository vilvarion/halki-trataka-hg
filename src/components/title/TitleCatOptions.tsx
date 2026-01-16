import {txtCatNames, txtPronounDropdown} from "../../utils/lang";
import {useSaveState} from "../state/appSaveState";
import './TitleCatOptions.scss';

export default function TitleCatOptions() {
  const {catName, catPronoun, setState} = useSaveState();

  return (
    <div className="title-cat-options">
      <div className={'__row'}>
        <label>name</label>
        <select onChange={(e) => setState({catName: e.target.value})} value={catName}>
          {txtCatNames.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>
      <div className={'__row'}>
        <label>pronoun</label>
        <select onChange={(e) => setState({catPronoun: +e.target.value})} value={catPronoun}>
          {txtPronounDropdown.map((name, i) => <option key={name} value={i}>{name}</option>)}
        </select>
      </div>
    </div>
  )
}