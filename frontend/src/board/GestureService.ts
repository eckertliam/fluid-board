// handles the loading of the hand gesture model and entry point for the gesture recognition
import {
    GestureRecognizer,
    FilesetResolver,
} from "@mediapipe/tasks-vision";

// initialize the gesture recognizer
// the task file path is public/gesture_recognition.task
export async function createGestureRecognizer(): Promise<GestureRecognizer> {
    // pull the wasm files
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );
    // create the GestureRecognizer
    const gestureRecognizer = await GestureRecognizer.createFromModelPath(vision, "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task");
    await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
    return gestureRecognizer;
}
