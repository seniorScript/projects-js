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

export const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert(text);
  } catch (err) {
    alert("Failed to copy: ", err);
  }
};

export const getPosition = (img) => {
  const rect = img.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
};
