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

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting === "hello")
//         sendResponse({farewell: "goodbye"});
//     }
//   );

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     console.log('heard message');
//     // if (request.action === 'append-text') {
//     // Perform the desired action with the received text
//     // console.log('Received text:', request.text);
//     // }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log('in messager!');
//     console.log(message);
//     return true;
// });

// chrome.runtime.onMessage.addListener(function (response, sendResponse) {
//     console.log(response);
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("in message catcher!");
    console.log(message);
    
    // var newElement = document.createElement("look-up-clicked");
    // newElement.textContent += message;

    // // Append the new element to the body of the document
    // document.body.appendChild(newElement);
    var selection = window.getSelection();

    // If there is no selection, do nothing
    if (selection.rangeCount === 0) {
    return;
    }

    // Get the first range of the selection
    var range = selection.getRangeAt(0);

    // Create a new div element and set its content
    var div = document.createElement("div");

    div.innerHTML = message;

    // Set the div's position to be at the range's start
    var rect = range.getBoundingClientRect();
    div.style.position = "fixed";
    div.style.top = rect.top + 10 + "px";
    div.style.left = rect.left + "px";
    div.style.zIndex = 2147483642;
    div.style.padding = "1rem";
    div.style.backgroundColor = "#f1f1f1";
    div.style.fontSize = "1rem";
    div.style.color = "black";
    div.style.borderRadius = "1rem";
    div.style.width = "200px";



    // Add the div to the document
    document.body.appendChild(div);

    div.addEventListener("scroll", function() {
        div.style.display = "none";
    });
});


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     console.log("hurrrrr");
//     // if (request.action === 'append-text') {
//     // Perform the desired action, e.g., append the text to the DOM
    // console.log("in message catcher!");
    // const textElement = document.createElement("ttessttst");
    // // textElement.textContent = request.text;
    // textElement.textContent = "BOBBBBBB";
    // document.body.appendChild(textElement);

    // var newElement = document.createElement("p");
    // newElement.textContent = "This is the new content appended to the end of the document!";
    //     // Append the new element to the body of the document
    // document.body.appendChild(newElement);
   
//     // Send a response back to the background script (optional)
//     sendResponse({ success: true });
//     // }
//     return true;
//    });