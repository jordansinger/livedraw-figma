import * as React from "react";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";

const fal_key_id = "REPLACE_ME"
const fal_key_secret = "REPLACE_ME"

function debounce(func: any, timeout = 1000) {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

const initalState = {};

interface UseWebSocketOptions {
  onOpen?: () => void;
  onClose?: () => void;
  onMessage?: (message: MessageEvent) => void;
  onError?: (error: Event) => void;
}

const useWebSocket = (url: string, options: UseWebSocketOptions = {}) => {
  const webSocketRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    webSocketRef.current = new WebSocket(url);
    webSocketRef.current.onopen = () => {
      options.onOpen?.();
    };

    webSocketRef.current.onclose = () => {
      options.onClose?.();
    };

    webSocketRef.current.onerror = (error: Event) => {
      options.onError?.(error);
    };

    webSocketRef.current.onmessage = (message: MessageEvent) => {
      options.onMessage?.(message);
    };
  }, []);

  const disconnect = useCallback(() => {
    webSocketRef.current?.close();
  }, []);

  const isReconnecting = useRef(false);

  const sendMessage = useCallback(async (message: string) => {
    if (
      !isReconnecting.current &&
      webSocketRef.current?.readyState !== WebSocket.OPEN
    ) {
      isReconnecting.current = true;
      connect();
    }

    if (
      isReconnecting.current &&
      webSocketRef.current?.readyState !== WebSocket.OPEN
    ) {
      await new Promise<void>((resolve) => {
        const checkConnection = setInterval(() => {
          if (webSocketRef.current?.readyState === WebSocket.OPEN) {
            clearInterval(checkConnection);
            resolve();
          }
        }, 100);
      });
      isReconnecting.current = false;
    }
    webSocketRef.current?.send(message);
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  return {
    sendMessage,
    connect,
    disconnect,
  };
};

function randomSeed(): number {
  const multipliers = [2342534, 1235392, 875441, 102321];
  const multiplier =
    multipliers[Math.floor(Math.random() * multipliers.length)];
  return Math.floor(Math.random() * multiplier);
}

const DEBOUNCE_TIME = 16;

const URL = `wss://110602490-lcm-sd15-i2i.gateway.alpha.fal.ai/ws?fal_key_id=${fal_key_id}&fal_key_secret=${fal_key_secret}`;

declare function require(path: string): any;

function App() {
  const [image, setImage] = useState<null>(null);

  const [prompt, setPrompt] = useState<string>("");
  const [inferenceTime, setInferenceTime] = useState<number>(NaN);
  const [strength, setStrength] = useState<number>(0.8);
  const [seed, setSeed] = useState<string>(randomSeed().toFixed(0));
  const [imageData, setImageData] = useState<string | null>(null);

  window.addEventListener("message", (event) => {
    const { type, drawing, prompt } = event.data.pluginMessage;

    if (type === "drawingUpdated") {
      setPrompt(prompt);
      setImageData(drawing);
      updateImage();
    }
  });

  const { sendMessage } = useWebSocket(URL, {
    onMessage: (message) => {
      try {
        const data = JSON.parse(message.data);
        if (data.images && data.images.length > 0 && data.images[0].url) {
          let imageURL = data.images[0].url;
          setImage(imageURL);
          setInferenceTime(data.timings?.inference || NaN);

          parent.postMessage(
            {
              pluginMessage: {
                type: "renderImage",
                image: imageURL,
              },
            },
            "*"
          );
        }
      } catch (e) {
        console.error("Error parsing the WebSocket response:", e);
      }
    },
  });

  const sendCurrentData = useMemo(() => {
    return debounce(sendMessage, DEBOUNCE_TIME);
  }, []);

  const updateImage = useCallback(() => {
    const req = {
      prompt,
      seed: Number(seed) || randomSeed(),
      image_url: imageData,
      sync_mode: true,
      strength,
    };

    sendCurrentData(JSON.stringify(req));
  }, [prompt, imageData, seed, strength, sendCurrentData]);

  useEffect(() => {
    updateImage();
  }, [updateImage]);

  return <></>;
}

ReactDOM.createRoot(document.getElementById("react-page")).render(<App />);
