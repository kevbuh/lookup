document.getElementById("save-btn").onclick = async () => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    let result;
    try {
      [{result}] = await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: () => getSelection().toString(),
      });
    } catch (e) {
      return; // ignoring an unsupported page like chrome://extensions
    }
    // document.body.append('Selection: ' + result);
    console.log('Selection: ' + result);
    const element = document.getElementById("selected-text"); // Get the element by ID
    element.textContent += result; // Append text to the element's content
};

document.getElementById("look-up-clicked").onclick = async () => {
  document.body.append('clicked looked up');
  // const completion = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: generatePrompt(req.body.animal),
  //   temperature: 0.6,
  // });
};

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

