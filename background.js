
const now = new Date(); // Get the current time

chrome.contextMenus.create({
  id: `contextMenuLookup_${now}`,
  title: "LOOKUP",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "contextMenuLookup") {
    const selectedText = info.selectionText;
    console.log("Selected text:", selectedText);
    // Do something with the selected text, like open a new tab or display a popup
    chrome.tabs.create({url: "https://en.wikipedia.org/wiki/LeBron_James"});
  }
});