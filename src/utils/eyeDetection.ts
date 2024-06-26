import {Category, Classifications} from "@mediapipe/tasks-vision";


export default function detectBlink (faceBlendshapes: Classifications) {
  const {categories} = faceBlendshapes;
  const detectionThreshold = 0.4;
  const targetShapes = ['eyeBlinkLeft', 'eyeBlinkRight'];

  const targetCategories = categories.filter((category: Category) => targetShapes.includes(category.categoryName));
  const leftScore = targetCategories.find((category: Category) => category.categoryName === targetShapes[0])!.score;
  const rightScore = targetCategories.find((category: Category) => category.categoryName === targetShapes[1])!.score;

  const leftBlink = leftScore > detectionThreshold;
  const rightBlink = rightScore > detectionThreshold;

  return {
    blink: leftBlink || rightBlink,
    leftBlink, rightBlink
  }
}