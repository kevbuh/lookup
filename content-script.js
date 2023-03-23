var div_count = 0;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("recieved lookup call!");
    console.log(message);
    const [tab_id, gpt_res] = message.split('_');

    // // Append the new element to the body of the document
    var selection = window.getSelection();

    // If there is no selection, do nothing
    if (selection.rangeCount === 0) {
        return;
    }
    
    var range = selection.getRangeAt(0);

    // Check if there is a selection
    if (!selection.isCollapsed) {
        // Create a new span element to wrap the selected text
        var span = document.createElement('span');
        span.setAttribute("id", "extension_highlight");
        // span.style.backgroundColor = 'yellow';
        // span.style.textDecoration = 'underline';
        // span.style.textDecorationColor = '#FF5F1F';
        span.style.borderBottom = '10px solid #50e3c2';

    
        // Surround the selected text with the new span element
        // var range = selection.getRangeAt(0);
        range.surroundContents(span);
    
        // Collapse the selection to the end of the span element
        selection.collapse(span, 1);
    }

    // Create a new div element and set its content
    div_count += 1;
    var div = document.createElement(`myDiv_${tab_id}`);

    // var p = document.createElement("p");
    // p.textContent = gpt_res;
    // div.appendChild(p);

    var p = document.createElement("p");
    p.textContent = gpt_res;
    p.style.fontSize = "16px";
    p.style.paddingBottom = "10px";
    div.appendChild(p);

    // Set the div's position to be at the range's start
    var rect = range.getBoundingClientRect();

    // Create a new div element for the triangle and position it above the main div
    // var triangle = document.createElement("div");
    // triangle.style.position = "absolute";
    // triangle.style.top =  -15  + "px";
    // triangle.style.left = 4 + "px";
    // triangle.style.width = 0;
    // triangle.style.height = 0;
    // triangle.style.borderLeft = "15px solid transparent";
    // triangle.style.borderRight = "15px solid transparent";
    // triangle.style.borderBottom = "15px solid rgba(126,125,124)";
    // triangle.style.backdropFilter = "blur(5px)";
    // div.appendChild(triangle);


    // main div
    div.style.position = "absolute";
    div.style.fontFamily = "Arial";
    // div.style.top = rect.top + 32 + window.pageYOffset + "px";
    div.style.top = rect.top + 21 + window.pageYOffset + "px";
    div.style.left = rect.left + window.pageXOffset + "px";
    div.style.zIndex = 2147483642;
    div.style.paddingLeft = "20px";
    div.style.paddingRight = "20px";
    div.style.paddingBottom = "10px";
    div.style.paddingTop = "10px";
    
    // div.style.backgroundColor = "#edebe9";
    // div.style.backgroundColor = "#7d7c7b";
    div.style.backgroundColor = "rgba(110,109,108,0.81)"; // blurred glassy grey
    div.style.backdropFilter = "blur(5px)";
    div.style.color = "#f1f1f1";
    div.style.fontSize = "16px";
    div.style.borderRadius = "5px";
    div.style.width = "300px";
    div.style.boxShadow = "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
    div.style.border = "border-style: solid";

    // add an id 
    div.setAttribute("id", "lookup_extension");

    var hr = document.createElement("hr");
    div.appendChild(hr);

    var bottom = document.createElement("div");
    bottom.style.gridTemplateColumns = "repeat(3, minmax(0, 1fr))"; 
    div.appendChild(bottom);

    var p = document.createElement("p");
    // p.textContent = "LOOKUP results for " + "'" + gpt_res.substring(0, 12) + "...'";
    p.textContent = "LOOKUP";
    p.style.fontFamily = "Arial";
    p.style.fontSize = "10px";
    p.style.paddingTop = "10px";
    p.style.fontStyle = "italic";
    // p.style.fontWeight = "600";
    // p.style.backgroundColor = "#7d7c7b";
    // p.style.borderRadius = "5px";
    // p.style.color = "#777675";
    // p.style.color = "#f1f1f1";
    p.style.fontWeight = "700";
    // p.style.textAlign = "center"; // center the text horizontally
    bottom.appendChild(p);

    var p = document.createElement("p");
    p.textContent = "results for " + "'" + gpt_res.substring(0, 53) + "...'";
    p.style.fontFamily = "Arial";
    p.style.fontSize = "10px";
    bottom.appendChild(p);

    // Add the div to the document
    document.body.appendChild(div);    
});


// Remove popup on any user click
// TODO: Change to on window change or scroll
document.addEventListener("click", function(event) {
    document.querySelectorAll('[id^="extension_highlight"]').forEach(function(element) {
        element.style.borderBottom = "none";
        // element.style.textDecorationColor = "none";
    });
    document.querySelectorAll('[id^="lookup_extension"]').forEach(function(element) {
        element.remove();
    });
});

