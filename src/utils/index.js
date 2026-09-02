export const getItemFromStore = (key, store = localStorage) =>
  JSON.parse(store.getItem(key));

export const setItemToStore = (key, payload, store = localStorage) =>
  store.setItem(key, JSON.stringify(payload));

export const removeItemFromStore = (key, store = localStorage) => {
  return store.removeItem(key);
};


// utils/getDaysLeft.js
export const getDaysLeft = (trialEndDate) => {
  if (!trialEndDate) return 0;

  const end = new Date(trialEndDate).getTime();
  const now = Date.now();

  const diff = end - now;

  if (diff <= 0) return 0;

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};


export const getTextColor = (hex) => {
  if (!hex) return "#fff";

  // Remove #
  const cleanHex = hex.replace("#", "");

  // Convert to RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Calculate brightness (YIQ formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black for light bg, white for dark bg
  return brightness > 150 ? "#000" : "#fff";
};


// Returns either 'black' or 'white' based on background color contrast
export const getContrastColor = (hexColor) => {
  if (!hexColor) return "black";

  // Remove '#' if present
  const color = hexColor.replace("#", "");

  // Convert to RGB
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Calculate luminance (per ITU-R BT.709 formula)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return luminance > 0.5 ? "black" : "white";
}

