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

// contentScript.js
function fetchResource(input, init) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({input, init}, messageResponse => {
      const [response, error] = messageResponse;
      if (response === null) {
        reject(error);
      } else {
        // Use undefined on a 204 - No Content
        const body = response.body ? new Blob([response.body]) : undefined;
        resolve(new Response(body, {
          status: response.status,
          statusText: response.statusText,
        }));
      }
    });
  });
}
