// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     console.log('in add listener');
//     console.log('request', request);

//     if (request.data) {
//       const element = document.getElementById("look-up-clicked");
//       if (element) {
//         element.textContent += request.api_res;
//       }
//     }
//     sendResponse({farewell: "goodbye"});
//     return true;
//   });

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "hello")
        sendResponse({farewell: "goodbye"});
    }
  );