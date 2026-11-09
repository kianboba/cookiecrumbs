// Installation for an unpacked Chromium (Manifest V3) extension.
export const installationSteps = [
  {
    title: "Check browser compatibility",
    body: "Use a desktop Chromium-based browser: Google Chrome, Microsoft Edge, or Brave. Mobile browsers are not supported.",
  },
  {
    title: "Download the extension package",
    body: "Get the CookieCrumbs extension package (ZIP) from the Downloads page and extract it to a folder on your computer.",
  },
  {
    title: "Open the extensions page",
    body: "In Chrome/Edge/Brave, go to chrome://extensions (or edge://extensions) and enable 'Developer mode' in the top-right corner.",
  },
  {
    title: "Load the unpacked extension",
    body: "Click 'Load unpacked', then select the extracted CookieCrumbs folder. The extension icon should appear in your toolbar.",
  },
  {
    title: "Pin and open CookieCrumbs",
    body: "Pin the CookieCrumbs icon to your toolbar, then visit any website and click the icon to open the side panel.",
  },
];

export const troubleshooting = [
  {
    problem: "'Load unpacked' is greyed out",
    solution: "Enable 'Developer mode' at the top of the extensions page, then try again.",
  },
  {
    problem: "Extension fails to load with a manifest error",
    solution:
      "Make sure you selected the folder containing manifest.json (not a parent folder). Re-extract the ZIP if needed.",
  },
  {
    problem: "No data appears on a website",
    solution:
      "Refresh the page after installing. Some sites load cookies only after interaction; click around and reopen the panel.",
  },
  {
    problem: "Browser says the extension is unsupported",
    solution:
      "Confirm you are on a desktop Chromium browser (Chrome, Edge, or Brave). Firefox and Safari are not supported.",
  },
];
