var div_count = 0;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("recieved lookup call!");
    // console.log(message);

    // // Append the new element to the body of the document
    var selection = window.getSelection();

    // If there is no selection, do nothing
    if (selection.rangeCount === 0) {
        return;
    }

    // Get the first range of the selection
    var range = selection.getRangeAt(0);

    // Delete if there is another popup
    // Get the element by its ID
    // var element = document.getElementById("myDiv");
    // console.log(element)

    // // If the element exists, remove it
    // if (element !== null) {
    //     element.style.visibility = "hidden";
    //     element.parentNode.removeChild(element);
    // }

    // Create a new div element and set its content
    div_count += 1;
    var div = document.createElement(`myDiv_${div_count}`);
    var p = document.createElement("p");
    p.textContent = "LOOKUP: results for " + "'" + message.substring(0, 12) + "...'";
    p.style.fontSize = "1rem";
    p.style.fontWeight = "700";
    p.style.color = "#777675";

    div.appendChild(p);
    var hr = document.createElement("hr");
    div.appendChild(hr);
    var br = document.createElement("br");
    div.appendChild(br);
    var p = document.createElement("p");
    p.textContent = message;
    div.appendChild(p);

    // Set the div's position to be at the range's start
    var rect = range.getBoundingClientRect();
    div.style.position = "absolute";
    div.style.top = rect.top + 100 + "px";
    div.style.left = rect.left + "px";
    div.style.zIndex = 2147483642;
    div.style.padding = "1rem";
    div.style.backgroundColor = "#edebe9";
    div.style.fontSize = "0.8rem";
    div.style.borderRadius = "1.5rem";
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

// Get the div element by its ID

// Add a click event listener to the document
document.addEventListener("click", function(event) {
    var thisdiv = "";
    thisdiv = document.getElementsByTagName(`myDiv_${div_count}`);
    console.log(thisdiv[0]);
    console.log(div_count);


    if (document.getElementsByTagName(`myDiv_${div_count}`)[0]){
        // console.log(thisdiv[0].style.display)
        // Check if the clicked element is inside the div
        // if (!thisdiv.contains(event.target)) {
            // If the clicked element is not inside the div, remove the div
            document.getElementsByTagName(`myDiv_${div_count}`)[0].style.display = "none";
        // thisdiv[0].parentNode.removeChild(thisdiv);
        // }
    }
});

