import * as fal from "@fal-ai/serverless-client";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";

const fal_key_id = "REPLACE_ME";
const fal_key_secret = "REPLACE_ME";

fal.config({
  credentials: `${fal_key_id}:${fal_key_secret}`,
});

function randomSeed(): number {
  const multipliers = [2342534, 1235392, 875441, 102321];
  const multiplier =
    multipliers[Math.floor(Math.random() * multipliers.length)];
  return Math.floor(Math.random() * multiplier);
}

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [seed, setSeed] = useState<string>(randomSeed().toFixed(0));

  window.addEventListener("message", (event) => {
    const { type, prompt } = event.data.pluginMessage;

    if (type === "drawingUpdated") {
      console.log("drawingUpdated", prompt);
      setPrompt(prompt);
      updateImage();
    }
  });

  const { send } = fal.realtime.connect("fal-ai/fast-lightning-sdxl", {
    connectionKey: "lightning-sdxl",
    throttleInterval: 64,
    onResult(data) {
      console.log("send", data);
      try {
        if (data.images && data.images.length > 0 && data.images[0].content) {
          parent.postMessage(
            {
              pluginMessage: {
                type: "renderImage",
                image: data.images[0].content,
              },
            },
            "*"
          );
        }
      } catch (e) {
        console.error("Error parsing the realtime response:", e);
      }
    },
    onError(error) {
      console.error("Error from the realtime connection:", error);
    },
  });
  const INPUT_DEFAULTS = {
    _force_msgpack: new Uint8Array([]),
    enable_safety_checker: true,
    image_size: "square_hd",
    sync_mode: true,
    num_images: 1,
    num_inference_steps: "2",
  };

  const updateImage = useCallback(() => {
    const req = {
      ...INPUT_DEFAULTS,
      prompt,
      num_inference_steps: "4",
      seed: Number(seed) || randomSeed(),
    };

    send(req);
  }, [prompt, seed]);

  useEffect(() => {
    updateImage();
  }, [updateImage]);

  return <></>;
}

ReactDOM.createRoot(document.getElementById("react-page")).render(<App />);
