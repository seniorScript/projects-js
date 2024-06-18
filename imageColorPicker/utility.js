import { domElements } from "./DomElements.js";

export const removeActiveClass = () => {
  domElements.tools.forEach((tool) => {
    tool.classList.remove("selected");
  });
};

export const showTools = () => {
  domElements.toolSection.style.display = "flex";
};

export const showElement = (element, show) => {
  element.style.display = show ? "block" : "none";
};

export const rgbToHex = (r, g, b) =>
  `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
