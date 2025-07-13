import { createRoot } from "react-dom/client";
import "./style.css";
import { getButtonContainerSelector, isSupportedWebsite } from "./config";

// check is supported website
if (isSupportedWebsite()) {
  console.log("Supported website detected, injecting content script...");

  const selector = getButtonContainerSelector();
  if (!selector) throw new Error("Can't find button container selector");

  const buttonContainer = document.querySelector(selector);
  if (!buttonContainer) throw new Error("Can't find button container element");

  const div = document.createElement("div");
  div.id = "__root";
  buttonContainer.appendChild(div);

  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Content root element");

  // Prevent multiple injection
  if (document.getElementById("track-product-btn")) {
    console.log("Content script already injected.");
  }

  const root = createRoot(rootContainer);
  root.render(
    <div className="flex align-center p-4">
      <button
        id="track-product-btn"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Track Product
      </button>
    </div>
  );
} else {
  console.log("Unsupported website, content script will not run.");
}

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
