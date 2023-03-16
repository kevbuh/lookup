// document.getElementById("save-btn").onclick = async () => {
//     const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
//     let result;
//     try {
//       [{result}] = await chrome.scripting.executeScript({
//         target: {tabId: tab.id},
//         function: () => getSelection().toString(),
//       });
//     } catch (e) {
//       return; // ignoring an unsupported page like chrome://extensions
//     }
//     document.body.append('Selection: ' + result);
//     console.log('Selection: ' + result);

// };

// document.addEventListener("mouseup", async () => {
//   const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
//   let result;
//   try {
//     [{result}] = await chrome.scripting.executeScript({
//       target: {tabId: tab.id},
//       function: () => getSelection().toString(),
//     });
//   } catch (e) {
//     return; // ignoring an unsupported page like chrome://extensions
//   }
//   document.body.append('HIGHLIGHTED: ' + result);
//   console.log('HIGHLIGHTED: ' + result);
// });




// searchUrbanDict = function(word){
//   var query = word.selectionText;
//   chrome.tabs.create({url: "http://www.urbandictionary.com/define.php?term=" + query});
//   chrome.tabs.create({url: "https://en.wikipedia.org/w/index.php?search=" + query + "&title=Special%3ASearch&go=Go"});
// };

// chrome.contextMenus.create({
//   id: "searchUrban",
//   title: "Search in UrbanDictionary",
//   contexts:["selection"],
//   onclick: searchUrbanDict
// });

searchWikipedia = function(word){
  chrome.tabs.create({url: "https://en.wikipedia.org/wiki/LeBron_James"});
};

// chrome.contextMenus.create({
//   id: "searchWiki",
//   title: "Search in Wikipedia",
//   contexts:["selection"],
//   onclick: searchWikipedia
// });

chrome.contextMenus.create({
  id: "contextMenuLookup",
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