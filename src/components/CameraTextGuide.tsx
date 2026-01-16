import {webcamAllowed} from "../utils/browser";
import {useSaveState} from "./state/appSaveState";

interface CameraTextGuideProps {
  isCameraReady: boolean;
}

export default function CameraTextGuide({isCameraReady}: CameraTextGuideProps) {

  const {catName} = useSaveState();

  return (
    <div>
      {!isCameraReady && <div>Let's connect your camera...</div>}
      {isCameraReady ?
        <span className="focusing-speech">{catName}: - You have beautiful eyes, meow!</span>

        :
        webcamAllowed() ?
          <div>Allow access to your camera to continue</div>
          :
          <div>Unfortunately, your browser does not support camera access</div>
      }
    </div>
  )
}