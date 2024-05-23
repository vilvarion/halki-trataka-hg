import "./BlinkUI.scss";
import {txtCatNames} from "../utils/lang";
import {useSaveState} from "./state/appSaveState";
import {IFaceState} from "../types/global";

export default function BlinkUI({state, mode}: {state: IFaceState, mode?:string}) {
  const {catName} = useSaveState();

  const {faceDetected, leftEyeOpen, rightEyeOpen} = state;

  return (
    <div>
      <div className={`blinkui-headbase ${faceDetected ? '--active' : ''}`}>

        {mode === "nocamera" ?
          <span className={'blinkui-nocamera'}>camera turned off</span>
          : (
            <>
              {!faceDetected && <span className={'blinkui-inactive'}>no face detected</span>}
              {faceDetected && <span className={'blinkui-hint'}>Try blinking!<br/> {catName} will blink too!</span>}
            </>
          )}

        <div className={`blinkui-eye ${leftEyeOpen ? "--left-closed" : "--left-open"}`}/>
        <div className={`blinkui-eye ${rightEyeOpen ? "--right-closed" : "--right-open"}`}/>
      </div>
    </div>
  )
}