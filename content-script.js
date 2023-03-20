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

    // Get the first range of the selection
    var range = selection.getRangeAt(0);

    // Create a new div element and set its content
    div_count += 1;
    var div = document.createElement(`myDiv_${tab_id}`);

    var p = document.createElement("p");
    p.textContent = "LOOKUP results for " + "'" + gpt_res.substring(0, 12) + "...'";
    p.style.fontSize = "16px";
    p.style.fontFamily = "Arial";
    p.style.paddingBottom = "10px";
    // p.style.fontWeight = "600";
    // p.style.color = "#777675";
    p.style.color = "#f1f1f1";
    p.style.fontWeight = "700";
    div.appendChild(p);

    var p = document.createElement("p");
    p.textContent = gpt_res;
    div.appendChild(p);

    // Set the div's position to be at the range's start
    var rect = range.getBoundingClientRect();
    div.style.position = "absolute";
    div.style.fontFamily = "Arial";
    div.style.top = rect.top + 20 + window.pageYOffset + "px";
    div.style.left = rect.left + window.pageXOffset + "px";
    div.style.zIndex = 2147483642;
    div.style.paddingLeft = "20px";
    div.style.paddingRight = "20px";
    div.style.paddingBottom = "20px";
    div.style.paddingTop = "10px";


    // div.style.backgroundColor = "#edebe9";
    // div.style.backgroundColor = "#7d7c7b";
    div.style.backgroundColor = "rgba(126,125,124,0.8)";
    div.style.backdropFilter = "blur(5px)";
    div.style.color = "#f1f1f1";
    div.style.fontSize = "14px";
    div.style.borderRadius = "10px";
    div.style.width = "300px";
    div.style.boxShadow = "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
    div.style.border = "border-style: solid";

    // add an id 
    div.setAttribute("id", "lookup_extension");

    // Add the div to the document
    document.body.appendChild(div);

    div.addEventListener("scroll", function() {
        div.style.display = "none";
    });
});


// Add a click event listener to the document
document.addEventListener("click", function(event) {
    document.querySelectorAll('[id^="lookup_extension"]').forEach(function(element) {
        element.remove();
    });
});

