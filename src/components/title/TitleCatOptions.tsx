import {txtCatNames, txtPatternDropdown, txtPronounDropdown} from "../../utils/lang";
import {TCatPattern} from "../../types/global";
import {useAppState} from "../../appState";
import './TitleCatOptions.scss';

export default function TitleCatOptions() {
  const {catName, catPronoun, setState} = useAppState();

  return (
    <div className="title-cat-options">
      <div>
        Name:
        <select onChange={(e) => setState({catName: e.target.value})} value={catName}>
          {txtCatNames.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>
      <div>
        Pronoun:
        <select onChange={(e) => setState({catPronoun: +e.target.value})} value={catPronoun}>
          {txtPronounDropdown.map((name, i) => <option key={name} value={i}>{name}</option>)}
        </select>
      </div>
      <div>
        Pattern:
        <select onChange={(e) => setState({catPattern: e.target.value as TCatPattern})} value={catPronoun}>
          {txtPatternDropdown.map((name, i) => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>
    </div>
  )
}